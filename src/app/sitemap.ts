import type { MetadataRoute } from "next";
import { validateEnv } from "@/lib/env";

const publicRoutes = ["/", "/packages", "/how-it-works", "/why-roofline", "/faq", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const { NEXT_PUBLIC_APP_URL } = validateEnv();

  return publicRoutes.map((route) => ({
    url: new URL(route, NEXT_PUBLIC_APP_URL).toString(),
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
