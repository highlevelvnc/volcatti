"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  /** Big number, e.g. "03" or "06" */
  num: string;
  /** Small label, e.g. "Serviços" */
  label: string;
  /** Optional micro-caption above */
  kicker?: string;
  /** Light variant for graphite-bg sections */
  light?: boolean;
};

/**
 * Cinematic section title card — when the section enters the viewport,
 * a giant number + label slide in from the right and fade out after
 * ~1.2s. Visible only on first encounter (one-shot via ref).
 * Positioned absolutely inside its parent section.
 */
export function SectionTitleCard({ num, label, kicker = "Capítulo", light = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"hidden" | "in" | "out">("hidden");
  const firedRef = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !firedRef.current) {
            firedRef.current = true;
            setPhase("in");
            window.setTimeout(() => setPhase("out"), 1300);
            io.disconnect();
          }
        });
      },
      { threshold: 0.18 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const fg = light ? "text-offwhite" : "text-graphite";
  const dim = light ? "text-offwhite/55" : "text-graphite/55";

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute top-0 right-0 left-0 z-[5] overflow-hidden transition-opacity duration-700 ${
        phase === "out" ? "opacity-0" : "opacity-100"
      }`}
      style={{ height: "clamp(160px, 22vw, 280px)" }}
    >
      <div className="absolute inset-0 max-w-container mx-auto px-5 md:px-8 lg:px-12 flex items-start justify-end">
        <div
          className={`mt-8 lg:mt-12 flex items-baseline gap-4 transition-[transform,opacity] duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            phase === "hidden"
              ? "opacity-0 translate-x-12"
              : phase === "in"
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-y-3"
          }`}
        >
          <div className={`flex flex-col items-end gap-1 font-mono text-[0.6rem] tracking-[0.24em] uppercase ${dim}`}>
            <span className="text-bronze">▸ {kicker}</span>
            <span>{label}</span>
          </div>
          <span
            className={`font-display font-light leading-[0.85] tracking-[-0.04em] ${fg}`}
            style={{ fontSize: "clamp(5rem, 11vw, 11rem)" }}
          >
            {num}
          </span>
        </div>
      </div>
    </div>
  );
}
