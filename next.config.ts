import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 414, 640, 768, 1024, 1280, 1440, 1920],
    imageSizes: [96, 144, 220, 320, 440, 640],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  experimental: {
    optimizePackageImports: [],
    // Pedido de orçamento permite anexar projetos (imagens/PDF).
    // Default do Server Action é 1MB — subimos para acomodar anexos.
    serverActions: {
      bodySizeLimit: "12mb",
    },
  },
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  async headers() {
    const longCache = "public, max-age=31536000, immutable";
    return [
      {
        // /public assets — long immutable cache
        source: "/portfolio/:path*",
        headers: [{ key: "Cache-Control", value: longCache }],
      },
      {
        source: "/favicon.svg",
        headers: [{ key: "Cache-Control", value: longCache }],
      },
      {
        source: "/logo-volcatti.png",
        headers: [{ key: "Cache-Control", value: longCache }],
      },
      {
        // Sitemap revalidates daily
        source: "/(sitemap|image-sitemap).xml",
        headers: [{ key: "Cache-Control", value: "public, max-age=3600, s-maxage=86400" }],
      },
      {
        // Security baselines
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default withMDX(nextConfig);
