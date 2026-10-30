import { randomUUID } from "node:crypto";
import { hashPassword } from "better-auth/crypto";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../src/generated/prisma/client";
import { cliEnv } from "../src/constants/env.cli";
import { site } from "../src/constants/site";

if (!cliEnv.ADMIN_PASSWORD)
  throw new Error(
    "Set DATABASE_URL and ADMIN_PASSWORD (at least 12 characters) in .env",
  );
const db = new PrismaClient({
  adapter: new PrismaNeon({ connectionString: cliEnv.DATABASE_URL }),
});
try {
  if (await db.user.findFirst({ where: { isAdmin: true } }))
    throw new Error(
      "An admin already exists. This command will not replace the account or password.",
    );
  const email = cliEnv.ADMIN_EMAIL.toLowerCase();
  const id = randomUUID();
  const password = await hashPassword(cliEnv.ADMIN_PASSWORD);
  await db.user.create({
    data: {
      id,
      name: site.name,
      email,
      emailVerified: true,
      isAdmin: true,
      accounts: {
        create: {
          id: randomUUID(),
          accountId: id,
          providerId: "credential",
          password,
        },
      },
    },
  });
  console.log("Admin account created. Remove ADMIN_PASSWORD from .env now.");
} finally {
  await db.$disconnect();
}
