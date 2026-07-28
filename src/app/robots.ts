import type { MetadataRoute } from "next";
import { validateEnv } from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
  const { NEXT_PUBLIC_APP_URL } = validateEnv();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/get-started", "/thank-you"],
    },
    sitemap: `${NEXT_PUBLIC_APP_URL}/sitemap.xml`,
  };
}
