"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  alt: string;
  kicker: string;
  caption: string;
};

/**
 * Sticky image pinned to the left of the Authority section, with a
 * scroll-linked zoom (1.0 → 1.32) and soft fade-out at the end.
 *
 * Why the ref-based imperative transform (not React state):
 * Updating scale via setState forces a re-render every scroll frame
 * which, combined with any CSS `transition` on transform, makes the
 * image visibly pulse on smooth-scroll. We instead write transform
 * STRAIGHT to the DOM inside a continuous RAF loop — buttery smooth
 * regardless of scroll source (wheel, trackpad, Lenis).
 *
 * State (`progress`) is still updated, but throttled and only used
 * for non-critical UI bits (the zoom badge + opacity fade), where
 * a stale value of a few frames is invisible.
 */
export function AuthorityImage({ src, alt, kicker, caption }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const section = wrapperRef.current?.closest("section");
    const inner = innerRef.current;
    const wrapper = wrapperRef.current;
    const bar = barRef.current;
    if (!section || !inner || !wrapper) return;

    let raf = 0;
    let lastStateUpdate = 0;

    const tick = () => {
      const r = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollable = r.height - vh;
      const p = scrollable <= 0 ? 0 : Math.max(0, Math.min(1, -r.top / scrollable));

      // Direct DOM writes — bypass React re-render for the hot path
      const scale = 1 + p * 0.32;
      inner.style.transform = `scale(${scale.toFixed(4)})`;

      const fadeStart = 0.88;
      const opacity =
        p < fadeStart ? 1 : Math.max(0, 1 - (p - fadeStart) / (1 - fadeStart));
      wrapper.style.opacity = opacity.toFixed(3);

      if (bar) bar.style.transform = `scaleX(${p.toFixed(4)})`;

      // Throttled state — only for the visible "Zoom · X%" badge.
      // 120ms cadence is invisible to the eye but saves ~7× re-renders.
      const now = performance.now();
      if (now - lastStateUpdate > 120) {
        setDisplayProgress(p);
        lastStateUpdate = now;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const scaleDisplay = 1 + displayProgress * 0.32;

  return (
    <div
      ref={wrapperRef}
      className="sticky hidden lg:block aspect-[3/4] w-full overflow-hidden border border-graphite/12 bg-graphite"
      style={{ top: "104px", willChange: "opacity" }}
    >
      <div className="absolute inset-0 overflow-hidden">
        {/* Image — transform applied imperatively in the RAF loop */}
        <div
          ref={innerRef}
          className="absolute inset-0 will-change-transform"
          style={{ transformOrigin: "center center" }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            loading="lazy"
            quality={84}
            sizes="320px"
            className="object-cover volcatti-look"
          />
        </div>

        {/* Top progress bar — scaleX written imperatively too */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-offwhite/10 z-[3] overflow-hidden">
          <span
            ref={barRef}
            className="absolute top-0 left-0 h-full w-full bg-bronze origin-left"
            style={{ willChange: "transform", transform: "scaleX(0)" }}
          />
        </div>

        {/* Zoom indicator — uses throttled state (invisible 120ms cadence) */}
        <span className="absolute top-3 right-3 z-[2] font-mono text-[0.55rem] tracking-[0.22em] uppercase text-bronze px-2 py-1 bg-graphite/65 backdrop-blur-sm border border-bronze/35">
          Zoom · {Math.round(scaleDisplay * 100)}%
        </span>

        {/* Caption — bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-[2] p-3 bg-gradient-to-t from-graphite/95 to-transparent pointer-events-none">
          <span className="block font-mono text-[0.58rem] tracking-[0.22em] uppercase text-bronze mb-0.5">
            {kicker}
          </span>
          <span className="block font-mono text-[0.6rem] tracking-[0.14em] uppercase text-offwhite/90">
            {caption}
          </span>
        </div>
      </div>
    </div>
  );
}
