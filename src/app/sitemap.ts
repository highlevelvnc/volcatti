import type { MetadataRoute } from "next";
import { COMPANY, GALLERY, SERVICES } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = COMPANY.url.replace(/\/$/, "");

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...SERVICES.map((s) => ({
      url: `${base}/servicos/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...GALLERY.map((g) => ({
      url: `${base}/obras/${g.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
