import type { MetadataRoute } from "next";
import { SITE_URL } from "@/shared/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/preview", "/api/exit-preview"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
