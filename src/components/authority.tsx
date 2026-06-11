import { STATS } from "@/lib/constants";
import { StatCounter } from "./stat-counter";
import { GhostNumber } from "./ghost-number";
import { AuthorityImage } from "./authority-image";
import Image from "next/image";

export function Authority() {
  return (
    <section
      id="sobre"
      className="relative texture-concrete bg-offwhite border-b border-graphite/12"
      style={{
        paddingBlock: "clamp(80px, 9vw, 140px)",
        // Section is intentionally taller than viewport so the sticky
        // image has runway to pin + zoom through. Roughly 1.5–1.7× the
        // viewport height.
        minHeight: "180vh",
        // overflow:clip (not hidden!) so the sticky descendant can pin
        // properly. overflow:hidden makes the section a scroll context,
        // which kills position:sticky on children.
        overflow: "clip",
      }}
    >
      <GhostNumber num="02" position="right" />

      <div className="relative max-w-container mx-auto px-5 md:px-8 lg:px-12 grid lg:grid-cols-[320px_1fr] gap-10 lg:gap-14 xl:gap-20 lg:min-h-[150vh]">
        {/* Sidebar — index + pinned image (zooms with scroll).
            Mobile: flex column. Desktop: BLOCK (not flex) so the
            sticky child can pin properly — sticky inside a flex
            parent has quirky behaviour in Chromium. lg:h-full
            stretches it to the full grid row height (= 150vh). */}
        <aside className="flex flex-col gap-6 items-center lg:block lg:gap-0 lg:h-full">
          <div data-reveal className="section-index lg:mb-7">
            <span className="section-index__num">02</span>
            <span className="section-index__label">Posicionamento</span>
          </div>

          {/* Mobile-only static image (sticky/zoom is desktop only) */}
          <div data-reveal data-d="100" className="lg:hidden aspect-[3/4] w-full max-w-[320px] overflow-hidden border border-graphite/12 relative">
            <Image
              src="/portfolio/posicionamento.jpg"
              alt="Espaço comercial Volcatti — barbearia com acabamentos premium"
              fill
              loading="lazy"
              quality={82}
              sizes="320px"
              className="object-cover volcatti-look"
            />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-graphite/85 to-transparent">
              <span className="block font-mono text-[0.58rem] tracking-[0.22em] uppercase text-bronze mb-0.5">
                ▸ Obra Volcatti
              </span>
              <span className="block font-mono text-[0.6rem] tracking-[0.14em] uppercase text-offwhite/90">
                Espaço Comercial · Barbearia
              </span>
            </div>
          </div>

          {/* Desktop — sticky pinned image with scroll-linked zoom */}
          <AuthorityImage
            src="/portfolio/posicionamento.jpg"
            alt="Espaço comercial Volcatti — barbearia com acabamentos premium"
            kicker="▸ Obra Volcatti"
            caption="Espaço Comercial · Barbearia"
          />
        </aside>

        {/* Content — scrolls past the pinned image */}
        <div className="max-w-[920px]">
          <h2 className="display mb-8 lg:mb-10">
            <span data-reveal="line"><span>Precisão em cada etapa.</span></span>
            <span data-reveal="line" data-d="100"><span><em>Excelência em cada detalhe.</em></span></span>
          </h2>

          <div className="flex flex-col gap-6 max-w-[60ch]">
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
              className="grid grid-cols-1 sm:grid-cols-3 gap-7 sm:gap-12 mt-8 lg:mt-10 pt-7 lg:pt-10 border-t border-graphite/12"
            >
              {STATS.map((s) => (
                <li
                  key={s.label}
                  className="stat-flip flex flex-col gap-2 items-center text-center sm:items-start sm:text-left [perspective:800px] cursor-help"
                  tabIndex={0}
                  data-cursor="Virar"
                >
                  <div className="stat-flip-inner relative w-full transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] [transform-style:preserve-3d]">
                    {/* Front */}
                    <div className="flex flex-col gap-2 items-center text-center sm:items-start sm:text-left [backface-visibility:hidden]">
                      <StatCounter target={s.num} suffix={s.suffix} prefix={"prefix" in s ? s.prefix : undefined} />
                      <span className="font-mono text-[0.72rem] tracking-[0.14em] uppercase text-graphite/60">
                        {s.label}
                      </span>
                    </div>
                    {/* Back */}
                    <div className="absolute inset-0 flex flex-col gap-2 items-center text-center sm:items-start sm:text-left [backface-visibility:hidden] [transform:rotateY(180deg)]">
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

            {/* Extra editorial blurb — gives the right column more height
                so the sticky image has more pin range. */}
            <div
              data-reveal
              data-d="500"
              className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 pt-10 lg:pt-12 border-t border-graphite/12"
            >
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[0.62rem] tracking-[0.22em] uppercase text-bronze">
                  ▸ Como pensamos
                </span>
                <p className="font-display font-light text-graphite/80 leading-snug" style={{ fontSize: "clamp(1.05rem, 1.3vw, 1.18rem)" }}>
                  Cada obra começa com um <em className="text-bronze italic font-normal">plano por escrito</em> —
                  capítulos, cronograma, materiais e prazos. Nada se decide em obra que não tenha
                  sido validado antes.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[0.62rem] tracking-[0.22em] uppercase text-bronze">
                  ▸ Como entregamos
                </span>
                <p className="font-display font-light text-graphite/80 leading-snug" style={{ fontSize: "clamp(1.05rem, 1.3vw, 1.18rem)" }}>
                  Vistoria conjunta, ata assinada e garantia de obra
                  <em className="text-bronze italic font-normal"> definida por mútuo acordo </em>
                  — até cinco anos sobre estrutura e impermeabilização,
                  conforme o âmbito de cada projeto.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
