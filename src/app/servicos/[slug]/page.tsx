import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { SERVICES, GALLERY, GALLERY_FILTERS, COMPANY, WHATSAPP_URL } from "@/lib/constants";
import { ArrowRight, WhatsAppIcon } from "@/components/icons";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { ScrollProgress } from "@/components/scroll-progress";
import { RevealInit } from "@/components/reveal-init";
import { Breadcrumbs } from "@/components/breadcrumbs";

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.intro ?? service.blurb,
    openGraph: {
      title: `${service.title} · ${COMPANY.name}`,
      description: service.intro ?? service.blurb,
      images: [{ url: service.image, alt: service.alt }],
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const idx = SERVICES.findIndex((s) => s.slug === slug);
  const next = SERVICES[(idx + 1) % SERVICES.length];
  const related = service.relatedCat
    ? GALLERY.filter((g) => g.cat === service.relatedCat).slice(0, 3)
    : [];

  // Service schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    name: `${service.title} · ${COMPANY.name}`,
    description: service.intro ?? service.blurb,
    provider: { "@type": "Organization", name: COMPANY.name, url: COMPANY.url },
    areaServed: { "@type": "Country", name: "Portugal" },
    ...(service.scope ? { hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.title} — Âmbito`,
      itemListElement: service.scope.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s } })),
    } } : {}),
  };

  // FAQPage schema (when service has FAQ)
  const faqSchema = service.faq ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faq.map((q) => ({
      "@type": "Question",
      name: q.q,
      acceptedAnswer: { "@type": "Answer", text: q.a },
    })),
  } : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <ScrollProgress />
      <RevealInit />
      <Header />
      <main>
        {/* Hero */}
        <section className="relative pt-[calc(var(--header-h)+40px)] pb-16 lg:pb-24 bg-graphite text-offwhite overflow-hidden">
          <div className="absolute inset-0 -z-[2]">
            <Image
              src={service.image}
              alt={service.alt}
              fill
              priority
              quality={88}
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: "center 35%", filter: "grayscale(45%) contrast(1.05)" }}
            />
          </div>
          <div
            className="absolute inset-0 -z-[1]"
            style={{ background: "linear-gradient(180deg, rgba(17,17,17,0.92) 0%, rgba(17,17,17,0.7) 50%, rgba(17,17,17,0.95) 100%)" }}
          />

          <div className="relative max-w-container mx-auto px-5 md:px-8 lg:px-12">
            <div className="mb-8">
              <Breadcrumbs
                light
                items={[
                  { label: "Início", href: "/" },
                  { label: "Serviços", href: "/#servicos" },
                  { label: service.title },
                ]}
              />
            </div>

            <span data-reveal className="font-mono text-[0.72rem] tracking-[0.22em] uppercase text-bronze block mb-5">
              Serviço · N.º {service.num}
            </span>
            <h1
              className="font-display font-light leading-[0.95] tracking-[-0.025em] mb-8 max-w-[18ch]"
              style={{ fontSize: "clamp(2.6rem, 7vw, 6rem)" }}
            >
              <span data-reveal="line">
                <span>{service.title}</span>
              </span>
            </h1>
            {service.intro && (
              <p
                data-reveal
                data-d="100"
                className="font-display font-light text-offwhite/85 max-w-[60ch]"
                style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.35rem)", lineHeight: 1.55 }}
              >
                {service.intro}
              </p>
            )}

            <div data-reveal data-d="200" className="flex flex-wrap gap-3 mt-10">
              <a href="/#orcamento" className="btn btn--bronze btn--lg">
                <span>Pedir orçamento</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="btn btn--ghost btn--ghost-light btn--lg">
                <WhatsAppIcon className="w-[18px] h-[18px]" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </section>

        {/* Scope */}
        {service.scope && service.scope.length > 0 && (
          <section className="bg-offwhite border-y border-graphite/12 texture-concrete" style={{ paddingBlock: "clamp(60px, 8vw, 110px)" }}>
            <div className="max-w-container mx-auto px-5 md:px-8 lg:px-12 grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-20 items-start">
              <div>
                <span data-reveal className="section-index">
                  <span className="section-index__num">∗</span>
                  <span className="section-index__label">Âmbito</span>
                </span>
                <h2 data-reveal data-d="100" className="display mt-7">
                  O que incluímos<br />
                  <em>em obra.</em>
                </h2>
              </div>

              <ul className="grid sm:grid-cols-2 gap-px bg-graphite/12 border border-graphite/12">
                {service.scope.map((item, i) => (
                  <li
                    key={item}
                    data-reveal
                    data-d={i * 60}
                    className="bg-offwhite p-7 flex items-start gap-4"
                  >
                    <span className="font-mono text-[0.65rem] tracking-[0.18em] text-bronze pt-1 flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display font-normal leading-snug text-graphite" style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)" }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Related projects */}
        {related.length > 0 && (
          <section className="bg-offwhite-2 border-b border-graphite/12" style={{ paddingBlock: "clamp(60px, 8vw, 110px)" }}>
            <div className="max-w-container mx-auto px-5 md:px-8 lg:px-12">
              <header className="grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-20 items-end pb-10 lg:pb-14">
                <div>
                  <span data-reveal className="section-index">
                    <span className="section-index__num">∗</span>
                    <span className="section-index__label">Obras relacionadas</span>
                  </span>
                  <h2 data-reveal data-d="100" className="display mt-7">
                    Veja em <em>execução.</em>
                  </h2>
                </div>
                <Link
                  href="/#obras"
                  className="font-mono text-[0.7rem] tracking-[0.16em] uppercase text-graphite hover:text-bronze transition-colors duration-300 inline-flex items-center gap-2 self-end pb-2"
                  data-cursor="Ver todas"
                >
                  Ver todas as obras <ArrowRight className="w-3 h-3" />
                </Link>
              </header>
              <ul className="grid sm:grid-cols-3 gap-3">
                {related.map((obra, i) => (
                  <li key={obra.slug} data-reveal data-d={i * 100}>
                    <Link
                      href={`/obras/${obra.slug}`}
                      className="group block aspect-[4/5] relative overflow-hidden bg-graphite"
                      data-cursor="Ver obra →"
                    >
                      <Image
                        src={obra.src}
                        alt={obra.alt}
                        fill
                        sizes="(min-width:640px) 33vw, 100vw"
                        className="object-cover transition-transform duration-1000 group-hover:scale-[1.05]"
                        style={{ filter: "grayscale(15%) contrast(1.04)" }}
                      />
                      <span className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-graphite/95 via-graphite/40 to-transparent">
                        <span className="block font-mono text-[0.62rem] tracking-[0.2em] uppercase text-bronze mb-1.5">
                          {GALLERY_FILTERS.find((f) => f.value === obra.cat)?.label}
                        </span>
                        <span className="block font-display text-lg lg:text-xl text-offwhite leading-tight">{obra.title}</span>
                        <span className="block font-mono text-[0.6rem] tracking-[0.14em] uppercase text-offwhite/70 mt-1">
                          {obra.location} · {obra.year}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* FAQ */}
        {service.faq && service.faq.length > 0 && (
          <section className="bg-offwhite border-b border-graphite/12" style={{ paddingBlock: "clamp(60px, 8vw, 110px)" }}>
            <div className="max-w-container mx-auto px-5 md:px-8 lg:px-12">
              <header className="pb-10 lg:pb-14 max-w-[640px]">
                <span data-reveal className="section-index">
                  <span className="section-index__num">∗</span>
                  <span className="section-index__label">FAQ {service.title}</span>
                </span>
                <h2 data-reveal data-d="100" className="display mt-7">
                  Perguntas <em>específicas.</em>
                </h2>
              </header>
              <ul className="border-t border-graphite/15 max-w-[920px]">
                {service.faq.map((item, i) => (
                  <li key={item.q} data-reveal className="border-b border-graphite/15 py-7 lg:py-8">
                    <div className="flex items-baseline gap-5 lg:gap-7 mb-3">
                      <span className="font-mono text-[0.7rem] tracking-[0.18em] text-bronze pt-0.5 flex-shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-display font-normal text-graphite tracking-[-0.01em]" style={{ fontSize: "clamp(1.15rem, 1.7vw, 1.45rem)" }}>
                        {item.q}
                      </h3>
                    </div>
                    <p className="pl-9 lg:pl-12 font-display font-light text-graphite/80 max-w-[64ch]" style={{ fontSize: "clamp(1rem, 1.25vw, 1.1rem)", lineHeight: 1.6 }}>
                      {item.a}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* CTA + neighbour */}
        <section className="bg-graphite text-offwhite" style={{ paddingBlock: "clamp(60px, 8vw, 100px)" }}>
          <div className="max-w-container mx-auto px-5 md:px-8 lg:px-12">
            <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-20 pb-12 lg:pb-16 items-center">
              <h2
                className="font-display font-light tracking-[-0.025em] leading-tight"
                style={{ fontSize: "clamp(1.8rem, 3.6vw, 3rem)" }}
              >
                <span data-reveal="line"><span>Quer um orçamento</span></span>
                <span data-reveal="line" data-d="100">
                  <span>
                    para <em className="not-italic italic text-bronze">{service.title.toLowerCase()}?</em>
                  </span>
                </span>
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

            <Link
              href={`/servicos/${next.slug}`}
              className="group block bg-offwhite/[0.04] hover:bg-offwhite/[0.08] border border-offwhite/12 p-8 lg:p-10 transition-colors duration-500"
              data-cursor="Próximo →"
            >
              <span className="block font-mono text-[0.65rem] tracking-[0.18em] uppercase text-bronze mb-3">Próximo serviço →</span>
              <span className="block font-display font-light text-3xl lg:text-4xl tracking-[-0.02em]">{next.title}</span>
              <span className="block font-mono text-[0.65rem] tracking-[0.14em] uppercase text-offwhite/55 mt-3">
                N.º {next.num} · {next.blurb.slice(0, 70)}…
              </span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
