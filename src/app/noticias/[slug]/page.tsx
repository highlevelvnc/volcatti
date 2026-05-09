import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { POSTS } from "@/lib/posts";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { RevealInit } from "@/components/reveal-init";
import { COMPANY } from "@/lib/constants";
import { PostLayout } from "@/components/post-layout";

import PostA from "./como-escolher-empreiteiro-para-remodelacao.mdx";
import PostB from "./piscina-no-jardim-quanto-custa-realmente.mdx";
import PostC from "./remodelacao-wc-marmore-cascais-caso-estudo.mdx";
import type { ComponentType } from "react";

const POST_BODIES: Record<string, ComponentType> = {
  "como-escolher-empreiteiro-para-remodelacao": PostA,
  "piscina-no-jardim-quanto-custa-realmente": PostB,
  "remodelacao-wc-marmore-cascais-caso-estudo": PostC,
};

export async function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const meta = POSTS.find((p) => p.slug === slug);
  if (!meta) return {};
  return {
    title: meta.title,
    description: meta.excerpt,
    alternates: { canonical: `${COMPANY.url}/noticias/${meta.slug}` },
    openGraph: {
      type: "article",
      title: meta.title,
      description: meta.excerpt,
      publishedTime: meta.date,
      images: [{ url: meta.cover, alt: meta.title }],
    },
  };
}

export default async function Post({ params }: Props) {
  const { slug } = await params;
  const meta = POSTS.find((p) => p.slug === slug);
  if (!meta) notFound();

  const Body = POST_BODIES[slug];
  if (!Body) notFound();

  return (
    <>
      <ScrollProgress />
      <RevealInit />
      <Header />
      <main id="main-content">
        <PostLayout meta={meta}>
          <Body />
        </PostLayout>
      </main>
      <Footer />
    </>
  );
}
