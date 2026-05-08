import type { MetadataRoute } from "next";
import { COMPANY } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: COMPANY.fullName,
    short_name: COMPANY.name,
    description: "Construção, Remodelação, Piscinas e Elétrica em Lisboa",
    start_url: "/",
    display: "standalone",
    background_color: "#F4F1EA",
    theme_color: "#111111",
    icons: [
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
    ],
    lang: "pt-PT",
    categories: ["business", "lifestyle"],
  };
}
