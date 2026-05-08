import Image from "next/image";
import { COMPANY, WHATSAPP_URL } from "@/lib/constants";
import { ArrowRight, WhatsAppIcon } from "./icons";

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
          sizes="100vw"
          className="object-cover"
          style={{ filter: "grayscale(45%) contrast(1.05)" }}
        />
      </div>
      <div
        className="absolute inset-0 -z-[1]"
        style={{
          background:
            "linear-gradient(180deg, rgba(23,50,56,0.85) 0%, rgba(17,17,17,0.95) 100%)",
        }}
      />

      <svg className="absolute inset-0 w-full h-full -z-[1] pointer-events-none" viewBox="0 0 1440 700" preserveAspectRatio="none" aria-hidden="true">
        <line x1="120" y1="0" x2="120" y2="700" stroke="rgba(244,241,234,0.14)" strokeWidth="1" />
        <line x1="1320" y1="0" x2="1320" y2="700" stroke="rgba(244,241,234,0.14)" strokeWidth="1" />
        <line x1="0" y1="120" x2="1440" y2="120" stroke="rgba(244,241,234,0.14)" strokeWidth="1" />
        <line x1="0" y1="580" x2="1440" y2="580" stroke="rgba(244,241,234,0.14)" strokeWidth="1" />
      </svg>

      <div className="relative z-[1] max-w-container mx-auto px-5 md:px-8 lg:px-12 max-w-[980px]">
        <span data-reveal className="inline-block font-mono text-[0.72rem] tracking-[0.18em] uppercase text-offwhite/65 mb-7 pl-3.5 border-l-2 border-bronze">
          N.º 09 · Orçamento
        </span>

        <h2 className="display display--light mb-9 lg:mb-12">
          <span data-reveal="line"><span>Tem uma obra,</span></span>
          <span data-reveal="line" data-d="100"><span>remodelação ou piscina</span></span>
          <span data-reveal="line" data-d="200"><span><em>em mente?</em></span></span>
        </h2>

        <p data-reveal data-d="300" className="lead lead--light mb-10 lg:mb-13 max-w-[56ch]">
          Fale com a Volcatti e receba um orçamento personalizado para o seu projeto.
          Sem compromisso, com a clareza que merece.
        </p>

        <div data-reveal data-d="400" className="flex flex-wrap gap-3.5 mb-14 lg:mb-22">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="btn btn--bronze btn--lg">
            <WhatsAppIcon className="w-[18px] h-[18px]" />
            <span>Pedir pelo WhatsApp</span>
          </a>
          <a href={`mailto:${COMPANY.email}`} className="btn btn--ghost btn--ghost-light btn--lg">
            <span>Enviar mensagem</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div data-reveal data-d="500" className="grid sm:grid-cols-3 gap-6 sm:gap-12 pt-9 lg:pt-14 border-t border-offwhite/18">
          {[
            { lbl: "Telefone", val: COMPANY.phone },
            { lbl: "Email", val: COMPANY.email },
            { lbl: "Resposta média", val: "24 horas úteis" },
          ].map((c) => (
            <div key={c.lbl} className="flex flex-col gap-1.5">
              <span className="font-mono text-[0.68rem] tracking-[0.14em] uppercase text-offwhite/55">{c.lbl}</span>
              <span className="font-display font-normal text-offwhite" style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)" }}>{c.val}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
