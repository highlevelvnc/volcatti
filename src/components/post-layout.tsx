import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Breadcrumbs } from "./breadcrumbs";
import { ArrowRight, WhatsAppIcon } from "./icons";
import { POSTS, POST_CATEGORIES, type PostMeta } from "@/lib/posts";
import { COMPANY, WHATSAPP_URL } from "@/lib/constants";

type Props = { meta: PostMeta; children: ReactNode };

export function PostLayout({ meta, children }: Props) {
  const idx = POSTS.findIndex((p) => p.slug === meta.slug);
  const next = POSTS[(idx + 1) % POSTS.length];
  const prev = POSTS[(idx - 1 + POSTS.length) % POSTS.length];

  // Article schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.excerpt,
    image: `${COMPANY.url}${meta.cover}`,
    datePublished: meta.date,
    author: { "@type": "Organization", name: COMPANY.name, url: COMPANY.url },
    publisher: { "@type": "Organization", name: COMPANY.name, logo: { "@type": "ImageObject", url: `${COMPANY.url}/favicon.svg` } },
    mainEntityOfPage: `${COMPANY.url}/noticias/${meta.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      {/* Hero */}
      <section className="relative bg-graphite text-offwhite overflow-hidden pt-[calc(var(--header-h)+40px)] pb-12 lg:pb-16">
        <div className="max-w-container mx-auto px-5 md:px-8 lg:px-12">
          <div className="mb-8">
            <Breadcrumbs
              light
              items={[
                { label: "Início", href: "/" },
                { label: "Notícias", href: "/noticias" },
                { label: meta.title.length > 40 ? meta.title.slice(0, 40) + "…" : meta.title },
              ]}
            />
          </div>

          <div className="grid lg:grid-cols-[2fr_1fr] gap-8 lg:gap-16 items-end max-w-[1100px]">
            <div>
              <span className="font-mono text-[0.7rem] tracking-[0.22em] uppercase text-bronze block mb-5">
                {POST_CATEGORIES[meta.category]} · {meta.read}
              </span>
              <h1
                className="font-display font-light leading-[1] tracking-[-0.025em] mb-6"
                style={{ fontSize: "clamp(2rem, 5.4vw, 4.4rem)" }}
              >
                {meta.title}
              </h1>
              <p className="font-display font-light text-offwhite/80 max-w-[58ch]" style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)", lineHeight: 1.55 }}>
                {meta.excerpt}
              </p>
            </div>
            <div className="font-mono text-[0.65rem] tracking-[0.16em] uppercase text-offwhite/55 lg:text-right space-y-1.5">
              <div>{new Date(meta.date).toLocaleDateString("pt-PT", { year: "numeric", month: "long", day: "numeric" })}</div>
              <div className="text-bronze">Por Volcatti</div>
            </div>
          </div>
        </div>
      </section>

      {/* Cover image */}
      <section className="bg-graphite">
        <div className="max-w-container mx-auto px-5 md:px-8 lg:px-12 pb-16">
          <div className="relative aspect-[16/9] overflow-hidden border border-offwhite/12">
            <Image
              src={meta.cover}
              alt=""
              fill
              priority
              quality={92}
              sizes="(min-width:1320px) 1200px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Body */}
      <article className="bg-offwhite border-y border-graphite/12" style={{ paddingBlock: "clamp(60px, 8vw, 100px)" }}>
        <div className="max-w-container mx-auto px-5 md:px-8 lg:px-12 grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16">
          <aside className="hidden lg:block">
            <div className="sticky top-32 font-mono text-[0.65rem] tracking-[0.16em] uppercase text-graphite/45 space-y-2">
              <div>▸ Artigo</div>
              <div>{meta.read} de leitura</div>
              <div className="text-bronze">{POST_CATEGORIES[meta.category]}</div>
            </div>
          </aside>
          <div className="legal-prose max-w-[68ch]">{children}</div>
        </div>
      </article>

      {/* CTA + neighbours */}
      <section className="bg-graphite text-offwhite" style={{ paddingBlock: "clamp(60px, 8vw, 100px)" }}>
        <div className="max-w-container mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-20 pb-12 lg:pb-16 items-center">
            <h2 className="font-display font-light tracking-[-0.025em] leading-tight" style={{ fontSize: "clamp(1.8rem, 3.4vw, 2.8rem)" }}>
              Tem um projeto <em className="not-italic italic text-bronze">em mente?</em>
            </h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/#orcamento" className="btn btn--bronze btn--lg">
                <span>Pedir orçamento</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="btn btn--ghost btn--ghost-light btn--lg">
                <WhatsAppIcon className="w-[18px] h-[18px]" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-px bg-offwhite/12 border border-offwhite/12">
            <Link href={`/noticias/${prev.slug}`} className="group bg-graphite p-7 lg:p-9 flex flex-col gap-2 hover:bg-graphite/70 transition-colors duration-500" data-cursor="← Anterior">
              <span className="font-mono text-[0.62rem] tracking-[0.18em] uppercase text-bronze">← Artigo anterior</span>
              <span className="font-display font-light text-xl lg:text-2xl tracking-[-0.01em]">{prev.title}</span>
            </Link>
            <Link href={`/noticias/${next.slug}`} className="group bg-graphite p-7 lg:p-9 flex flex-col gap-2 sm:items-end sm:text-right hover:bg-graphite/70 transition-colors duration-500" data-cursor="Seguinte →">
              <span className="font-mono text-[0.62rem] tracking-[0.18em] uppercase text-bronze">Artigo seguinte →</span>
              <span className="font-display font-light text-xl lg:text-2xl tracking-[-0.01em]">{next.title}</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
