import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import type { Metadata, Viewport } from "next";
import { site } from "@/constants/site";
import { Analytics } from "@/components/shared/analytics";
import "./globals.css";

config.autoAddCss = false;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  authors: [{ name: site.name }],
  keywords: [
    "Saugat Adhikari",
    "Software Engineer Nepal",
    "Frontend Engineer Kathmandu",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "NestJS Developer",
    "Full Stack Developer Nepal",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    title: site.title,
    description:
      "I'm a Software Engineer based in Kathmandu, Nepal, building scalable web applications with React, Next.js, TypeScript, and NestJS. Take a look at my projects, experience, and resume.",
    images: ["/images/myimage.png"],
    locale: "en_US",
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description:
      "Software Engineer in Kathmandu, Nepal building scalable web apps with React, Next.js, TypeScript & NestJS. 3+ years of experience — projects, work history, and resume inside.",
    images: ["/images/myimage.png"],
  },
  icons: {
    icon: [
      { url: "/images/favicon/favicon-32x32.png", sizes: "32x32" },
      { url: "/images/favicon/favicon-16x16.png", sizes: "16x16" },
    ],
    apple: "/images/favicon/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};
export const viewport: Viewport = { themeColor: "#474559" };
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
