import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { GALLERY, GALLERY_FILTERS, COMPANY, WHATSAPP_URL } from "@/lib/constants";
import { ArrowRight, WhatsAppIcon } from "@/components/icons";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { ScrollProgress } from "@/components/scroll-progress";
import { RevealInit } from "@/components/reveal-init";
import { Breadcrumbs } from "@/components/breadcrumbs";

export async function generateStaticParams() {
  return GALLERY.map((g) => ({ slug: g.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const obra = GALLERY.find((g) => g.slug === slug);
  if (!obra) return {};
  const cat = GALLERY_FILTERS.find((f) => f.value === obra.cat)?.label;
  return {
    title: `${obra.title} · ${obra.location}`,
    description: obra.description ?? `${obra.title} — projeto Volcatti em ${obra.location}, executado em ${obra.year}.`,
    alternates: { canonical: `${COMPANY.url}/obras/${obra.slug}` },
    openGraph: {
      title: `${obra.title} — ${cat ?? ""}`,
      description: obra.description ?? "",
      images: [{ url: obra.src, alt: obra.alt }],
    },
  };
}

export default async function ObraPage({ params }: Props) {
  const { slug } = await params;
  const obra = GALLERY.find((g) => g.slug === slug);
  if (!obra) notFound();

  const idx = GALLERY.findIndex((g) => g.slug === slug);
  const next = GALLERY[(idx + 1) % GALLERY.length];
  const prev = GALLERY[(idx - 1 + GALLERY.length) % GALLERY.length];
  const cat = GALLERY_FILTERS.find((f) => f.value === obra.cat)?.label;

  // CreativeWork schema for the project
  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: obra.title,
    description: obra.description ?? obra.alt,
    creator: { "@type": "Organization", name: COMPANY.name, url: COMPANY.url },
    locationCreated: { "@type": "Place", name: obra.location },
    image: `${COMPANY.url}${obra.src}`,
    dateCreated: obra.year,
    keywords: [cat, obra.location, ...(obra.scope?.split(" · ") ?? [])].filter(Boolean).join(", "),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }} />
      <ScrollProgress />
      <RevealInit />
      <Header />
      <main id="main-content">
        {/* Hero */}
        <section className="relative pt-[calc(var(--header-h)+40px)] pb-12 lg:pb-16 bg-graphite text-offwhite overflow-hidden">
          <div className="max-w-container mx-auto px-5 md:px-8 lg:px-12">
            <div className="mb-8">
              <Breadcrumbs
                light
                items={[
                  { label: "Início", href: "/" },
                  { label: "Obras", href: "/#obras" },
                  { label: obra.title },
                ]}
              />
            </div>

            <div className="grid lg:grid-cols-[1.3fr_1fr] gap-8 lg:gap-16 items-end">
              <div>
                <span data-reveal className="font-mono text-[0.7rem] tracking-[0.22em] uppercase text-bronze block mb-5">
                  {cat} · N.º {String(idx + 1).padStart(2, "0")}
                </span>
                <h1
                  className="font-display font-light leading-[0.95] tracking-[-0.025em] mb-6"
                  style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)" }}
                >
                  <span data-reveal="line"><span>{obra.title}</span></span>
                  <span data-reveal="line" data-d="100" className="block">
                    <span className="text-bronze">— {obra.location}</span>
                  </span>
                </h1>
                {obra.description && (
                  <p
                    data-reveal
                    data-d="200"
                    className="font-display font-light text-offwhite/80 max-w-[58ch]"
                    style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)", lineHeight: 1.55 }}
                  >
                    {obra.description}
                  </p>
                )}
              </div>

              <dl className="grid grid-cols-2 gap-6 self-end pb-2">
                {[
                  { lbl: "Área", val: obra.area },
                  { lbl: "Localidade", val: obra.location },
                  { lbl: "Ano", val: obra.year },
                  { lbl: "Duração", val: obra.duration },
                ].map(({ lbl, val }) =>
                  val ? (
                    <div key={lbl} data-reveal className="flex flex-col gap-1.5 border-l border-offwhite/15 pl-4">
                      <dt className="font-mono text-[0.62rem] tracking-[0.2em] uppercase text-offwhite/45">{lbl}</dt>
                      <dd className="font-display text-lg lg:text-xl text-offwhite">{val}</dd>
                    </div>
                  ) : null,
                )}
              </dl>
            </div>
          </div>
        </section>

        {/* Hero image */}
        <section className="bg-graphite">
          <div className="max-w-container mx-auto px-5 md:px-8 lg:px-12 pb-16">
            <div className="relative aspect-[16/9] overflow-hidden border border-offwhite/12">
              <Image
                src={obra.src}
                alt={obra.alt}
                fill
                priority
                quality={92}
                sizes="(min-width:1320px) 1200px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Scope + content */}
        {obra.scope && (
          <section className="bg-offwhite border-y border-graphite/12" style={{ paddingBlock: "clamp(60px, 8vw, 110px)" }}>
            <div className="max-w-container mx-auto px-5 md:px-8 lg:px-12 grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-20 items-start">
              <div>
                <span data-reveal className="section-index">
                  <span className="section-index__num">∗</span>
                  <span className="section-index__label">Âmbito da obra</span>
                </span>
              </div>
              <div className="flex flex-col gap-6">
                <h2
                  data-reveal
                  className="font-display font-light tracking-[-0.02em] leading-tight text-graphite"
                  style={{ fontSize: "clamp(1.8rem, 3.4vw, 2.8rem)" }}
                >
                  {obra.scope.split(" · ").map((s, i) => (
                    <span key={s}>
                      {i > 0 && <span className="text-bronze/60 mx-2">·</span>}
                      {s}
                    </span>
                  ))}
                </h2>
                <p data-reveal data-d="100" className="lead text-graphite/80 max-w-[60ch]">
                  Cada ponto da lista é uma fase tratada com a mesma exigência.
                  Materiais selecionados, equipa responsável, prazo cumprido.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* CTA + neighbour navigation */}
        <section className="bg-graphite text-offwhite" style={{ paddingBlock: "clamp(60px, 8vw, 100px)" }}>
          <div className="max-w-container mx-auto px-5 md:px-8 lg:px-12">
            <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-20 pb-16 lg:pb-20 items-center">
              <h2
                className="font-display font-light tracking-[-0.025em] leading-tight"
                style={{ fontSize: "clamp(1.8rem, 3.6vw, 3rem)" }}
              >
                <span data-reveal="line"><span>Quer um projeto</span></span>
                <span data-reveal="line" data-d="100"><span><em className="not-italic italic text-bronze">com este nível?</em></span></span>
              </h2>
              <div className="flex flex-wrap gap-3">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="btn btn--bronze btn--lg">
                  <WhatsAppIcon className="w-[18px] h-[18px]" />
                  <span>Falar pelo WhatsApp</span>
                </a>
                <Link href="/#orcamento" className="btn btn--ghost btn--ghost-light btn--lg">
                  <span>Pedir orçamento</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-px bg-offwhite/12 border border-offwhite/12">
              <Link
                href={`/obras/${prev.slug}`}
                className="group bg-graphite p-7 lg:p-10 flex flex-col gap-3 hover:bg-graphite/70 transition-colors duration-500"
                data-cursor="← Anterior"
              >
                <span className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-bronze">← Obra anterior</span>
                <span className="font-display font-light text-2xl tracking-[-0.01em]">{prev.title}</span>
                <span className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-offwhite/55">
                  {prev.location} · {prev.year}
                </span>
              </Link>
              <Link
                href={`/obras/${next.slug}`}
                className="group bg-graphite p-7 lg:p-10 flex flex-col gap-3 sm:items-end sm:text-right hover:bg-graphite/70 transition-colors duration-500"
                data-cursor="Seguinte →"
              >
                <span className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-bronze">Obra seguinte →</span>
                <span className="font-display font-light text-2xl tracking-[-0.01em]">{next.title}</span>
                <span className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-offwhite/55">
                  {next.location} · {next.year}
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
      <RevealInit />
    </>
  );
}
