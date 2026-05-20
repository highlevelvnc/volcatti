"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scroll progress shown as a technical ruler at the top of the page.
 * Major tick every 10%, minor every 2%. Bronze fill expands left→right
 * with the current page progress, alongside a numeric readout.
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0;
      if (barRef.current) {
        barRef.current.style.width = `${p.toFixed(2)}%`;
      }
      setPct(p);
      raf = 0;
    };
    const onScroll = () => {
      if (raf === 0) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[18px] z-[110] pointer-events-none"
    >
      {/* Ruler ticks layer */}
      <svg
        className="absolute inset-0 w-full h-full opacity-50"
        viewBox="0 0 100 18"
        preserveAspectRatio="none"
      >
        <line x1="0" y1="0" x2="100" y2="0" stroke="rgba(244,241,234,0.0)" />
        {Array.from({ length: 51 }, (_, i) => i).map((i) => {
          const x = i * 2;
          const isMajor = i % 5 === 0;
          const isMid = i % 5 === 0;
          return (
            <line
              key={i}
              x1={x}
              y1="0"
              x2={x}
              y2={isMajor ? 6 : isMid ? 4 : 2}
              stroke={isMajor ? "rgba(184,138,42,0.6)" : "rgba(244,241,234,0.18)"}
              strokeWidth="0.15"
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
      </svg>

      {/* Progress fill bar */}
      <div className="absolute top-0 left-0 right-0 h-px bg-graphite/10 mix-blend-multiply" />
      <div
        ref={barRef}
        className="absolute top-0 left-0 h-px bg-bronze transition-[width] duration-100"
        style={{ width: "0%" }}
      />

      {/* Numeric readout — appears once user has scrolled */}
      <div
        className={`absolute top-1.5 right-3 font-mono text-[0.55rem] tracking-[0.16em] uppercase text-bronze pointer-events-none transition-opacity duration-300 ${
          pct > 1 ? "opacity-100" : "opacity-0"
        }`}
      >
        {pct.toFixed(0).padStart(2, "0")}<span className="text-bronze/55"> · 100</span>
      </div>
    </div>
  );
}
