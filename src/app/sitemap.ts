import type { MetadataRoute } from "next";
import { COMPANY } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: COMPANY.url,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
