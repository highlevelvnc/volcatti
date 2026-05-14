"use client";

import { useEffect, useRef, useState } from "react";
import { GhostNumber } from "./ghost-number";

/**
 * Real-obra video reel — embedded looping muted video from the
 * Volcatti Instagram. Plays only when in view (battery-friendly).
 * Click-to-unmute control for users who want audio.
 */
export function VideoReel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    const container = containerRef.current;
    if (!el || !container) return;

    // Respect data-saver / reduced motion
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const slowConn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reducedMotion || slowConn) {
      return; // Leave poster image showing, no autoplay
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.play().then(() => setPlaying(true)).catch(() => {});
          } else {
            el.pause();
            setPlaying(false);
          }
        });
      },
      { threshold: 0.25 },
    );
    io.observe(container);
    return () => io.disconnect();
  }, []);

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  };

  return (
    <section
      className="relative bg-graphite text-offwhite border-y border-offwhite/[0.06] overflow-hidden"
      style={{ paddingBlock: "clamp(80px, 11vw, 160px)" }}
    >
      <GhostNumber num="▸" position="right" className="text-offwhite/[0.04]" />

      <div className="relative max-w-container mx-auto px-5 md:px-8 lg:px-12">
        <header className="grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-20 items-end pb-12 lg:pb-16">
          <div className="flex flex-col gap-7">
            <div data-reveal className="section-index section-index--light">
              <span className="section-index__num">∗</span>
              <span className="section-index__label">Em obra · Reel</span>
            </div>
            <h2 className="display display--light">
              <span data-reveal="line"><span>Veja-nos</span></span>
              <span data-reveal="line" data-d="100"><span><em>em movimento.</em></span></span>
            </h2>
          </div>
          <p data-reveal data-d="200" className="font-display font-light text-offwhite/72 max-w-[44ch]" style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)", lineHeight: 1.55 }}>
            Capturado em obra real. Sem filtros, sem fingimento — só o trabalho a acontecer.
          </p>
        </header>

        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-center">
          {/* Video container */}
          <div ref={containerRef} className="relative aspect-[9/16] max-w-[440px] mx-auto w-full overflow-hidden bg-graphite/50 border border-offwhite/12 group">
            <video
              ref={videoRef}
              src="/portfolio/volcatti-reel.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/portfolio/piscina-noturna.png"
              className="w-full h-full object-cover"
              aria-label="Vídeo de obra Volcatti"
            />

            {/* Top badge */}
            <span className="absolute top-4 left-4 inline-flex items-center gap-2 font-mono text-[0.62rem] tracking-[0.22em] uppercase text-offwhite/85 px-2.5 py-1 bg-graphite/65 backdrop-blur-sm border border-offwhite/15">
              <span className={`w-1.5 h-1.5 rounded-full ${playing ? "bg-red-500 animate-pulse" : "bg-offwhite/40"}`} />
              {playing ? "Live" : "Pausa"}
            </span>

            {/* Mute toggle */}
            <button
              onClick={toggleMute}
              aria-label={muted ? "Ativar som" : "Silenciar"}
              data-cursor={muted ? "Som" : "Mute"}
              className="absolute bottom-4 right-4 w-10 h-10 inline-flex items-center justify-center bg-graphite/65 backdrop-blur-sm border border-offwhite/20 text-offwhite hover:bg-bronze hover:border-bronze hover:text-graphite transition-colors duration-300"
            >
              {muted ? (
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
                  <path d="M3 9v6h4l5 4V5L7 9H3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="miter" />
                  <path d="M17 8 L22 16 M22 8 L17 16" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
                  <path d="M3 9v6h4l5 4V5L7 9H3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="miter" />
                  <path d="M16 8 Q19 12 16 16" stroke="currentColor" strokeWidth="1.4" fill="none" />
                  <path d="M19 6 Q23 12 19 18" stroke="currentColor" strokeWidth="1.4" fill="none" />
                </svg>
              )}
            </button>

            {/* Bottom watermark */}
            <span className="absolute bottom-4 left-4 font-mono text-[0.55rem] tracking-[0.22em] uppercase text-offwhite/55">
              @volcatti_lda
            </span>
          </div>

          {/* Side info — focused on what matters to the client */}
          <ul className="flex flex-col gap-px bg-offwhite/[0.08] border border-offwhite/12">
            {[
              { label: "Em obra", value: "Estaleiro próprio · Setúbal" },
              { label: "Equipa", value: "Técnicos próprios no terreno" },
              { label: "Fase", value: "Acabamento + casa de máquinas" },
              { label: "Mais reels", value: "@volcatti_lda" },
            ].map((row, i) => (
              <li key={row.label} className="bg-graphite p-5 lg:p-6 grid grid-cols-[120px_1fr] gap-4 items-center">
                <span className="font-mono text-[0.62rem] tracking-[0.2em] uppercase text-bronze">
                  {String(i + 1).padStart(2, "0")} · {row.label}
                </span>
                <span className="font-display text-offwhite/85" style={{ fontSize: "clamp(1rem, 1.3vw, 1.2rem)" }}>
                  {row.value}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
