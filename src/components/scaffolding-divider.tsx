"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  /** Caption shown above the line (e.g. "Próxima fase · Obras") */
  caption?: string;
  /** Right-side dimension label (e.g. "L = 1320 mm") */
  dimension?: string;
  /** Light variant for graphite-bg sections */
  light?: boolean;
};

/**
 * Horizontal scaffolding-line divider — a construction ruler that
 * draws itself with tick marks when it enters the viewport.
 * Acts as a unique transition between major sections.
 */
export function ScaffoldingDivider({
  caption,
  dimension = "L = 1320 mm",
  light = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setRevealed(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.5 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const lineColor = light ? "rgba(244,241,234,0.18)" : "rgba(17,17,17,0.15)";
  const tickMajor = light ? "rgba(184,138,42,0.8)" : "#B88A2A";
  const tickMinor = light ? "rgba(244,241,234,0.35)" : "rgba(17,17,17,0.35)";
  const labelColor = light ? "rgba(244,241,234,0.55)" : "rgba(17,17,17,0.55)";
  const captionColor = light ? "text-offwhite/55" : "text-graphite/55";
  const arrowColor = light ? "rgba(184,138,42,0.8)" : "#B88A2A";

  return (
    <div
      ref={ref}
      className={`relative py-12 lg:py-16 ${light ? "bg-graphite" : "bg-offwhite"}`}
    >
      <div className="max-w-container mx-auto px-5 md:px-8 lg:px-12">
        {/* Caption above */}
        {caption && (
          <div className={`flex items-center justify-between mb-4 font-mono text-[0.65rem] tracking-[0.22em] uppercase ${captionColor}`}>
            <span className="inline-flex items-center gap-3">
              <span className={light ? "text-bronze" : "text-bronze"}>▸</span>
              <span>{caption}</span>
            </span>
            <span>{dimension}</span>
          </div>
        )}

        {/* The ruler */}
        <svg viewBox="0 0 1320 32" className="w-full h-8" preserveAspectRatio="none" aria-hidden="true">
          {/* Main horizontal */}
          <line
            x1="0"
            y1="22"
            x2="1320"
            y2="22"
            stroke={lineColor}
            strokeWidth="1"
            strokeDasharray="1320"
            strokeDashoffset={revealed ? 0 : 1320}
            style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1)" }}
          />

          {/* Ticks every 22px (60 total, with bronze every 5th) */}
          {Array.from({ length: 61 }, (_, i) => i).map((i) => {
            const x = i * 22;
            const isMajor = i % 10 === 0;
            const isMid = i % 5 === 0;
            return (
              <line
                key={i}
                x1={x}
                y1="22"
                x2={x}
                y2={isMajor ? 6 : isMid ? 12 : 17}
                stroke={isMajor ? tickMajor : tickMinor}
                strokeWidth={isMajor ? 1.2 : 0.8}
                opacity={revealed ? 1 : 0}
                style={{ transition: `opacity 0.4s ease ${0.6 + i * 0.012}s` }}
              />
            );
          })}

          {/* Bookend arrows at start + end (technical drawing convention) */}
          <g
            opacity={revealed ? 1 : 0}
            style={{ transition: "opacity 0.4s ease 1.4s" }}
          >
            {/* Left arrow ⊢ */}
            <line x1="0" y1="18" x2="0" y2="26" stroke={arrowColor} strokeWidth="1.4" />
            <polyline points="0,22 6,19 6,25" fill="none" stroke={arrowColor} strokeWidth="1" />
            {/* Right arrow ⊣ */}
            <line x1="1320" y1="18" x2="1320" y2="26" stroke={arrowColor} strokeWidth="1.4" />
            <polyline points="1320,22 1314,19 1314,25" fill="none" stroke={arrowColor} strokeWidth="1" />
          </g>

          {/* Numeric markers at major ticks */}
          {[0, 220, 440, 660, 880, 1100, 1320].map((x) => (
            <text
              key={x}
              x={x === 0 ? 4 : x === 1320 ? 1316 : x}
              y={32}
              fill={labelColor}
              fontSize="7"
              fontFamily="monospace"
              textAnchor={x === 0 ? "start" : x === 1320 ? "end" : "middle"}
              letterSpacing="0.6"
              opacity={revealed ? 1 : 0}
              style={{ transition: "opacity 0.4s ease 1.6s" }}
            >
              {x}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
}
