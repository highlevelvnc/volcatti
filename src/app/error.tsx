"use client";

import { useEffect } from "react";
import Link from "next/link";
import { LogoMark } from "@/components/logo";
import { ArrowRight } from "@/components/icons";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[error-boundary]", error);
  }, [error]);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-graphite text-offwhite overflow-hidden px-5 md:px-8">
      {/* Blueprint grid */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
      >
        {[120, 360, 600, 840, 1080, 1320].map((x) => (
          <line key={`v${x}`} x1={x} y1="0" x2={x} y2="900" stroke="rgba(244,241,234,0.18)" strokeWidth="0.5" />
        ))}
        {[120, 300, 480, 660, 780].map((y) => (
          <line key={`h${y}`} x1="0" y1={y} x2="1440" y2={y} stroke="rgba(244,241,234,0.18)" strokeWidth="0.5" />
        ))}
        <circle cx="120" cy="120" r="3" fill="#B88A2A" />
        <circle cx="1320" cy="120" r="3" fill="#B88A2A" />
        <circle cx="120" cy="780" r="3" fill="#B88A2A" />
        <circle cx="1320" cy="780" r="3" fill="#B88A2A" />
      </svg>

      <div className="relative z-10 max-w-[640px] w-full text-center flex flex-col items-center gap-8">
        <span className="font-mono text-[0.7rem] tracking-[0.28em] uppercase text-bronze">
          Erro · Folha N.º 500
        </span>

        <h1 className="font-display font-light leading-[0.95] tracking-[-0.04em]" style={{ fontSize: "clamp(4rem, 14vw, 10rem)" }}>
          Algo correu mal.
        </h1>

        <p className="font-display font-light text-offwhite/85 max-w-[44ch]" style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)", lineHeight: 1.55 }}>
          Houve uma falha técnica neste pedido. Pode tentar novamente
          ou voltar à página inicial.
        </p>

        {error.digest && (
          <span className="font-mono text-[0.62rem] tracking-[0.18em] uppercase text-offwhite/45 px-3 py-1 border border-offwhite/15">
            Ref · {error.digest}
          </span>
        )}

        <div className="flex flex-wrap items-center justify-center gap-3.5 mt-2">
          <button onClick={reset} className="btn btn--bronze btn--lg" data-cursor="Repetir">
            <span>Tentar de novo</span>
          </button>
          <Link href="/" className="btn btn--ghost btn--ghost-light btn--lg">
            <span>Voltar ao início</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="mt-10 flex items-center gap-3 opacity-60">
          <LogoMark light className="w-7 h-auto" />
          <span className="font-mono text-[0.65rem] tracking-[0.22em] uppercase">
            Volcatti · Lisboa
          </span>
        </div>
      </div>
    </main>
  );
}
