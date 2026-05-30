/**
 * ZonesMap — mapa fiel de Portugal Continental.
 *
 * Renderiza o GeoJSON real dos 18 distritos (simplificado para ~53kb)
 * projetado com d3-geo `geoMercator.fitExtent`. Distritos onde a
 * Volcatti atua (Lisboa + Setúbal) ficam em bronze; restantes em
 * cinza tenue. Markers nas cidades específicas + sede destacada
 * com pulse animado.
 *
 * Server component — d3-geo + GeoJSON são processados no build, o
 * cliente recebe só SVG estático (sem JS runtime de mapa).
 */

import { geoMercator, geoPath, type ExtendedFeatureCollection, type ExtendedFeature, type GeoPermissibleObjects } from "d3-geo";
import distritosRaw from "@/lib/portugal-distritos.json";

type DistritoProps = { name: string };

const distritos = distritosRaw as unknown as ExtendedFeatureCollection<
  ExtendedFeature<GeoJSON.Geometry, DistritoProps>
>;

// Distritos onde a Volcatti atua — highlight em bronze
const ATIVOS = new Set(["Lisboa", "Setúbal"]);

// Cidades específicas com obras (longitude, latitude reais)
type Cidade = {
  name: string;
  count: string;
  long: number;
  lat: number;
  anchor: "left" | "right";
  primary?: boolean;
};
const CIDADES: Cidade[] = [
  { name: "Mafra",   count: "2 obras",  long: -9.3260, lat: 38.9370, anchor: "left" },
  { name: "Loures",  count: "3 obras",  long: -9.1700, lat: 38.8300, anchor: "right" },
  { name: "Sintra",  count: "Sede",     long: -9.3700, lat: 38.7780, anchor: "left", primary: true },
  { name: "Cascais", count: "8 obras",  long: -9.4216, lat: 38.6979, anchor: "left" },
  { name: "Oeiras",  count: "4 obras",  long: -9.3100, lat: 38.6900, anchor: "right" },
  { name: "Lisboa",  count: "12 obras", long: -9.1393, lat: 38.7223, anchor: "right" },
  { name: "Setúbal", count: "5 obras",  long: -8.8929, lat: 38.5244, anchor: "right" },
];

// SVG viewBox
const W = 360;
const H = 540;
const PADDING = 16;

// Projection — fit Portugal Continental into the viewBox
const projection = geoMercator().fitExtent(
  [
    [PADDING, PADDING + 8],
    [W - PADDING, H - PADDING - 28],
  ],
  distritos as unknown as GeoPermissibleObjects,
);
const pathGen = geoPath(projection);

// Pré-projetar markers para coordenadas SVG
const cidadesProj = CIDADES.map((c) => {
  const xy = projection([c.long, c.lat]);
  return { ...c, x: xy?.[0] ?? 0, y: xy?.[1] ?? 0 };
});

