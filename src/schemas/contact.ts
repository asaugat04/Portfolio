import { z } from "zod";
export const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.email().max(254),
  message: z.string().trim().min(1).max(5000),
  website: z.string().max(500).default(""),
});
export const messageUpdateSchema = z.object({ read: z.boolean() });
