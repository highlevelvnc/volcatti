type Props = {
  num: string;
  position?: "left" | "right";
  className?: string;
};

/**
 * Giant ghost number rendered behind a section header.
 * Pure decoration — sits at very low opacity to evoke
 * blueprint/architectural drawing labels.
 */
export function GhostNumber({ num, position = "right", className = "" }: Props) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute z-0 font-display font-light leading-none select-none text-graphite/[0.04] ${
        position === "left" ? "left-[-2vw] sm:left-[-1vw]" : "right-[-2vw] sm:right-[-1vw]"
      } top-1/2 -translate-y-1/2 ${className}`}
      style={{ fontSize: "clamp(14rem, 28vw, 30rem)", letterSpacing: "-0.06em" }}
    >
      {num}
    </span>
  );
}

export function GhostNumberLight({ num, position = "right", className = "" }: Props) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute z-0 font-display font-light leading-none select-none text-offwhite/[0.05] ${
        position === "left" ? "left-[-2vw]" : "right-[-2vw]"
      } top-1/2 -translate-y-1/2 ${className}`}
      style={{ fontSize: "clamp(14rem, 28vw, 30rem)", letterSpacing: "-0.06em" }}
    >
      {num}
    </span>
  );
}
