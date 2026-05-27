/**
 * Stylized SVG map of Portugal continental — silhueta reconhecível
 * (não geograficamente exacta, mas com proporções e features claras:
 * costa atlântica W, fronteira E, Cabo da Roca, Algarve, Tejo, Douro).
 * Markers nas zonas onde a Volcatti atua, com Palmela como sede.
 *
 * SVG viewBox 0 0 360 540 (4:6 portrait — Portugal continental
 * tem ~2:3 ratio na realidade).
 */

const ZONES = [
  // Coordenadas em viewBox 360×540
  { x: 130, y: 145, label: "Mafra",   count: "2 obras",   anchor: "left" as const },
  { x: 152, y: 130, label: "Loures",  count: "3 obras",   anchor: "right" as const },
  { x: 112, y: 165, label: "Sintra",  count: "6 obras",   anchor: "left" as const },
  { x: 122, y: 178, label: "Cascais", count: "8 obras",   anchor: "left" as const },
  { x: 150, y: 170, label: "Oeiras",  count: "4 obras",   anchor: "right" as const },
  { x: 168, y: 180, label: "Lisboa",  count: "12 obras",  anchor: "right" as const },
  { x: 178, y: 215, label: "Palmela", count: "Sede",      anchor: "right" as const, primary: true },
  { x: 165, y: 240, label: "Setúbal", count: "5 obras",   anchor: "right" as const },
];

