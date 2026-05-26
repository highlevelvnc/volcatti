type Props = {
  num: string;
  position?: "left" | "right";
  className?: string;
};

/**
 * Giant ghost number rendered behind a section header — discreet
 * decoration positioned in the upper area of the section so it
 * doesn't dominate empty vertical space.
 */
export function GhostNumber({ num, position = "right", className = "" }: Props) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute z-0 font-display font-light leading-none select-none text-graphite/[0.05] ${
        position === "left" ? "left-[-1.5vw]" : "right-[-1.5vw]"
      } top-4 lg:top-8 ${className}`}
      style={{ fontSize: "clamp(7rem, 14vw, 16rem)", letterSpacing: "-0.05em" }}
    >
      {num}
    </span>
  );
}

export function GhostNumberLight({ num, position = "right", className = "" }: Props) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute z-0 font-display font-light leading-none select-none text-offwhite/[0.06] ${
        position === "left" ? "left-[-1.5vw]" : "right-[-1.5vw]"
      } top-4 lg:top-8 ${className}`}
      style={{ fontSize: "clamp(7rem, 14vw, 16rem)", letterSpacing: "-0.05em" }}
    >
      {num}
    </span>
  );
}
