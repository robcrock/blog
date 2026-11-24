import { SITE_URL } from "@/shared/lib/constants";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/interface-review",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
