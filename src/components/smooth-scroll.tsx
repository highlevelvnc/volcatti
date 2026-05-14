"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Smooth scroll wrapper using Lenis. Inertia + linear easing for premium feel.
 * Disabled on small screens to keep native momentum scroll on mobile.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 1024) return; // mobile keeps native

    // Low-end device detection — skip smooth scroll where it would
    // cost more than it gives.
    const nav = navigator as Navigator & {
      deviceMemory?: number;
      hardwareConcurrency?: number;
      connection?: { saveData?: boolean; effectiveType?: string };
    };
    if (nav.deviceMemory && nav.deviceMemory < 4) return;
    if (nav.hardwareConcurrency && nav.hardwareConcurrency < 4) return;
    if (nav.connection?.saveData) return;
    if (nav.connection?.effectiveType && /2g|3g/.test(nav.connection.effectiveType)) return;

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
    });

    let raf = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
