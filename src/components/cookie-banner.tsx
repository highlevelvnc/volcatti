"use client";

import { useEffect, useState } from "react";

const KEY = "volcatti.cookies";

/**
 * Discrete, RGPD-style cookie banner.
 * Bottom-left, low-profile, with Accept / Decline.
 * Only stats + speed insights — no third-party tracking.
 */
export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const decided = window.localStorage.getItem(KEY);
    if (!decided) {
      const t = window.setTimeout(() => setShow(true), 1200);
      return () => window.clearTimeout(t);
    }
  }, []);

  const decide = (value: "accept" | "decline") => {
    try {
      window.localStorage.setItem(KEY, value);
    } catch {
      /* localStorage may be blocked — silently swallow */
    }
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Política de cookies"
      className="fixed bottom-5 left-5 z-[70] max-w-[380px] bg-graphite text-offwhite border border-offwhite/12 shadow-2xl"
    >
      <div className="p-5 flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <span className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-bronze pt-0.5">
            ▸ Cookies
          </span>
          <p className="text-[0.86rem] leading-relaxed text-offwhite/82">
            Usamos cookies para entender o uso do site e melhorar a experiência.
            Sem partilha a terceiros.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => decide("accept")}
            className="btn btn--bronze !px-4 !py-2.5 !text-[0.7rem] flex-1"
            data-cursor="OK"
          >
            <span>Aceitar</span>
          </button>
          <button
            onClick={() => decide("decline")}
            className="btn btn--ghost btn--ghost-light !px-4 !py-2.5 !text-[0.7rem]"
            data-cursor="Recusar"
          >
            <span>Recusar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
