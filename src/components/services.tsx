import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "@/lib/constants";
import { ArrowRight } from "./icons";
import { GhostNumber } from "./ghost-number";
import { SectionTitleCard } from "./section-title-card";

export function Services() {
  return (
    <section
      id="servicos"
      className="relative texture-concrete bg-offwhite border-b border-graphite/12 overflow-hidden"
      style={{ paddingBlock: "clamp(80px, 11vw, 160px)" }}
    >
      <GhostNumber num="03" position="right" />
      <SectionTitleCard num="03" label="Serviços" />
      <div className="relative max-w-container mx-auto px-5 md:px-8 lg:px-12">
        <header className="grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-20 items-end pb-12 lg:pb-20">
          <div className="flex flex-col gap-7">
            <div data-reveal className="section-index">
              <span className="section-index__num">03</span>
              <span className="section-index__label">Serviços</span>
            </div>
            <h2 className="display">
              <span data-reveal="line"><span>Soluções completas</span></span>
              <span data-reveal="line" data-d="100"><span><em>para cada espaço.</em></span></span>
            </h2>
          </div>
          <p data-reveal data-d="200" className="font-display font-light text-graphite/80 max-w-[44ch]" style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)", lineHeight: 1.5 }}>
            Da estrutura ao acabamento, da elétrica à piscina. Tudo executado
            por uma única equipa, com método e responsabilidade técnica.
          </p>
        </header>

        <div className="services-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-graphite/12 border border-graphite/12">
          {SERVICES.map((s, i) => (
            <Link
              key={s.num}
              href={`/servicos/${s.slug}`}
              data-reveal
              data-d={i * 100}
              data-cursor="Saber mais →"
              className="service-card group relative bg-offwhite p-7 sm:p-8 lg:p-10 flex flex-col gap-6 cursor-pointer transition-[colors,opacity,transform] duration-500 hover:bg-offwhite-2 overflow-hidden"
            >
              {/* Ghost number — rises from below on hover */}
              <span
                aria-hidden="true"
                className="absolute -bottom-8 -right-2 font-display font-light text-graphite/[0.06] leading-none pointer-events-none select-none transition-[transform,color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-3 group-hover:text-bronze/15"
                style={{ fontSize: "12rem", letterSpacing: "-0.06em" }}
              >
                {s.num}
              </span>

              {/* Bronze L-bracket on hover (top-left + bottom-right) */}
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 w-0 h-px bg-bronze transition-[width] duration-500 ease-out group-hover:w-8"
              />
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 h-0 w-px bg-bronze transition-[height] duration-500 ease-out delay-100 group-hover:h-8"
              />
              <span
                aria-hidden="true"
                className="absolute bottom-0 right-0 w-0 h-px bg-bronze transition-[width] duration-500 ease-out group-hover:w-8"
              />
              <span
                aria-hidden="true"
                className="absolute bottom-0 right-0 h-0 w-px bg-bronze transition-[height] duration-500 ease-out delay-100 group-hover:h-8"
              />

              {/* Image with vertical clip-path mask reveal */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.alt}
                  fill
                  loading="lazy"
                  quality={70}
                  sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  className="object-cover transition-[transform,filter,clip-path] duration-[1.2s] ease-out group-hover:scale-[1.06]"
                  style={{
                    filter: "grayscale(35%) contrast(1.05)",
                    clipPath: "inset(0 0 0 0)",
                  }}
                />
                {/* Sweep curtain (right→left wipe) */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-bronze/15 origin-right scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] group-hover:scale-x-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-graphite/20 to-transparent pointer-events-none" />
              </div>

              <div className="relative flex flex-col gap-3 flex-1 z-[1]">
                <span className="font-mono text-[0.72rem] tracking-[0.16em] text-bronze">{s.num}</span>
                <h3 className="font-display font-normal tracking-[-0.02em] leading-tight text-graphite" style={{ fontSize: "clamp(1.45rem, 2vw, 1.75rem)" }}>
                  {s.title}
                </h3>
                <p className="text-[0.95rem] text-graphite/75 leading-relaxed max-w-[38ch]">{s.blurb}</p>

                <span className="mt-auto pt-4 inline-flex items-center gap-2.5 font-mono text-[0.72rem] tracking-[0.14em] uppercase text-graphite transition-[color,gap] duration-500 group-hover:text-bronze group-hover:gap-3.5">
                  <span>Saber mais</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
