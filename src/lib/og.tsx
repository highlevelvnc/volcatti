import { ImageResponse } from "next/og";

type OGProps = {
  kicker: string;
  title: string;
  meta?: Array<{ label: string; value: string }>;
};

export const OG_SIZE = { width: 1200, height: 630 };

/**
 * Shared OG image renderer. Used by route-level opengraph-image.tsx files
 * to produce branded, consistent open graph imagery per page.
 */
export function renderOG({ kicker, title, meta = [] }: OGProps) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px 80px",
          background: "#111111",
          color: "#F4F1EA",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        {/* Blueprint corner markers */}
        <div style={{ position: "absolute", top: 60, left: 70, width: 8, height: 8, background: "#B88A2A" }} />
        <div style={{ position: "absolute", top: 60, right: 70, width: 8, height: 8, background: "#B88A2A" }} />
        <div style={{ position: "absolute", bottom: 60, left: 70, width: 8, height: 8, background: "#B88A2A" }} />
        <div style={{ position: "absolute", bottom: 60, right: 70, width: 8, height: 8, background: "#B88A2A" }} />

        {/* Top row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <svg width="48" height="42" viewBox="0 0 64 56" fill="none">
              <path d="M4 6 L26 50 L48 6" stroke="#F4F1EA" strokeWidth="6" strokeLinecap="square" />
              <path d="M14 6 L26 30 L38 6" stroke="#F4F1EA" strokeWidth="3.5" strokeLinecap="square" opacity="0.55" />
              <path d="M40 6 L52 6 L40 28 Z" fill="#B88A2A" />
            </svg>
            <span style={{ fontFamily: "sans-serif", letterSpacing: "0.18em", fontSize: 26, fontWeight: 600 }}>VOLCATTI</span>
          </div>
          <span
            style={{
              fontFamily: "monospace",
              letterSpacing: "0.2em",
              fontSize: 14,
              color: "rgba(244,241,234,0.55)",
              textTransform: "uppercase",
              border: "1px solid rgba(244,241,234,0.3)",
              padding: "6px 14px",
            }}
          >
            volcatti.pt
          </span>
        </div>

        {/* Title block */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <span style={{ fontFamily: "monospace", letterSpacing: "0.2em", fontSize: 16, color: "#B88A2A", textTransform: "uppercase" }}>
            ▸ {kicker}
          </span>
          <span
            style={{
              fontFamily: "serif",
              fontWeight: 300,
              fontSize: title.length > 50 ? 64 : 80,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "#F4F1EA",
              maxWidth: 1040,
            }}
          >
            {title}
          </span>
        </div>

        {/* Bottom meta row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 26,
            borderTop: "1px solid rgba(244,241,234,0.18)",
          }}
        >
          <div style={{ display: "flex", gap: 28 }}>
            {meta.length > 0
              ? meta.slice(0, 4).map((m) => (
                  <span
                    key={m.label}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 4,
                    }}
                  >
                    <span style={{ fontFamily: "monospace", fontSize: 13, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(244,241,234,0.5)" }}>
                      {m.label}
                    </span>
                    <span style={{ fontFamily: "serif", fontSize: 22, color: "#F4F1EA" }}>{m.value}</span>
                  </span>
                ))
              : ["Construção", "Remodelação", "Piscinas", "Elétrica"].map((t) => (
                  <span
                    key={t}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      fontFamily: "monospace",
                      fontSize: 14,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "rgba(244,241,234,0.78)",
                    }}
                  >
                    <span style={{ width: 6, height: 6, background: "#B88A2A", borderRadius: 999 }} />
                    {t}
                  </span>
                ))}
          </div>
          <span style={{ fontFamily: "monospace", fontSize: 13, color: "rgba(244,241,234,0.45)", letterSpacing: "0.2em" }}>
            Lisboa · PT
          </span>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
