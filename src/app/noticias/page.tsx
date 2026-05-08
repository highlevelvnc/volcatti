import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { POSTS, POST_CATEGORIES } from "@/lib/posts";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { RevealInit } from "@/components/reveal-init";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { GhostNumber } from "@/components/ghost-number";
import { ArrowRight } from "@/components/icons";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Notícias & Apontamentos",
  description: "Casos de obra, notas técnicas e apontamentos sobre construção, piscinas e remodelações em Portugal — pela Volcatti.",
  alternates: { canonical: `${COMPANY.url}/noticias` },
  openGraph: {
    title: "Notícias & Apontamentos · Volcatti",
    description: "Casos de obra, notas técnicas e apontamentos pela Volcatti.",
  },
};

export default function NoticiasIndex() {
  const sorted = [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));
  const [featured, ...rest] = sorted;

  return (
    <>
      <ScrollProgress />
      <RevealInit />
      <Header />
      <main className="bg-offwhite pt-[calc(var(--header-h)+40px)]">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-graphite/12" style={{ paddingBlock: "clamp(40px, 6vw, 90px)" }}>
          <GhostNumber num="N" position="right" />
          <div className="relative max-w-container mx-auto px-5 md:px-8 lg:px-12">
            <div className="mb-8">
              <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Notícias" }]} />
            </div>
            <span className="font-mono text-[0.72rem] tracking-[0.22em] uppercase text-bronze block mb-5">
              Apontamentos · {POSTS.length} publicações
            </span>
            <h1
              className="font-display font-light leading-[1] tracking-[-0.025em] text-graphite max-w-[18ch]"
              style={{ fontSize: "clamp(2.6rem, 6vw, 5.4rem)" }}
            >
              Notas de obra <em className="not-italic italic text-bronze">e técnica.</em>
            </h1>
            <p className="font-display font-light text-graphite/80 max-w-[60ch] mt-7" style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)", lineHeight: 1.55 }}>
              Casos de obra, técnicas que usamos, e apontamentos para quem está
              a planear construir, remodelar ou instalar.
            </p>
          </div>
        </section>

        {/* Featured */}
        {featured && (
          <section className="border-b border-graphite/12" style={{ paddingBlock: "clamp(50px, 7vw, 100px)" }}>
            <div className="max-w-container mx-auto px-5 md:px-8 lg:px-12">
              <Link
                href={`/noticias/${featured.slug}`}
                className="group grid lg:grid-cols-[1.05fr_1fr] gap-8 lg:gap-16 items-center"
                data-cursor="Ler →"
              >
                <div className="relative aspect-[4/3] overflow-hidden border border-graphite/12 bg-graphite">
                  <Image
                    src={featured.cover}
                    alt=""
                    fill
                    sizes="(min-width:1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-[1.04]"
                    style={{ filter: "grayscale(15%) contrast(1.04)" }}
                    priority
                  />
                  <span className="absolute top-4 left-4 font-mono text-[0.6rem] tracking-[0.2em] uppercase text-offwhite/90 px-2 py-1 bg-graphite/65 backdrop-blur-sm">
                    ▸ Destaque
                  </span>
                </div>
                <div>
                  <span className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-bronze block mb-3">
                    {POST_CATEGORIES[featured.category]} · {featured.read}
                  </span>
                  <h2 className="font-display font-light tracking-[-0.025em] text-graphite leading-[1.05] mb-4 group-hover:text-bronze transition-colors duration-500" style={{ fontSize: "clamp(1.8rem, 3.4vw, 2.8rem)" }}>
                    {featured.title}
                  </h2>
                  <p className="font-display font-light text-graphite/80 max-w-[55ch] mb-5" style={{ fontSize: "clamp(1rem, 1.3vw, 1.15rem)", lineHeight: 1.55 }}>
                    {featured.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2.5 font-mono text-[0.7rem] tracking-[0.16em] uppercase text-graphite group-hover:text-bronze group-hover:gap-4 transition-[color,gap] duration-500">
                    Ler artigo <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* Rest */}
        {rest.length > 0 && (
          <section style={{ paddingBlock: "clamp(50px, 7vw, 100px)" }}>
            <div className="max-w-container mx-auto px-5 md:px-8 lg:px-12">
              <span className="font-mono text-[0.7rem] tracking-[0.18em] uppercase text-graphite/55 block mb-8">
                ▸ Mais artigos
              </span>
              <ul className="grid sm:grid-cols-2 gap-px bg-graphite/12 border border-graphite/12">
                {rest.map((p, i) => (
                  <li key={p.slug} data-reveal data-d={i * 80} className="bg-offwhite">
                    <Link
                      href={`/noticias/${p.slug}`}
                      className="group flex flex-col h-full p-6 lg:p-8 transition-colors duration-500 hover:bg-offwhite-2"
                      data-cursor="Ler →"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden mb-5 border border-graphite/12">
                        <Image
                          src={p.cover}
                          alt=""
                          fill
                          sizes="(min-width:640px) 50vw, 100vw"
                          className="object-cover transition-transform duration-1000 group-hover:scale-[1.04]"
                          style={{ filter: "grayscale(15%) contrast(1.04)" }}
                        />
                      </div>
                      <span className="font-mono text-[0.62rem] tracking-[0.18em] uppercase text-bronze block mb-2">
                        {POST_CATEGORIES[p.category]} · {p.read}
                      </span>
                      <h3 className="font-display font-light tracking-[-0.015em] text-graphite leading-[1.15] mb-3 group-hover:text-bronze transition-colors duration-300" style={{ fontSize: "clamp(1.3rem, 2vw, 1.6rem)" }}>
                        {p.title}
                      </h3>
                      <p className="text-[0.95rem] text-graphite/75 leading-relaxed flex-1">{p.excerpt}</p>
                      <span className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-graphite/45 mt-5 pt-4 border-t border-graphite/12">
                        {new Date(p.date).toLocaleDateString("pt-PT", { year: "numeric", month: "long", day: "numeric" })}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
