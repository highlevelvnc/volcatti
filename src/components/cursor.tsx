"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Subtle custom cursor — small bronze ring that follows the pointer with
 * lerp smoothing. Grows + adds label when hovering an interactive target
 * marked with `data-cursor="<label>"`. Hidden on touch devices.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const target = { x: 0, y: 0 };
    const ring = { x: 0, y: 0 };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const tick = () => {
      ring.x += (target.x - ring.x) * 0.18;
      ring.y += (target.y - ring.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove);

    // Hover detection
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const interactive = t.closest("a, button, [data-cursor]");
      if (!interactive) return;
      const label = (interactive as HTMLElement).dataset.cursor || "";
      ringRef.current?.setAttribute("data-active", "true");
      if (labelRef.current) {
        labelRef.current.textContent = label;
        labelRef.current.dataset.show = label ? "true" : "false";
      }
    };
    const onOut = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const interactive = t.closest("a, button, [data-cursor]");
      if (!interactive) return;
      ringRef.current?.setAttribute("data-active", "false");
      if (labelRef.current) labelRef.current.dataset.show = "false";
    };
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-bronze rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        data-active="false"
        aria-hidden="true"
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-9 h-9 border border-bronze rounded-full pointer-events-none z-[9998] transition-[width,height,border-width,background-color] duration-300 ease-out data-[active=true]:w-14 data-[active=true]:h-14 data-[active=true]:bg-bronze/10"
        style={{ willChange: "transform" }}
      >
        <span
          ref={labelRef}
          data-show="false"
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 font-mono text-[0.6rem] tracking-[0.16em] uppercase text-bronze whitespace-nowrap opacity-0 data-[show=true]:opacity-100 transition-opacity duration-200"
        />
      </div>
      <style>{`html, body, * { cursor: none !important; }`}</style>
    </>
  );
}
