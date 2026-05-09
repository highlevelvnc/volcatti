import { COMPANY, GALLERY, SERVICES } from "@/lib/constants";
import { POSTS } from "@/lib/posts";

export const dynamic = "force-static";

/**
 * Image sitemap (separate from main sitemap.xml). Helps Google Image
 * Search index our portfolio photography. Schema:
 * https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps
 */
export function GET() {
  const base = COMPANY.url.replace(/\/$/, "");
  const escape = (s: string) =>
    s.replace(/[<>&"']/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;" }[c]!));

  const entries: Array<{ loc: string; images: Array<{ url: string; title: string; caption: string }> }> = [];

  // Homepage — show all gallery images
  entries.push({
    loc: base,
    images: GALLERY.map((g) => ({ url: `${base}${g.src}`, title: g.title, caption: g.alt })),
  });

  // Each obra
  GALLERY.forEach((g) => {
    entries.push({
      loc: `${base}/obras/${g.slug}`,
      images: [{ url: `${base}${g.src}`, title: g.title, caption: g.alt }],
    });
  });

  // Each service
  SERVICES.forEach((s) => {
    entries.push({
      loc: `${base}/servicos/${s.slug}`,
      images: [{ url: `${base}${s.image}`, title: s.title, caption: s.alt }],
    });
  });

  // Each post
  POSTS.forEach((p) => {
    entries.push({
      loc: `${base}/noticias/${p.slug}`,
      images: [{ url: `${base}${p.cover}`, title: p.title, caption: p.excerpt }],
    });
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries
    .map(
      (e) => `  <url>
    <loc>${escape(e.loc)}</loc>
${e.images
        .map(
          (img) => `    <image:image>
      <image:loc>${escape(img.url)}</image:loc>
      <image:title>${escape(img.title)}</image:title>
      <image:caption>${escape(img.caption)}</image:caption>
    </image:image>`,
        )
        .join("\n")}
  </url>`,
    )
    .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
