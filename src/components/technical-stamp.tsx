/**
 * Technical stamp — rotating circular badge in the corner of the hero.
 * Reinforces certification credibility without screaming. Pure SVG +
 * CSS spin (no JS), respects prefers-reduced-motion.
 */

type Props = {
  text?: string;
  className?: string;
};

export function TechnicalStamp({
  text = "VOLCATTI · CERTIEL · OBRA VERIFICADA · ",
  className = "",
}: Props) {
  const chars = text.split("");
  return (
    <div className={`relative w-[120px] h-[120px] ${className}`} aria-hidden="true">
      <svg viewBox="0 0 120 120" className="w-full h-full stamp-spin">
        {/* Outer ring */}
        <circle cx="60" cy="60" r="58" fill="none" stroke="rgba(184,138,42,0.5)" strokeWidth="0.6" />
        <circle cx="60" cy="60" r="48" fill="none" stroke="rgba(184,138,42,0.35)" strokeWidth="0.5" strokeDasharray="2 3" />

        {/* Curved text path */}
        <defs>
          <path id="stamp-curve" d="M 60,60 m -52,0 a 52,52 0 1,1 104,0 a 52,52 0 1,1 -104,0" />
        </defs>
        <text fill="#B88A2A" fontFamily="JetBrains Mono, monospace" fontSize="7" letterSpacing="3.6" fontWeight="500">
          <textPath href="#stamp-curve" startOffset="0">
            {chars.join("")}
          </textPath>
        </text>
      </svg>

      {/* Centre mark — static */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="10" stroke="#B88A2A" strokeWidth="1" />
          <path d="M7 12 L11 16 L17 9" stroke="#B88A2A" strokeWidth="1.4" strokeLinecap="square" />
        </svg>
        <span className="mt-0.5 font-mono text-[0.55rem] tracking-[0.16em] uppercase text-bronze">
          Verificado
        </span>
      </div>

      <style>{`
        @keyframes stamp-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .stamp-spin {
          animation: stamp-spin 28s linear infinite;
          transform-origin: center;
        }
        @media (prefers-reduced-motion: reduce) {
          .stamp-spin { animation: none; }
        }
      `}</style>
    </div>
  );
}
