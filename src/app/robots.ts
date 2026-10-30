import type { MetadataRoute } from "next";
import { site } from "@/constants/site";
import { routes } from "@/constants/routes";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: routes.home,
      disallow: [routes.admin, "/api/"],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
