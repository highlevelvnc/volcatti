/**
 * Stylized SVG map of Greater Lisbon area (Lisboa, Cascais, Sintra,
 * Oeiras, Loures, Mafra, Setúbal). Editorial-style — not a geographic
 * map, just blueprint-flavored regions with bronze pulse markers.
 */

const ZONES = [
  { x: 260, y: 340, label: "Palmela", count: "Sede", primary: true },
  { x: 220, y: 270, label: "Lisboa", count: "12 obras" },
  { x: 130, y: 280, label: "Cascais", count: "8 obras" },
  { x: 110, y: 220, label: "Sintra", count: "6 obras" },
  { x: 175, y: 270, label: "Oeiras", count: "4 obras" },
  { x: 230, y: 200, label: "Loures", count: "3 obras" },
  { x: 270, y: 365, label: "Setúbal", count: "5 obras" },
];

export function ZonesMap() {
  return (
    <section
      className="relative bg-offwhite-2 border-b border-graphite/12 overflow-hidden"
      style={{ paddingBlock: "clamp(70px, 9vw, 130px)" }}
    >
      <div className="max-w-container mx-auto px-5 md:px-8 lg:px-12">
        <header className="grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-20 items-end pb-12 lg:pb-16">
          <div className="flex flex-col gap-7">
            <div data-reveal className="section-index">
              <span className="section-index__num">∗</span>
              <span className="section-index__label">Zona de atuação</span>
            </div>
            <h2 className="display">
              <span data-reveal="line"><span>Onde trabalhamos.</span></span>
              <span data-reveal="line" data-d="100"><span><em>Grande Lisboa</em> e Setúbal.</span></span>
            </h2>
          </div>
          <p data-reveal data-d="200" className="font-display font-light text-graphite/75 max-w-[44ch]" style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)", lineHeight: 1.55 }}>
            Servimos toda a Grande Lisboa e Setúbal. Para projetos de maior
            escala, deslocamo-nos a outras zonas do país sem custo extra.
          </p>
        </header>

        <div data-reveal className="grid lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-16 items-center">
          {/* SVG map */}
          <div className="relative aspect-[4/3] bg-graphite border border-graphite/12 overflow-hidden">
            <svg viewBox="0 0 400 400" className="w-full h-full" aria-hidden="true">
              {/* Grid background */}
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(244,241,234,0.06)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="400" height="400" fill="url(#grid)" />

              {/* Coast outline (stylized) */}
              <path
                d="M 50 100 Q 80 180 60 250 Q 50 300 90 360 L 200 380 Q 290 390 320 350 Q 340 280 310 200 Q 280 130 250 110 Q 200 100 150 110 Q 100 90 50 100 Z"
                fill="none"
                stroke="rgba(184,138,42,0.4)"
                strokeWidth="0.8"
                strokeDasharray="4 3"
              />
              {/* Inner lines (rivers/bays) */}
              <path d="M 100 280 Q 200 290 280 280" fill="none" stroke="rgba(244,241,234,0.12)" strokeWidth="0.6" />

              {/* Cardinal markers */}
              <text x="200" y="20" fill="rgba(244,241,234,0.5)" fontSize="9" fontFamily="monospace" textAnchor="middle" letterSpacing="2">N</text>
              <text x="200" y="395" fill="rgba(244,241,234,0.5)" fontSize="9" fontFamily="monospace" textAnchor="middle" letterSpacing="2">S</text>
              <text x="10" y="205" fill="rgba(244,241,234,0.5)" fontSize="9" fontFamily="monospace" textAnchor="middle" letterSpacing="2">O</text>
              <text x="390" y="205" fill="rgba(244,241,234,0.5)" fontSize="9" fontFamily="monospace" textAnchor="middle" letterSpacing="2">E</text>

              {/* Scale */}
              <g transform="translate(20 380)">
                <line x1="0" y1="0" x2="40" y2="0" stroke="rgba(244,241,234,0.5)" strokeWidth="0.8" />
                <line x1="0" y1="-3" x2="0" y2="3" stroke="rgba(244,241,234,0.5)" strokeWidth="0.8" />
                <line x1="40" y1="-3" x2="40" y2="3" stroke="rgba(244,241,234,0.5)" strokeWidth="0.8" />
                <text x="20" y="-6" fill="rgba(244,241,234,0.55)" fontSize="7" fontFamily="monospace" textAnchor="middle" letterSpacing="1.5">10 KM</text>
              </g>

              {/* Markers */}
              {ZONES.map((z) => (
                <g key={z.label}>
                  <circle cx={z.x} cy={z.y} r={z.primary ? 6 : 4} fill="#B88A2A" />
                  {z.primary && (
                    <circle cx={z.x} cy={z.y} r="14" fill="none" stroke="#B88A2A" strokeWidth="0.6">
                      <animate attributeName="r" values="6;18;6" dur="2.5s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.7;0;0.7" dur="2.5s" repeatCount="indefinite" />
                    </circle>
                  )}
                  <text
                    x={z.x + (z.primary ? 14 : 10)}
                    y={z.y + 3}
                    fill="rgba(244,241,234,0.85)"
                    fontSize="10"
                    fontFamily="monospace"
                    letterSpacing="1.2"
                  >
                    {z.label.toUpperCase()}
                  </text>
                </g>
              ))}

              {/* Compass needle */}
              <g transform="translate(360 50)">
                <circle r="14" fill="none" stroke="rgba(244,241,234,0.25)" strokeWidth="0.6" />
                <line x1="0" y1="-12" x2="0" y2="-2" stroke="#B88A2A" strokeWidth="1.4" />
                <line x1="0" y1="2" x2="0" y2="12" stroke="rgba(244,241,234,0.5)" strokeWidth="1" />
              </g>
            </svg>

            {/* Title overlay */}
            <span className="absolute top-4 left-4 font-mono text-[0.6rem] tracking-[0.22em] uppercase text-offwhite/65">
              Carta · Distritos · 1:200 000
            </span>
          </div>

          {/* Zones list */}
          <ul className="space-y-px bg-graphite/12 border border-graphite/12 lg:border-graphite/12">
            {ZONES.map((z, i) => (
              <li key={z.label} className="bg-offwhite-2 px-5 py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <span className="font-mono text-[0.6rem] tracking-[0.16em] text-bronze">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-graphite leading-tight" style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)" }}>
                    {z.label}
                  </span>
                </div>
                <span className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-graphite/55">
                  {z.count}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