export function ZonesMap() {
  return (
    <section
      className="relative bg-offwhite-2 border-b border-graphite/12 overflow-hidden"
      style={{ paddingBlock: "clamp(48px, 5.5vw, 80px)" }}
    >
      <div className="max-w-container mx-auto px-5 md:px-8 lg:px-12">
        <header className="grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-20 items-end pb-8 lg:pb-12">
          <div className="flex flex-col gap-7 items-center text-center lg:items-start lg:text-left">
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

        <div data-reveal className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-center">
          {/* SVG Portugal map */}
          <div className="relative aspect-[2/3] max-w-[420px] mx-auto w-full bg-graphite border border-graphite/12 overflow-hidden">
            <svg viewBox="0 0 360 540" className="w-full h-full" aria-hidden="true">
              {/* Grid background */}
              <defs>
                <pattern id="pt-grid" width="18" height="18" patternUnits="userSpaceOnUse">
                  <path d="M 18 0 L 0 0 0 18" fill="none" stroke="rgba(244,241,234,0.05)" strokeWidth="0.5" />
                </pattern>
                <linearGradient id="pt-fill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="rgba(184,138,42,0.06)" />
                  <stop offset="100%" stopColor="rgba(184,138,42,0.10)" />
                </linearGradient>
              </defs>
              <rect width="360" height="540" fill="url(#pt-grid)" />

              {/* Portugal continental — silhueta reconhecível */}
              <path
                d="
                  M 165 60
                  L 178 58
                  L 195 62
                  L 210 68
                  L 222 80
                  L 232 92
                  L 240 110
                  L 244 130
                  L 248 152
                  L 252 178
                  L 252 200
                  L 250 222
                  L 246 245
                  L 240 268
                  L 234 290
                  L 228 312
                  L 220 332
                  L 212 352
                  L 204 370
                  L 198 388
                  L 196 408
                  L 198 425
                  L 204 440
                  L 215 452
                  L 230 460
                  L 250 464
                  L 270 462
                  L 290 458
                  L 305 450
                  L 285 470
                  L 258 478
                  L 228 482
                  L 198 484
                  L 168 482
                  L 142 476
                  L 122 468
                  L 110 458
                  L 102 444
                  L 98 426
                  L 96 405
                  L 100 380
                  L 102 355
                  L 102 330
                  L 105 305
                  L 110 280
                  L 116 255
                  L 122 232
                  L 128 210
                  L 132 188
                  L 130 168
                  L 128 148
                  L 130 130
                  L 134 112
                  L 142 95
                  L 152 78
                  L 165 60
                  Z
                "
                fill="url(#pt-fill)"
                stroke="rgba(184,138,42,0.55)"
                strokeWidth="0.8"
                strokeLinejoin="round"
              />

              {/* Tejo river — line subtle */}
              <path
                d="M 252 200 Q 220 200 195 195 Q 170 195 145 195"
                fill="none"
                stroke="rgba(244,241,234,0.15)"
                strokeWidth="0.8"
                strokeDasharray="3 2"
              />
              {/* Douro river — north */}
              <path
                d="M 252 100 Q 215 100 180 100 Q 150 100 132 110"
                fill="none"
                stroke="rgba(244,241,234,0.15)"
                strokeWidth="0.8"
                strokeDasharray="3 2"
              />

              {/* Cardinal points */}
              <text x="180" y="35" fill="rgba(244,241,234,0.4)" fontSize="9" fontFamily="monospace" textAnchor="middle" letterSpacing="2">N</text>
              <text x="180" y="510" fill="rgba(244,241,234,0.4)" fontSize="9" fontFamily="monospace" textAnchor="middle" letterSpacing="2">S</text>
              <text x="20" y="275" fill="rgba(244,241,234,0.4)" fontSize="9" fontFamily="monospace" textAnchor="middle" letterSpacing="2">O</text>
              <text x="340" y="275" fill="rgba(244,241,234,0.4)" fontSize="9" fontFamily="monospace" textAnchor="middle" letterSpacing="2">E</text>

              {/* Country label */}
              <text x="180" y="385" fill="rgba(184,138,42,0.55)" fontSize="9" fontFamily="monospace" textAnchor="middle" letterSpacing="3" fontWeight="500">
                PORTUGAL
              </text>

              {/* Scale */}
              <g transform="translate(28 510)">
                <line x1="0" y1="0" x2="46" y2="0" stroke="rgba(244,241,234,0.45)" strokeWidth="0.8" />
                <line x1="0" y1="-3" x2="0" y2="3" stroke="rgba(244,241,234,0.45)" strokeWidth="0.8" />
                <line x1="23" y1="-2" x2="23" y2="2" stroke="rgba(244,241,234,0.3)" strokeWidth="0.6" />
                <line x1="46" y1="-3" x2="46" y2="3" stroke="rgba(244,241,234,0.45)" strokeWidth="0.8" />
                <text x="23" y="-6" fill="rgba(244,241,234,0.55)" fontSize="6.5" fontFamily="monospace" textAnchor="middle" letterSpacing="1.5">50 KM</text>
              </g>

              {/* Compass */}
              <g transform="translate(310 50)">
                <circle r="14" fill="none" stroke="rgba(244,241,234,0.25)" strokeWidth="0.6" />
                <line x1="0" y1="-12" x2="0" y2="-2" stroke="#B88A2A" strokeWidth="1.4" />
                <line x1="0" y1="2" x2="0" y2="12" stroke="rgba(244,241,234,0.5)" strokeWidth="1" />
                <text x="0" y="-16" fill="rgba(244,241,234,0.55)" fontSize="6" fontFamily="monospace" textAnchor="middle" letterSpacing="1">N</text>
              </g>

              {/* Markers */}
              {ZONES.map((z) => (
                <g key={z.label}>
                  {z.primary && (
                    <>
                      <circle cx={z.x} cy={z.y} r="14" fill="none" stroke="#B88A2A" strokeWidth="0.6" opacity="0.5">
                        <animate attributeName="r" values="6;16;6" dur="2.5s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.7;0;0.7" dur="2.5s" repeatCount="indefinite" />
                      </circle>
                    </>
                  )}
                  <circle cx={z.x} cy={z.y} r={z.primary ? 5 : 3.5} fill="#B88A2A" />
                  <text
                    x={z.x + (z.anchor === "left" ? -8 : 8)}
                    y={z.y + 2.5}
                    fill="rgba(244,241,234,0.92)"
                    fontSize="8"
                    fontFamily="monospace"
                    letterSpacing="1"
                    textAnchor={z.anchor === "left" ? "end" : "start"}
                    fontWeight={z.primary ? "500" : "400"}
                  >
                    {z.label.toUpperCase()}
                  </text>
                </g>
              ))}
            </svg>

            {/* Title overlay top */}
            <span className="absolute top-3 left-3 font-mono text-[0.55rem] tracking-[0.22em] uppercase text-offwhite/65">
              Carta · Portugal Continental
            </span>
            <span className="absolute top-3 right-3 font-mono text-[0.55rem] tracking-[0.22em] uppercase text-bronze">
              1 : 200 000
            </span>
          </div>

          {/* Zones list */}
          <ul className="space-y-px bg-graphite/12 border border-graphite/12">
            {ZONES.map((z, i) => (
              <li
                key={z.label}
                className={`px-5 py-4 flex items-center justify-between gap-4 ${
                  z.primary ? "bg-bronze/10 border-l-2 border-bronze" : "bg-offwhite-2"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <span className="font-mono text-[0.6rem] tracking-[0.16em] text-bronze">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-graphite leading-tight" style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)" }}>
                    {z.label}
                  </span>
                  {z.primary && (
                    <span className="font-mono text-[0.55rem] tracking-[0.18em] uppercase text-bronze px-1.5 py-0.5 border border-bronze/50">
                      Sede
                    </span>
                  )}
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
