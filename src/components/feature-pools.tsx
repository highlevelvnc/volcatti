import Image from "next/image";
import { ArrowRight } from "./icons";

export function FeaturePools() {
  return (
    <section
      className="bg-offwhite border-b border-graphite/12 overflow-hidden"
      style={{ paddingBlock: "clamp(80px, 11vw, 160px)" }}
    >
      <div className="max-w-container mx-auto px-5 md:px-8 lg:px-12 grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-20 items-center">
        {/* Media */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src="/portfolio/piscina-diurna.png"
            alt="Piscina retangular com deck madeira e jacuzzi em pedra — projeto Volcatti em Sintra"
            fill
            loading="lazy"
            quality={75}
            sizes="(min-width:1024px) 50vw, 100vw"
            className="object-cover"
            style={{ filter: "grayscale(8%) contrast(1.04)" }}
          />
          <span className="absolute bottom-5 left-5 z-[2] py-2 px-3.5 bg-offwhite/95 font-mono text-[0.7rem] tracking-[0.16em] uppercase text-graphite border-l-2 border-bronze">
            — Piscinas Volcatti
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-6 max-w-[580px]">
          <div data-reveal className="section-index">
            <span className="section-index__num">04</span>
            <span className="section-index__label">Destaque · Piscinas</span>
          </div>

          <h2 className="display mt-2">
            <span data-reveal="line"><span>Piscinas pensadas</span></span>
            <span data-reveal="line" data-d="100"><span>para valorizar</span></span>
            <span data-reveal="line" data-d="200"><span><em>o seu espaço.</em></span></span>
          </h2>

          <p data-reveal data-d="300" className="lead">
            Projetamos e executamos piscinas com atenção à durabilidade,
            segurança, estética e acabamento. Da impermeabilização à iluminação,
            cada detalhe é pensado para durar décadas.
          </p>

          <ul className="flex flex-col gap-3.5 my-3 p-7 bg-offwhite-2 border-l-2 border-bronze">
            {[
              "Estudo prévio do terreno e implantação",
              "Estrutura armada · impermeabilização técnica",
              "Revestimentos premium · acabamento fino",
              "Filtragem, iluminação LED e automação",
            ].map((item, i) => (
              <li key={item} data-reveal data-d={350 + i * 80} className="flex items-center gap-3.5 text-[0.96rem] text-graphite">
                <span className="w-1.5 h-1.5 bg-bronze flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          <a data-reveal data-d="600" href="#orcamento" className="btn btn--ghost w-fit">
            <span>Orçamentar piscina</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
