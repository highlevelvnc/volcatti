/**
 * Materials & finishes — decorative section showcasing the material
 * vocabulary Volcatti works with. Pure CSS texture cards (no extra
 * image weight). Reinforces the premium, tactile feel.
 */

const MATERIALS = [
  {
    name: "Mármore",
    tag: "Estatuário",
    note: "Bancadas, paredes, casas de banho",
    bg: "linear-gradient(135deg, #F4F1EA 0%, #E8E3D6 40%, #D9D2BF 100%), repeating-linear-gradient(45deg, transparent 0 8px, rgba(184,138,42,0.04) 8px 9px)",
  },
  {
    name: "Carvalho",
    tag: "Maciço",
    note: "Carpintaria, pavimentos, mobiliário",
    bg: "linear-gradient(180deg, #C9A06D 0%, #A47B47 60%, #8D6431 100%), repeating-linear-gradient(0deg, transparent 0 4px, rgba(0,0,0,0.06) 4px 5px)",
  },
  {
    name: "Betão",
    tag: "Aparente",
    note: "Estrutura, pavimentos técnicos",
    bg: "linear-gradient(135deg, #C9C3B8 0%, #A8A299 100%), radial-gradient(circle at 30% 40%, rgba(0,0,0,0.08) 0%, transparent 30%), radial-gradient(circle at 70% 60%, rgba(0,0,0,0.08) 0%, transparent 30%)",
  },
  {
    name: "Bronze",
    tag: "Escovado",
    note: "Detalhes, ferragens, iluminação",
    bg: "linear-gradient(135deg, #D4A047 0%, #B88A2A 50%, #8E6A1F 100%)",
  },
  {
    name: "Vidro",
    tag: "Temperado",
    note: "Marquises, divisórias, duches",
    bg: "linear-gradient(135deg, #E8F0F2 0%, #C8DDDF 50%, #A2BFC1 100%), linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 50%)",
  },
  {
    name: "Latão",
    tag: "Polido",
    note: "Acabamentos finos, torneiras",
    bg: "linear-gradient(135deg, #E8B85F 0%, #C5944A 50%, #8D652E 100%)",
  },
];

export function Materials() {
  return (
    <section
      className="relative bg-offwhite border-b border-graphite/12 overflow-hidden"
      style={{ paddingBlock: "clamp(80px, 11vw, 160px)" }}
    >
      <div className="max-w-container mx-auto px-5 md:px-8 lg:px-12 relative">
        <header className="grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-20 items-end pb-12 lg:pb-20">
          <div className="flex flex-col gap-7">
            <div data-reveal className="section-index">
              <span className="section-index__num">∗</span>
              <span className="section-index__label">Materiais & Acabamentos</span>
            </div>
            <h2 className="display">
              <span data-reveal="line"><span>O vocabulário</span></span>
              <span data-reveal="line" data-d="100"><span>de uma <em>boa obra.</em></span></span>
            </h2>
          </div>
          <p data-reveal data-d="200" className="font-display font-light text-graphite/80 max-w-[44ch]" style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)", lineHeight: 1.5 }}>
            Trabalhamos com materiais nobres, fornecedores certificados
            e técnicas que sobrevivem ao tempo. Sem atalhos.
          </p>
        </header>

        <ul className="grid grid-cols-2 lg:grid-cols-6 gap-3">
          {MATERIALS.map((m, i) => (
            <li
              key={m.name}
              data-reveal
              data-d={i * 80}
              className="group relative aspect-[3/4] overflow-hidden border border-graphite/12 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5"
              data-cursor={m.tag}
            >
              <div
                className="absolute inset-0 transition-transform duration-1000 group-hover:scale-105"
                style={{ background: m.bg, backgroundBlendMode: "multiply" }}
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(17,17,17,0.7) 100%)" }} />
              <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-1 text-offwhite">
                <span className="font-mono text-[0.6rem] tracking-[0.18em] uppercase text-bronze">— {m.tag}</span>
                <span className="font-display text-lg font-normal tracking-[-0.01em]">{m.name}</span>
                <span className="font-mono text-[0.6rem] tracking-[0.1em] uppercase text-offwhite/60 hidden sm:block">{m.note}</span>
              </div>
              <span className="absolute top-3 right-3 font-mono text-[0.55rem] tracking-[0.16em] uppercase text-offwhite/55 px-1.5 py-0.5 border border-offwhite/40">
                {String(i + 1).padStart(2, "0")}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
