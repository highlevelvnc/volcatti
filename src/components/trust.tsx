import { GhostNumber } from "./ghost-number";

const CERTIFICATIONS = [
  { code: "AICCOPN", label: "Construção" },
  { code: "CERTIEL", label: "Elétrica" },
  { code: "ISO 9001", label: "Qualidade" },
  { code: "RC PRO", label: "Seguro" },
  { code: "AT — DGCI", label: "Fiscal" },
  { code: "INCI", label: "Engenharia" },
];

const PARTNERS = ["Sika", "Saint-Gobain", "Ferrum", "Roca", "Maxit", "Hilti", "Schüco", "Cinca"];

/**
 * Trust section: certifications + partners. Pure typographic — no logos
 * (which would require official trademarks). Reads as a curated list
 * the way premium agencies present their stack.
 */
export function Trust() {
  return (
    <section
      className="relative bg-graphite text-offwhite border-y border-offwhite/[0.06] overflow-hidden"
      style={{ paddingBlock: "clamp(70px, 9vw, 130px)" }}
    >
      <div className="max-w-container mx-auto px-5 md:px-8 lg:px-12">
        <header className="grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-20 items-end pb-12 lg:pb-16">
          <div className="flex flex-col gap-7">
            <div data-reveal className="section-index section-index--light">
              <span className="section-index__num">∗</span>
              <span className="section-index__label">Confiança</span>
            </div>
            <h2 className="display display--light">
              <span data-reveal="line"><span>Trabalho regulado.</span></span>
              <span data-reveal="line" data-d="100"><span>Resultados <em>auditáveis.</em></span></span>
            </h2>
          </div>
          <p data-reveal data-d="200" className="font-display font-light text-offwhite/72 max-w-[44ch]" style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)", lineHeight: 1.55 }}>
            Empresa registada, equipa certificada e parceiros com nome.
            Documentação completa disponível a pedido.
          </p>
        </header>

        {/* Certifications grid */}
        <div data-reveal className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-offwhite/[0.08] border border-offwhite/12 mb-12 lg:mb-16">
          {CERTIFICATIONS.map((c) => (
            <div key={c.code} className="bg-graphite p-5 lg:p-7 flex flex-col gap-2 items-start">
              <span className="font-display font-light text-offwhite leading-none tracking-[-0.01em]" style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.3rem)" }}>
                {c.code}
              </span>
              <span className="font-mono text-[0.6rem] tracking-[0.16em] uppercase text-bronze">
                {c.label}
              </span>
            </div>
          ))}
        </div>

        {/* Partners marquee-style row */}
        <div data-reveal data-d="100" className="border-t border-offwhite/12 pt-8 lg:pt-10">
          <span className="block font-mono text-[0.65rem] tracking-[0.18em] uppercase text-offwhite/55 mb-6">
            ▸ Fornecedores parceiros
          </span>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            {PARTNERS.map((p, i) => (
              <span key={p} className="inline-flex items-center gap-3 font-display font-light text-offwhite/80" style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.5rem)" }}>
                {p}
                {i < PARTNERS.length - 1 && <span className="text-bronze text-sm">·</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
