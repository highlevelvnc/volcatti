"use client";

import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  speed?: number;
  className?: string;
};

/**
 * Element-anchored parallax wrapper.
 * Uses scroll progress through viewport to compute a clean translateY.
 * No GSAP — pure rAF-throttled scroll listener.
 */
export function ParallaxImage({ children, speed = 0.12, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    let raf = 0;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (inView) {
        const elCenter = rect.top + rect.height / 2;
        const denom = window.innerHeight / 2 + rect.height / 2;
        const progress = (elCenter - window.innerHeight / 2) / denom;
        const offset = -progress * rect.height * speed;
        el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
      }
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
  }, [speed]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