// Pre-render distritos paths (server-side)
const distritosPaths = distritos.features.map((f, i) => {
  const props = (f.properties ?? { name: "" }) as DistritoProps;
  const d = pathGen(f as unknown as GeoPermissibleObjects) ?? "";
  const ativo = ATIVOS.has(props.name);
  return { d, name: props.name, ativo, key: `${props.name}-${i}` };
});

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
          <p
            data-reveal
            data-d="200"
            className="font-display font-light text-graphite/75 max-w-[44ch]"
            style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)", lineHeight: 1.55 }}
          >
            Servimos toda a Grande Lisboa e Setúbal. Para projetos de maior
            escala, deslocamo-nos a outras zonas do país sem custo extra.
          </p>
        </header>

        <div data-reveal className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-center">
          {/* MAP — Portugal Continental */}
          <div className="relative aspect-[2/3] max-w-[440px] mx-auto w-full bg-graphite border border-graphite/12 overflow-hidden">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="w-full h-full"
              aria-label="Mapa de Portugal Continental — zona de atuação Volcatti"
            >
              <defs>
                {/* Grid background pattern */}
                <pattern id="pt-grid" width="18" height="18" patternUnits="userSpaceOnUse">
                  <path d="M 18 0 L 0 0 0 18" fill="none" stroke="rgba(244,241,234,0.05)" strokeWidth="0.5" />
                </pattern>
                {/* Bronze glow for active districts */}
                <radialGradient id="bronze-glow" cx="50%" cy="50%" r="60%">
                  <stop offset="0%" stopColor="rgba(184,138,42,0.45)" />
                  <stop offset="100%" stopColor="rgba(184,138,42,0.14)" />
                </radialGradient>
              </defs>

              {/* Grid background */}
              <rect width={W} height={H} fill="url(#pt-grid)" />

              {/* Inactive districts — faint outline */}
              {distritosPaths
                .filter((d) => !d.ativo)
                .map((d) => (
                  <path
                    key={d.key}
                    d={d.d}
                    fill="rgba(244,241,234,0.035)"
                    stroke="rgba(244,241,234,0.18)"
                    strokeWidth="0.4"
                    strokeLinejoin="round"
                  />
                ))}

              {/* Active districts (Lisboa + Setúbal) — bronze fill + stroke */}
              {distritosPaths
                .filter((d) => d.ativo)
                .map((d) => (
                  <path
                    key={d.key}
                    d={d.d}
                    fill="url(#bronze-glow)"
                    stroke="rgba(184,138,42,0.85)"
                    strokeWidth="0.7"
                    strokeLinejoin="round"
                  />
                ))}

              {/* Cardinal points */}
              <text x={W / 2} y={20} fill="rgba(244,241,234,0.4)" fontSize="9" fontFamily="monospace" textAnchor="middle" letterSpacing="2">N</text>
              <text x={W / 2} y={H - 8} fill="rgba(244,241,234,0.4)" fontSize="9" fontFamily="monospace" textAnchor="middle" letterSpacing="2">S</text>

              {/* Country label */}
              <text
                x={W / 2}
                y={H - 28}
                fill="rgba(184,138,42,0.6)"
                fontSize="9"
                fontFamily="monospace"
                textAnchor="middle"
                letterSpacing="3"
                fontWeight="500"
              >
                PORTUGAL
              </text>

              {/* Scale bar */}
              <g transform={`translate(28 ${H - 18})`}>
                <line x1="0" y1="0" x2="46" y2="0" stroke="rgba(244,241,234,0.45)" strokeWidth="0.8" />
                <line x1="0" y1="-3" x2="0" y2="3" stroke="rgba(244,241,234,0.45)" strokeWidth="0.8" />
                <line x1="23" y1="-2" x2="23" y2="2" stroke="rgba(244,241,234,0.3)" strokeWidth="0.6" />
                <line x1="46" y1="-3" x2="46" y2="3" stroke="rgba(244,241,234,0.45)" strokeWidth="0.8" />
                <text x="23" y="-6" fill="rgba(244,241,234,0.55)" fontSize="6.5" fontFamily="monospace" textAnchor="middle" letterSpacing="1.5">
                  50 KM
                </text>
              </g>

              {/* Compass */}
              <g transform={`translate(${W - 30} 36)`}>
                <circle r="14" fill="none" stroke="rgba(244,241,234,0.25)" strokeWidth="0.6" />
                <line x1="0" y1="-12" x2="0" y2="-2" stroke="#B88A2A" strokeWidth="1.4" />
                <line x1="0" y1="2" x2="0" y2="12" stroke="rgba(244,241,234,0.5)" strokeWidth="1" />
                <text x="0" y="-16" fill="rgba(244,241,234,0.55)" fontSize="6" fontFamily="monospace" textAnchor="middle" letterSpacing="1">N</text>
              </g>

              {/* City markers */}
              {cidadesProj.map((c) => (
                <g key={c.name}>
                  {c.primary && (
                    <>
                      {/* Outer pulse ring */}
                      <circle cx={c.x} cy={c.y} r="14" fill="none" stroke="#B88A2A" strokeWidth="0.6" opacity="0.5">
                        <animate attributeName="r" values="6;18;6" dur="2.4s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.7;0;0.7" dur="2.4s" repeatCount="indefinite" />
                      </circle>
                      {/* Inner static ring */}
                      <circle cx={c.x} cy={c.y} r="8" fill="none" stroke="#B88A2A" strokeWidth="0.5" opacity="0.6" />
                    </>
                  )}
                  {/* Marker dot */}
                  <circle cx={c.x} cy={c.y} r={c.primary ? 4.5 : 3.2} fill="#B88A2A" />
                  {c.primary && (
                    <circle cx={c.x} cy={c.y} r={1.5} fill="#F4F1EA" />
                  )}
                  {/* Label */}
                  <text
                    x={c.x + (c.anchor === "left" ? -7 : 7)}
                    y={c.y + 2.5}
                    fill="rgba(244,241,234,0.92)"
                    fontSize="8"
                    fontFamily="monospace"
                    letterSpacing="1"
                    textAnchor={c.anchor === "left" ? "end" : "start"}
                    fontWeight={c.primary ? "500" : "400"}
                    style={{ paintOrder: "stroke", stroke: "rgba(17,17,17,0.7)", strokeWidth: "2px", strokeLinejoin: "round" }}
                  >
                    {c.name.toUpperCase()}
                  </text>
                </g>
              ))}
            </svg>

            {/* Title overlay top */}
            <span className="absolute top-3 left-3 font-mono text-[0.55rem] tracking-[0.22em] uppercase text-offwhite/65">
              Carta · Portugal Continental
            </span>
            <span className="absolute top-3 right-3 font-mono text-[0.55rem] tracking-[0.22em] uppercase text-bronze">
              Datum · WGS 84
            </span>

            {/* Bottom legend */}
            <div className="absolute bottom-3 right-3 flex items-center gap-3 px-2.5 py-1.5 bg-graphite/85 border border-bronze/30 backdrop-blur-sm">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-bronze rounded-full" />
                <span className="font-mono text-[0.5rem] tracking-[0.18em] uppercase text-offwhite/85">Atuação</span>
              </span>
              <span className="w-px h-2.5 bg-offwhite/20" />
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-offwhite/30" />
                <span className="font-mono text-[0.5rem] tracking-[0.18em] uppercase text-offwhite/55">Restante</span>
              </span>
            </div>
          </div>

          {/* Zones list */}
          <ul className="space-y-px bg-graphite/12 border border-graphite/12">
            {CIDADES.map((c, i) => (
              <li
                key={c.name}
                className={`px-5 py-4 flex items-center justify-between gap-4 ${
                  c.primary ? "bg-bronze/10 border-l-2 border-bronze" : "bg-offwhite-2"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <span className="font-mono text-[0.6rem] tracking-[0.16em] text-bronze">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="font-display text-graphite leading-tight"
                    style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)" }}
                  >
                    {c.name}
                  </span>
                  {c.primary && (
                    <span className="font-mono text-[0.55rem] tracking-[0.18em] uppercase text-bronze px-1.5 py-0.5 border border-bronze/50">
                      Sede
                    </span>
                  )}
                </div>
                <span className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-graphite/55">
                  {c.count}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
