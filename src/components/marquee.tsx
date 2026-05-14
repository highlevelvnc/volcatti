const ITEMS = [
  "Construção Civil",
  "Remodelações de Alto Padrão",
  "Piscinas Modernas",
  "Casas de Máquina",
  "Assistência a Piscinas",
  "Instalações Elétricas",
  "Acabamentos Finos",
  "Manutenção Técnica",
];

export function Marquee() {
  const looped = [...ITEMS, ...ITEMS];
  return (
    <div
      aria-hidden="true"
      className="relative bg-graphite text-offwhite py-6 overflow-hidden border-y border-offwhite/[0.06]"
    >
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-graphite to-transparent z-[1] pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-graphite to-transparent z-[1] pointer-events-none" />

      <div className="inline-flex items-center gap-9 whitespace-nowrap font-display italic font-light tracking-[-0.01em] marquee-scroll" style={{ fontSize: "clamp(1.4rem, 2.4vw, 2rem)" }}>
        {looped.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-9">
            <span className="text-offwhite italic">{item}</span>
            <span className="text-bronze text-[0.7em] not-italic -translate-y-[2px]">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
