type LogoProps = {
  className?: string;
  light?: boolean;
};

export function LogoMark({ className = "w-9 h-auto", light = false }: LogoProps) {
  const stroke = light ? "#F4F1EA" : "#111111";
  return (
    <svg viewBox="0 0 64 56" className={className} fill="none" aria-hidden="true">
      <path d="M4 6 L26 50 L48 6" stroke={stroke} strokeWidth="6" strokeLinecap="square" />
      <path
        d="M14 6 L26 30 L38 6"
        stroke={stroke}
        strokeWidth="3.5"
        strokeLinecap="square"
        opacity="0.55"
      />
      <path d="M40 6 L52 6 L40 28 Z" fill="#B88A2A" />
    </svg>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <div className="inline-flex items-center gap-3.5">
      <LogoMark light={light} />
      <div className="inline-flex flex-col leading-none gap-1">
        <span
          className={`font-sans font-semibold text-[1.05rem] tracking-[0.18em] ${
            light ? "text-offwhite" : "text-graphite"
          }`}
        >
          VOLCATTI
        </span>
        <span
          className={`hidden xl:inline font-mono text-[0.6rem] tracking-[0.14em] uppercase ${
            light ? "text-offwhite/55" : "text-graphite/55"
          }`}
        >
          Construção · Remodelação · Piscinas · Elétrica
        </span>
      </div>
    </div>
  );
}
