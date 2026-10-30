import { after } from "next/server";
import { contactSchema } from "@/schemas/contact";
import { apiError, HttpError, jsonBody } from "@/lib/api/errors";
import { clientEnv } from "@/constants/env.client";
import { getDb } from "@/lib/db";
import { notifyMessage } from "@/services/messages";
import { rateLimit } from "@/services/rate-limit";

export async function POST(request: Request) {
  try {
    if (
      request.headers.get("origin") !==
      new URL(clientEnv.NEXT_PUBLIC_SITE_URL).origin
    )
      throw new HttpError(403, "Request origin not allowed");
    const { website, ...data } = contactSchema.parse(await jsonBody(request));
    if (website) return Response.json({ ok: true });
    const ip =
      request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "local";
    await rateLimit(`contact:${ip}`, 5, 60 * 60);
    const message = await getDb().message.create({ data });
    after(async () => {
      try {
        await notifyMessage(message.id);
      } catch {
        console.error("Contact notification pending retry", message.id);
      }
    });
    return Response.json({ ok: true }, { status: 201 });
  } catch (error) {
    return apiError(error);
  }
}
