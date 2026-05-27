"use client";

import { useEffect, useState } from "react";

/**
 * Minimal loading curtain — logo Volcatti centrado com uma única
 * hairline bronze a desenhar-se por baixo. Sem ornamentos. Conecta
 * com o nicho sem ser barulhento.
 *
 * Comportamento:
 *  - Skip total se `prefers-reduced-motion` ou já visitado nesta
 *    sessão (return navigation é instantânea).
 *  - Hold mínimo 700ms para o reveal não ser instantâneo demais.
 *  - Hard fallback 2.2s.
 *  - Saída: fade out + slide subtil (sem clip-path complicado).
 */
export function LoadingCurtain() {
  const [phase, setPhase] = useState<"in" | "out" | "gone">("in");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const visited = sessionStorage.getItem("volcatti.curtain.shown");
    if (reduced || visited) {
      setPhase("gone");
      return;
    }
    sessionStorage.setItem("volcatti.curtain.shown", "1");

    const minHold = 700;
    let loaded = false;
    let minMet = false;

    const maybeProceed = () => {
      if (loaded && minMet) {
        setPhase("out");
        window.setTimeout(() => setPhase("gone"), 500);
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

    // Hard fallback — never block UI past 2.2s.
    const hardFallback = window.setTimeout(() => {
      setPhase("out");
      window.setTimeout(() => setPhase("gone"), 500);
    }, 2200);

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
      className={`fixed inset-0 z-[200] pointer-events-none flex items-center justify-center bg-graphite transition-opacity duration-500 ease-out ${
        phase === "out" ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Logo */}
        <div className="flex items-center gap-3.5">
          <svg viewBox="0 0 64 56" className="w-9 h-auto" fill="none" aria-hidden="true">
            <path d="M4 6 L26 50 L48 6" stroke="#F4F1EA" strokeWidth="6" strokeLinecap="square" />
            <path d="M14 6 L26 30 L38 6" stroke="#F4F1EA" strokeWidth="3.5" strokeLinecap="square" opacity="0.55" />
            <path d="M40 6 L52 6 L40 28 Z" fill="#B88A2A" />
          </svg>
          <span className="font-sans font-semibold text-offwhite text-[1.1rem] tracking-[0.22em]">
            VOLCATTI
          </span>
        </div>

        {/* Hairline bronze drawing — single line */}
        <div className="relative w-32 h-px overflow-hidden">
          <span
            className="absolute inset-y-0 left-0 bg-bronze loader-line"
            style={{ width: 0 }}
          />
        </div>
      </div>

      <style>{`
        @keyframes loader-line {
          0%   { width: 0; left: 0; }
          50%  { width: 100%; left: 0; }
          100% { width: 0; left: 100%; }
        }
        .loader-line {
          animation: loader-line 1.4s cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }
      `}</style>
    </div>
  );
}
