import type { MetadataRoute } from "next";
import { COMPANY } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  const base = COMPANY.url.replace(/\/$/, "");
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/_next/", "/api/"] },
    ],
    sitemap: [`${base}/sitemap.xml`, `${base}/image-sitemap.xml`],
    host: base,
  };
}
