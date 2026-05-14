import Image from "next/image";
import { COMPANY, WHATSAPP_URL } from "@/lib/constants";
import { WhatsAppIcon } from "./icons";
import { ContactForm } from "./contact-form";

export function CtaFinal() {
  return (
    <section
      id="orcamento"
      className="relative text-offwhite overflow-hidden isolate texture-grain"
      style={{ paddingBlock: "clamp(120px, 14vw, 200px)" }}
    >
      <div className="absolute inset-0 -z-[2]">
        <Image
          src="/portfolio/piscina-noturna.png"
          alt=""
          fill
          loading="lazy"
          quality={70}
          sizes="100vw"
          className="object-cover"
          style={{ filter: "grayscale(45%) contrast(1.05)" }}
        />
      </div>
      <div
        className="absolute inset-0 -z-[1]"
        style={{
          background:
            "linear-gradient(180deg, rgba(23,50,56,0.88) 0%, rgba(17,17,17,0.96) 100%)",
        }}
      />

      <svg className="absolute inset-0 w-full h-full -z-[1] pointer-events-none" viewBox="0 0 1440 700" preserveAspectRatio="none" aria-hidden="true">
        <line x1="120" y1="0" x2="120" y2="700" stroke="rgba(244,241,234,0.14)" strokeWidth="1" />
        <line x1="1320" y1="0" x2="1320" y2="700" stroke="rgba(244,241,234,0.14)" strokeWidth="1" />
        <line x1="0" y1="120" x2="1440" y2="120" stroke="rgba(244,241,234,0.14)" strokeWidth="1" />
        <line x1="0" y1="580" x2="1440" y2="580" stroke="rgba(244,241,234,0.14)" strokeWidth="1" />
      </svg>

      <div className="relative z-[1] max-w-container mx-auto px-5 md:px-8 lg:px-12 grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-start">
        {/* Pitch column */}
        <div>
          <span data-reveal className="inline-block font-mono text-[0.72rem] tracking-[0.18em] uppercase text-offwhite/65 mb-7 pl-3.5 border-l-2 border-bronze">
            N.º 09 · Orçamento
          </span>

          <h2 className="display display--light mb-9 lg:mb-12">
            <span data-reveal="line"><span>Tem uma obra,</span></span>
            <span data-reveal="line" data-d="100"><span>remodelação ou piscina</span></span>
            <span data-reveal="line" data-d="200"><span><em>em mente?</em></span></span>
          </h2>

          <p data-reveal data-d="300" className="lead lead--light mb-10 max-w-[52ch]">
            Conte-nos sobre o seu projeto. Visita técnica gratuita,
            orçamento detalhado em 5 dias úteis.
          </p>

          <div data-reveal data-d="400" className="flex flex-wrap gap-3 mb-10">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="btn btn--bronze">
              <WhatsAppIcon className="w-[18px] h-[18px]" />
              <span>Pedir pelo WhatsApp</span>
            </a>
            <a href={`tel:${COMPANY.phoneCompact}`} className="btn btn--ghost btn--ghost-light" data-cursor="Ligar">
              <span>Ligar agora</span>
            </a>
          </div>

          <div data-reveal data-d="500" className="grid grid-cols-2 gap-x-6 gap-y-5 pt-8 border-t border-offwhite/15 max-w-[420px]">
            {[
              { lbl: "Email", val: COMPANY.email },
              { lbl: "Telefone", val: COMPANY.phone },
              { lbl: "Sede", val: COMPANY.region },
              { lbl: "Resposta", val: "≤ 24h úteis" },
            ].map((c) => (
              <div key={c.lbl} className="flex flex-col gap-1">
                <span className="font-mono text-[0.66rem] tracking-[0.14em] uppercase text-offwhite/45">{c.lbl}</span>
                <span className="font-display text-[1.05rem] text-offwhite">{c.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form column */}
        <div data-reveal data-d="200" className="lg:pl-8 lg:border-l lg:border-offwhite/12">
          <h3 className="font-display font-light text-offwhite mb-2" style={{ fontSize: "clamp(1.4rem, 2vw, 1.75rem)", letterSpacing: "-0.015em" }}>
            <span className="text-bronze">▸</span> Pedido de orçamento
          </h3>
          <p className="font-mono text-[0.7rem] tracking-[0.14em] uppercase text-offwhite/50 mb-8">
            Preencha · Recebemos · Respondemos
          </p>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
