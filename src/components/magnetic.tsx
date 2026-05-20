"use client";

import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  /** Max pull distance in px when the cursor is right on top */
  strength?: number;
  /** Radius around the element where the magnet activates */
  radius?: number;
  className?: string;
};

/**
 * Magnetic wrapper — pulls the child toward the cursor when nearby.
 * Use sparingly on primary CTAs. Disabled on touch + reduced motion.
 */
export function Magnetic({
  children,
  strength = 14,
  radius = 90,
  className = "inline-block",
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);

      if (dist > radius) {
        targetX = 0;
        targetY = 0;
        return;
      }
      // Magnetic pull — stronger near centre, falls off cubicly
      const t = 1 - dist / radius;
      const pull = strength * t;
      targetX = (dx / radius) * pull;
      targetY = (dy / radius) * pull;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.2;
      currentY += (targetY - currentY) * 0.2;
      el.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      el.style.transform = "";
    };
  }, [radius, strength]);

  return (
    <span ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </span>
  );
}
