import "server-only";
import { Resend } from "resend";
import { getDb } from "@/lib/db";
import { serverEnv } from "@/constants/env.server";

export async function notifyMessage(id: string) {
  const message = await getDb().message.findUniqueOrThrow({ where: { id } });
  if (message.emailSentAt) return;
  try {
    const result = await new Resend(serverEnv.RESEND_API_KEY).emails.send(
      {
        from: serverEnv.EMAIL_FROM,
        to: serverEnv.CONTACT_EMAIL,
        replyTo: message.email,
        subject: `Portfolio inquiry from ${message.name}`,
        text: `Name: ${message.name}\nEmail: ${message.email}\n\n${message.message}`,
      },
      { idempotencyKey: `contact-${message.id}` },
    );
    if (result.error) throw new Error("Email delivery failed");
    await getDb().message.update({
      where: { id },
      data: { emailSentAt: new Date(), emailError: false },
    });
  } catch {
    await getDb().message.update({ where: { id }, data: { emailError: true } });
    throw new Error("Email delivery failed");
  }
}
