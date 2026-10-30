import { z } from "zod";

const text = z.string().trim().min(1).max(500);
const description = z.string().trim().max(10000);
const webUrl = z
  .url()
  .refine((value) => /^https?:\/\//.test(value), "Use an HTTP or HTTPS URL");
const assetUrl = z
  .string()
  .refine(
    (value) => /^\/(?!\/)/.test(value) || webUrl.safeParse(value).success,
    "Use a local path or HTTP(S) URL",
  );

export const contentSchemas = {
  about: z.object({
    greeting: text,
    name: text,
    role: text,
    description,
    image: assetUrl,
  }),
  projects: z.object({
    title: text,
    subtitle: text,
    tags: z.array(text).max(30),
    highlights: z.array(text).max(30),
    image: assetUrl.or(z.literal("")).default(""),
  }),
  certifications: z.object({ title: text, description, image: assetUrl }),
  experience: z.object({
    year: text,
    title: text,
    organization: text,
    description,
  }),
  education: z.object({
    year: text,
    title: text,
    organization: text,
    lineBreak: z.boolean().default(true),
  }),
  skills: z.object({ title: text, description }),
  "social-links": z.object({
    title: text,
    url: webUrl,
    icon: z.enum(["facebook", "instagram", "github", "linkedin", "link"]),
  }),
  resume: z.object({ url: assetUrl, filename: text }),
  "contact-details": z.object({
    name: text,
    email: z.email(),
    phone: text,
    location: text,
    image: assetUrl,
  }),
} as const;

export const sectionSchema = z.enum([
  "about",
  "projects",
  "certifications",
  "experience",
  "education",
  "skills",
  "social-links",
  "resume",
  "contact-details",
]);
export type Section = z.infer<typeof sectionSchema>;
export type ContentData<K extends Section> = z.infer<
  (typeof contentSchemas)[K]
>;
export type ContentEntry<K extends Section = Section> = {
  id: string;
  section: K;
  position: number;
  visible: boolean;
  data: ContentData<K>;
};
export type Portfolio = { [K in Section]: ContentEntry<K>[] };
export const entryInputSchema = z.object({
  position: z.number().int().min(0).max(10000),
  visible: z.boolean(),
  data: z.unknown(),
});
