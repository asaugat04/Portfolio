import type { Section } from "@/schemas/content";

export const sections = {
  about: { title: "About", singleton: true },
  projects: { title: "Projects", singleton: false },
  certifications: { title: "Certifications", singleton: false },
  experience: { title: "Experience", singleton: false },
  education: { title: "Education", singleton: false },
  skills: { title: "Skills", singleton: false },
  "social-links": { title: "Social links", singleton: false },
  resume: { title: "Résumé", singleton: true },
  "contact-details": { title: "Contact details", singleton: true },
} satisfies Record<Section, { title: string; singleton: boolean }>;

export const sectionKeys = Object.keys(sections) as Section[];
export const uploadLimits = {
  image: 4 * 1024 * 1024,
  pdf: 4 * 1024 * 1024,
} as const;
export const cloudinaryFolder = "portfolio";

export const jsonBodyLimit = 64 * 1024;

export const portfolioCacheTag = "portfolio";
