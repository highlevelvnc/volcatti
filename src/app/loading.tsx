import { LogoMark } from "@/components/logo";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[150] bg-graphite text-offwhite flex flex-col items-center justify-center gap-8 pointer-events-none">
      <svg viewBox="0 0 200 140" className="w-[200px] sm:w-[260px] h-auto text-offwhite/80" fill="none" stroke="currentColor" strokeWidth="0.6" aria-hidden="true">
        <rect x="10" y="20" width="180" height="100" strokeDasharray="600" className="draw-blueprint" />
        <line x1="80" y1="20" x2="80" y2="80" strokeDasharray="600" className="draw-blueprint" style={{ animationDelay: "200ms" }} />
        <line x1="80" y1="80" x2="190" y2="80" strokeDasharray="600" className="draw-blueprint" style={{ animationDelay: "400ms" }} />
        <circle cx="10" cy="20" r="1.5" fill="#B88A2A" stroke="none" />
        <circle cx="190" cy="20" r="1.5" fill="#B88A2A" stroke="none" />
        <circle cx="10" cy="120" r="1.5" fill="#B88A2A" stroke="none" />
        <circle cx="190" cy="120" r="1.5" fill="#B88A2A" stroke="none" />
      </svg>
      <div className="flex items-center gap-3">
        <LogoMark light className="w-7 h-auto" />
        <span className="font-mono text-[0.65rem] tracking-[0.32em] uppercase text-offwhite/55 pulse-label">
          A carregar
        </span>
      </div>
    </div>
  );
}
