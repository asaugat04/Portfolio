import "server-only";
import { z } from "zod";

const required = z.string().trim().min(1);
const schema = z.object({
  VERCEL: z.string().optional(),
  DATABASE_URL: z.url(),
  BETTER_AUTH_SECRET: z.string().min(32),
  CLOUDINARY_CLOUD_NAME: required,
  CLOUDINARY_API_KEY: required,
  CLOUDINARY_API_SECRET: required,
  RESEND_API_KEY: required,
  EMAIL_FROM: z.email(),
  CONTACT_EMAIL: z.email(),
  RATE_LIMIT_SECRET: z.string().min(32),
});

export const serverEnv = schema.parse(
  Object.fromEntries(
    Object.keys(schema.shape).map((key) => [key, process.env[key]]),
  ),
);
