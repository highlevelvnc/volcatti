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
 * Sticky image pinned to the left column of the Authority section.
 * Scroll-linked: zooms from 1.0 → 1.32 as you scroll through, then
 * subtle fade-out at the very end so it "hands off" to the next
 * section instead of cutting hard.
 */
export function AuthorityImage({ src, alt, kicker, caption }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // The section to track is the closest <section> ancestor.
    const section = wrapperRef.current?.closest("section");
    if (!section) return;

    let raf = 0;
    const update = () => {
      const r = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollable = r.height - vh;
      if (scrollable <= 0) {
        setProgress(0);
        return;
      }
      const p = Math.max(0, Math.min(1, -r.top / scrollable));
      setProgress(p);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Scale 1.00 → 1.32 across the section; soft fade in the final 12%.
  const scale = 1 + progress * 0.32;
  const fadeStart = 0.88;
  const opacity =
    progress < fadeStart ? 1 : Math.max(0, 1 - (progress - fadeStart) / (1 - fadeStart));

  return (
    <div
      ref={wrapperRef}
      className="sticky hidden lg:block aspect-[3/4] w-full overflow-hidden border border-graphite/12 bg-graphite"
      style={{ top: "104px", opacity, willChange: "opacity" }}
    >
      <div className="absolute inset-0 overflow-hidden">
        {/* Image with scroll-linked scale */}
        <div
          className="absolute inset-0 will-change-transform"
          style={{
            transform: `scale(${scale})`,
            transition: "transform 80ms linear",
          }}
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

        {/* Top progress bar — bronze, scroll-linked */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-offwhite/10 z-[3] overflow-hidden">
          <span
            className="absolute top-0 left-0 h-full w-full bg-bronze origin-left"
            style={{
              transform: `scaleX(${progress})`,
              willChange: "transform",
              transition: "transform 80ms linear",
            }}
          />
        </div>

        {/* Zoom indicator — bronze */}
        <span className="absolute top-3 right-3 z-[2] font-mono text-[0.55rem] tracking-[0.22em] uppercase text-bronze px-2 py-1 bg-graphite/65 backdrop-blur-sm border border-bronze/35">
          Zoom · {Math.round(scale * 100)}%
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
