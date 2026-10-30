import "dotenv/config";
import { z } from "zod";
import { site } from "./site";

export const cliEnv = z
  .object({
    DATABASE_URL: z.url(),
    DIRECT_URL: z.url(),
    ADMIN_EMAIL: z.email().default(site.initialAdminEmail),
    ADMIN_PASSWORD: z.string().min(12).max(128).optional(),
  })
  .parse({
    DATABASE_URL: process.env.DATABASE_URL || undefined,
    DIRECT_URL: process.env.DIRECT_URL || undefined,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL || undefined,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || undefined,
  });
