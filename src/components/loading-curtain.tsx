"use client";

import { useEffect, useState } from "react";

/**
 * Loading curtain — architectural blueprint draws itself, then the panels
 * split open vertically to reveal the site.
 *
 * Connects with the construction niche: a floor plan is drawn with
 * fine bronze lines while we wait for hero assets to load.
 */
export function LoadingCurtain() {
  const [phase, setPhase] = useState<"drawing" | "opening" | "gone">("drawing");

  useEffect(() => {
    // Wait for window load OR a max of 1.6s — whichever comes first.
    const minHold = 1600;
    let loaded = false;
    let minMet = false;

    const maybeProceed = () => {
      if (loaded && minMet) {
        setPhase("opening");
        window.setTimeout(() => setPhase("gone"), 1100);
      }
    };

    const onLoad = () => {
      loaded = true;
      maybeProceed();
    };

    if (document.readyState === "complete") {
      loaded = true;
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }

    const t = window.setTimeout(() => {
      minMet = true;
      maybeProceed();
    }, minHold);

    // Hard fallback — never block UI past 4s.
    const hardFallback = window.setTimeout(() => {
      setPhase("opening");
      window.setTimeout(() => setPhase("gone"), 1100);
    }, 4000);

    return () => {
      window.removeEventListener("load", onLoad);
      window.clearTimeout(t);
      window.clearTimeout(hardFallback);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[200] pointer-events-none"
    >
      {/* Two split panels */}
      <div
        className={`absolute left-0 right-0 top-0 h-1/2 bg-graphite transition-transform duration-1000 ease-[cubic-bezier(0.85,0,0.15,1)] ${
          phase === "opening" ? "-translate-y-full" : "translate-y-0"
        }`}
      />
      <div
        className={`absolute left-0 right-0 bottom-0 h-1/2 bg-graphite transition-transform duration-1000 ease-[cubic-bezier(0.85,0,0.15,1)] ${
          phase === "opening" ? "translate-y-full" : "translate-y-0"
        }`}
      />

      {/* Center content: blueprint floor plan + label */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center gap-8 transition-opacity duration-500 ${
          phase === "opening" ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Floor plan SVG — drawn with stroke-dashoffset animation */}
        <svg
          viewBox="0 0 200 140"
          className="w-[200px] sm:w-[260px] h-auto text-offwhite/85"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.6"
          aria-hidden="true"
        >
          {/* Outer wall */}
          <rect
            x="10"
            y="20"
            width="180"
            height="100"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4000"
            className="draw-blueprint"
            style={{ animationDelay: "0ms" }}
          />
          {/* Inner walls */}
          <line x1="80" y1="20" x2="80" y2="80" strokeDasharray="4000" className="draw-blueprint" style={{ animationDelay: "300ms" }} />
          <line x1="80" y1="80" x2="190" y2="80" strokeDasharray="4000" className="draw-blueprint" style={{ animationDelay: "500ms" }} />
          <line x1="130" y1="80" x2="130" y2="120" strokeDasharray="4000" className="draw-blueprint" style={{ animationDelay: "700ms" }} />

          {/* Pool indication */}
          <rect x="95" y="90" width="25" height="22" strokeDasharray="4000" className="draw-blueprint" style={{ animationDelay: "900ms" }} />
          <line x1="95" y1="100" x2="120" y2="100" strokeDasharray="4000" className="draw-blueprint" style={{ animationDelay: "1100ms" }} />

          {/* Door swings */}
          <path
            d="M 30 20 A 14 14 0 0 1 30 34"
            strokeDasharray="4000"
            className="draw-blueprint"
            style={{ animationDelay: "1200ms" }}
          />
          <path
            d="M 80 50 A 12 12 0 0 1 92 50"
            strokeDasharray="4000"
            className="draw-blueprint"
            style={{ animationDelay: "1300ms" }}
          />

          {/* Bronze accents — markers + dimensions */}
          <circle cx="10" cy="20" r="1.5" fill="#B88A2A" stroke="none" />
          <circle cx="190" cy="20" r="1.5" fill="#B88A2A" stroke="none" />
          <circle cx="10" cy="120" r="1.5" fill="#B88A2A" stroke="none" />
          <circle cx="190" cy="120" r="1.5" fill="#B88A2A" stroke="none" />

          {/* Dimension text (mono) */}
          <text x="100" y="14" fill="#B88A2A" stroke="none" fontSize="3.2" fontFamily="JetBrains Mono, monospace" textAnchor="middle" letterSpacing="0.3">
            12.40 m
          </text>
          <text x="6" y="72" fill="#B88A2A" stroke="none" fontSize="3.2" fontFamily="JetBrains Mono, monospace" textAnchor="middle" letterSpacing="0.3" transform="rotate(-90 6 72)">
            7.20 m
          </text>
        </svg>

        {/* Volcatti mark + label */}
        <div className="flex flex-col items-center gap-3">
          <svg viewBox="0 0 64 56" className="w-10 h-auto" fill="none" aria-hidden="true">
            <path d="M4 6 L26 50 L48 6" stroke="#F4F1EA" strokeWidth="6" strokeLinecap="square" />
            <path d="M14 6 L26 30 L38 6" stroke="#F4F1EA" strokeWidth="3.5" strokeLinecap="square" opacity="0.55" />
            <path d="M40 6 L52 6 L40 28 Z" fill="#B88A2A" />
          </svg>
          <span className="font-mono text-[0.7rem] tracking-[0.4em] uppercase text-offwhite/60 pulse-label">
            Volcatti
          </span>
        </div>

        {/* Page indicator (architectural drawing convention) */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3 font-mono text-[0.65rem] tracking-[0.2em] uppercase text-offwhite/40">
          <span>Folha</span>
          <span className="text-bronze">01</span>
          <span>·</span>
          <span>Planta tipo</span>
        </div>
      </div>
    </div>
  );
}
