"use client";

import { useEffect, useState } from "react";

/**
 * Tape measure loader — a single horizontal line extends from 0 → 100%
 * with tick marks every 10. Connects with the niche ("medir antes de
 * construir") without the heavy floor-plan animation. Hides itself once
 * window.load fires (with min hold + hard fallback).
 */
export function LoadingCurtain() {
  const [phase, setPhase] = useState<"measuring" | "lifting" | "gone">("measuring");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const visited = sessionStorage.getItem("volcatti.curtain.shown");
    if (reduced || visited) {
      setPhase("gone");
      return;
    }
    sessionStorage.setItem("volcatti.curtain.shown", "1");

    const minHold = 1100;
    let loaded = false;
    let minMet = false;

    const maybeProceed = () => {
      if (loaded && minMet) {
        setPhase("lifting");
        window.setTimeout(() => setPhase("gone"), 700);
      }
    };

    const onLoad = () => {
      loaded = true;
      maybeProceed();
    };
    if (document.readyState === "complete") loaded = true;
    else window.addEventListener("load", onLoad, { once: true });

    const t = window.setTimeout(() => {
      minMet = true;
      maybeProceed();
    }, minHold);

    const hardFallback = window.setTimeout(() => {
      setPhase("lifting");
      window.setTimeout(() => setPhase("gone"), 700);
    }, 2500);

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
      className={`fixed inset-0 z-[200] pointer-events-none bg-graphite text-offwhite flex flex-col items-center justify-center gap-10 transition-[clip-path,opacity] duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
        phase === "lifting" ? "[clip-path:inset(100%_0_0_0)] opacity-0" : "[clip-path:inset(0_0_0_0)] opacity-100"
      }`}
    >
      {/* Top label */}
      <div className="flex flex-col items-center gap-2">
        <span className="font-mono text-[0.6rem] tracking-[0.32em] uppercase text-offwhite/45">
          Volcatti
        </span>
        <span className="font-display font-light italic text-bronze text-base sm:text-lg">
          medir · construir · entregar
        </span>
      </div>

      {/* Tape measure */}
      <div className="relative w-[80vw] max-w-[640px]" aria-hidden="true">
        {/* Static tick rail */}
        <svg viewBox="0 0 640 22" className="w-full h-5" preserveAspectRatio="none">
          <line x1="0" y1="14" x2="640" y2="14" stroke="rgba(244,241,234,0.15)" strokeWidth="1" />
          {Array.from({ length: 65 }, (_, i) => i).map((i) => {
            const x = i * 10;
            const isMajor = i % 10 === 0;
            const isMid = i % 5 === 0;
            return (
              <line
                key={i}
                x1={x}
                y1="14"
                x2={x}
                y2={isMajor ? 4 : isMid ? 8 : 11}
                stroke={isMajor ? "rgba(184,138,42,0.5)" : "rgba(244,241,234,0.25)"}
                strokeWidth="1"
              />
            );
          })}
          {[0, 100, 200, 300, 400, 500, 600].map((x) => (
            <text key={x} x={x} y={22} fill="rgba(244,241,234,0.4)" fontSize="6" fontFamily="monospace" textAnchor="middle" letterSpacing="0.5">
              {x}
            </text>
          ))}
        </svg>

        {/* Bronze fill line (animated) */}
        <div
          className="absolute top-[14px] left-0 h-px bg-bronze tape-fill"
          style={{ width: 0 }}
        />

        {/* Travelling cursor mark */}
        <div className="absolute top-[2px] tape-cursor" style={{ left: 0 }}>
          <span className="block w-px h-4 bg-bronze" />
          <span className="block w-2 h-2 -ml-1 -mt-1 bg-bronze rotate-45" />
        </div>
      </div>

      <style>{`
        @keyframes tape-fill { from { width: 0 } to { width: 100% } }
        @keyframes tape-cursor { from { left: 0 } to { left: 100% } }
        .tape-fill { animation: tape-fill 0.9s cubic-bezier(0.65, 0, 0.35, 1) forwards; }
        .tape-cursor { animation: tape-cursor 0.9s cubic-bezier(0.65, 0, 0.35, 1) forwards; }
      `}</style>
    </div>
  );
}
