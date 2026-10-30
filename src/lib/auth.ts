import "server-only";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { clientEnv } from "@/constants/env.client";
import { serverEnv } from "@/constants/env.server";
import { routes } from "@/constants/routes";
import { getDb } from "@/lib/db";

function createAuth() {
  return betterAuth({
    appName: "Portfolio Admin",
    baseURL: clientEnv.NEXT_PUBLIC_SITE_URL,
    basePath: routes.auth,
    secret: serverEnv.BETTER_AUTH_SECRET,
    database: prismaAdapter(getDb(), { provider: "postgresql" }),
    emailAndPassword: {
      enabled: true,
      disableSignUp: true,
      minPasswordLength: 12,
    },
    session: { expiresIn: 60 * 60 * 24 * 7, updateAge: 60 * 60 * 24 },
    rateLimit: {
      enabled: true,
      storage: "database",
      modelName: "AuthRateLimit",
      window: 60,
      max: 30,
      customRules: { "/sign-in/email": { window: 60, max: 5 } },
    },
    user: {
      additionalFields: {
        isAdmin: { type: "boolean", defaultValue: false, input: false },
      },
    },
  });
}

let instance: ReturnType<typeof createAuth> | undefined;
export function getAuth() {
  return (instance ??= createAuth());
}
