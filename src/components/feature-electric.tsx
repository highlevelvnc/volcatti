import Image from "next/image";
import { ArrowRight } from "./icons";

const SPECS = [
  {
    num: "01",
    title: "Quadros e instalações",
    blurb: "Quadros elétricos, circuitos novos, certificações e diagnósticos técnicos.",
  },
  {
    num: "02",
    title: "Iluminação técnica",
    blurb: "Iluminação interior, exterior, jardim e piscina com soluções LED eficientes.",
  },
  {
    num: "03",
    title: "Automação & domótica",
    blurb: "Pré-instalação e instalação de sistemas inteligentes para casa e empresa.",
  },
];

export function FeatureElectric() {
  return (
    <section
      data-reveal
      className="relative bg-petroleum text-offwhite overflow-hidden isolate"
      style={{ paddingBlock: "clamp(56px, 7vw, 110px)" }}
    >
      {/* Atmospheric gradient */}
      <div
        className="absolute inset-0 -z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 80% 20%, rgba(184,138,42,0.10), transparent 50%), radial-gradient(ellipse at 10% 90%, rgba(31, 65, 72, 0.4), transparent 60%)",
        }}
      />

      {/* Animated technical lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-50"
        viewBox="0 0 1440 600"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 80 H 700 V 200 H 1200 V 60 H 1440" fill="none" stroke="rgba(184,138,42,0.55)" strokeWidth="1" strokeDasharray="3000" strokeDashoffset="3000" className="electric-line" />
        <path d="M0 540 H 240 V 420 H 600 V 520 H 1100 V 380 H 1440" fill="none" stroke="rgba(184,138,42,0.55)" strokeWidth="1" strokeDasharray="3000" strokeDashoffset="3000" className="electric-line" style={{ animationDelay: "200ms" }} />
        <path d="M120 0 V 280 H 380 V 600" fill="none" stroke="rgba(184,138,42,0.55)" strokeWidth="1" strokeDasharray="3000" strokeDashoffset="3000" className="electric-line" style={{ animationDelay: "400ms" }} />
        <path d="M1320 0 V 240 H 980 V 600" fill="none" stroke="rgba(184,138,42,0.55)" strokeWidth="1" strokeDasharray="3000" strokeDashoffset="3000" className="electric-line" style={{ animationDelay: "600ms" }} />
        <circle cx="700" cy="80" r="4" fill="#B88A2A" />
        <circle cx="1200" cy="200" r="4" fill="#B88A2A" />
        <circle cx="380" cy="280" r="4" fill="#B88A2A" />
        <circle cx="980" cy="240" r="4" fill="#B88A2A" />
      </svg>

      <div className="relative max-w-container mx-auto px-5 md:px-8 lg:px-12 grid lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-20 items-center">
        <div className="flex flex-col gap-6 max-w-[580px]">
          <div data-reveal className="section-index section-index--light">
            <span className="section-index__num">05</span>
            <span className="section-index__label">Destaque · Elétrica</span>
          </div>

          <h2 className="display display--light">
            <span data-reveal="line"><span>Instalações elétricas</span></span>
            <span data-reveal="line" data-d="100"><span>seguras, funcionais</span></span>
            <span data-reveal="line" data-d="200"><span><em>e bem executadas.</em></span></span>
          </h2>

          <p data-reveal data-d="300" className="lead lead--light">
            Realizamos instalações novas, reparações e melhorias elétricas
            com atenção à segurança, eficiência e acabamento.
            Cada cabo, calha e ponto pensado com método.
          </p>

          <div className="border-t border-offwhite/15 mt-4">
            {SPECS.map((spec, i) => (
              <div
                key={spec.num}
                data-reveal
                data-d={350 + i * 100}
                className="grid grid-cols-[60px_1fr] gap-4 items-start py-5 border-b border-offwhite/15"
              >
                <span className="font-mono text-[0.8rem] font-medium tracking-[0.16em] text-bronze pt-1">
                  {spec.num}
                </span>
                <div>
                  <h4 className="font-sans text-base font-medium text-offwhite mb-1.5">{spec.title}</h4>
                  <p className="text-[0.92rem] text-offwhite/65 leading-relaxed max-w-[48ch]">{spec.blurb}</p>
                </div>
              </div>
            ))}
          </div>

          <a data-reveal data-d="700" href="#orcamento" className="btn btn--bronze w-fit mt-4">
            <span>Orçamentar elétrica</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="relative aspect-[5/6] overflow-hidden order-first lg:order-last">
          <Image
            src="/portfolio/marquise.png"
            alt="Marquise envidraçada com iluminação técnica — projeto Volcatti"
            fill
            loading="lazy"
            quality={75}
            sizes="(min-width:1024px) 50vw, 100vw"
            className="object-cover"
            style={{ filter: "grayscale(20%) contrast(1.05) brightness(0.95)" }}
          />
          <span className="absolute inset-0 border border-bronze/35 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
