import { POSTS, POST_CATEGORIES } from "@/lib/posts";
import { renderOG, OG_SIZE } from "@/lib/og";

export const runtime = "edge";
export const contentType = "image/png";
export const size = OG_SIZE;
export const alt = "Notícias Volcatti";

type Props = { params: Promise<{ slug: string }> };

export default async function OG({ params }: Props) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return renderOG({ kicker: "Notícias", title: "Artigo não encontrado" });

  const date = new Date(post.date).toLocaleDateString("pt-PT", { year: "numeric", month: "long" });

  return renderOG({
    kicker: `${POST_CATEGORIES[post.category]} · ${post.read}`,
    title: post.title,
    meta: [
      { label: "Publicado", value: date },
      { label: "Leitura", value: post.read },
      { label: "Por", value: "Volcatti" },
    ],
  });
}
