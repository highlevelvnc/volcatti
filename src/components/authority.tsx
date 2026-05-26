import Image from "next/image";
import { STATS } from "@/lib/constants";
import { StatCounter } from "./stat-counter";
import { GhostNumber } from "./ghost-number";
import { SectionTitleCard } from "./section-title-card";

export function Authority() {
  return (
    <section
      id="sobre"
      className="relative texture-concrete bg-offwhite border-b border-graphite/12 overflow-hidden"
      style={{ paddingBlock: "clamp(56px, 7vw, 110px)" }}
    >
      <GhostNumber num="02" position="right" />
      <SectionTitleCard num="02" label="Posicionamento" />
      <div className="relative max-w-container mx-auto px-5 md:px-8 lg:px-12 grid lg:grid-cols-[280px_1fr] gap-10 lg:gap-16 xl:gap-24">
        {/* Sidebar */}
        <aside className="flex flex-row lg:flex-col lg:sticky lg:top-32 self-start gap-6 lg:gap-10 items-center lg:items-start">
          <div data-reveal className="section-index">
            <span className="section-index__num">02</span>
            <span className="section-index__label">Posicionamento</span>
          </div>
          <div data-reveal data-d="100" className="hidden lg:block aspect-[4/5] w-[240px] overflow-hidden border border-graphite/12">
            <Image
              src="/portfolio/wc-marmore.png"
              alt="Detalhe de acabamento em mármore"
              width={480}
              height={600}
              loading="lazy"
              quality={70}
              sizes="240px"
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              style={{ filter: "grayscale(20%)" }}
            />
          </div>
        </aside>

        {/* Content */}
        <div className="max-w-[920px]">
          <h2 className="display mb-10 lg:mb-14">
            <span data-reveal="line"><span>Precisão em cada etapa.</span></span>
            <span data-reveal="line" data-d="100"><span><em>Excelência em cada detalhe.</em></span></span>
          </h2>

          <div className="flex flex-col gap-7 max-w-[60ch]">
            <p data-reveal data-d="200" className="lead drop-cap">
              A Volcatti atua do planeamento à entrega final, com foco em
              organização, execução técnica e qualidade. Cada projeto é tratado
              com a atenção que um espaço bem construído merece.
            </p>
            <p data-reveal data-d="300" className="text-graphite/80 text-base leading-relaxed">
              Trabalhamos para que cada obra reflita não apenas funcionalidade,
              mas também o cuidado com o acabamento, a segurança e o tempo do cliente.
              É a diferença entre construir e <em className="text-bronze italic font-normal">entregar</em>.
            </p>

            {/* Stats */}
            <ul
              data-reveal
              data-d="400"
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-12 mt-12 lg:mt-18 pt-9 lg:pt-14 border-t border-graphite/12"
            >
              {STATS.map((s) => (
                <li
                  key={s.label}
                  className="stat-flip flex flex-col gap-2 [perspective:800px] cursor-help"
                  tabIndex={0}
                  data-cursor="Virar"
                >
                  <div className="stat-flip-inner relative w-full transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] [transform-style:preserve-3d]">
                    {/* Front */}
                    <div className="flex flex-col gap-2 [backface-visibility:hidden]">
                      <StatCounter target={s.num} suffix={s.suffix} />
                      <span className="font-mono text-[0.72rem] tracking-[0.14em] uppercase text-graphite/60">
                        {s.label}
                      </span>
                    </div>
                    {/* Back */}
                    <div className="absolute inset-0 flex flex-col gap-2 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                      <span
                        className="font-display font-light leading-none tracking-[-0.025em] text-bronze"
                        style={{ fontSize: "clamp(2rem, 3.6vw, 3rem)" }}
                      >
                        {s.back.value}
                      </span>
                      <span className="font-mono text-[0.7rem] tracking-[0.14em] uppercase text-graphite/65">
                        {s.back.label}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
