"use client";

import { useActionState } from "react";
import { subscribeNewsletter, type NewsletterState } from "@/app/actions/contact";

const initial: NewsletterState = { status: "idle" };

export function NewsletterForm() {
  const [state, action, pending] = useActionState(subscribeNewsletter, initial);

  return (
    <form action={action} className="flex flex-col gap-3">
      <span className="font-mono text-[0.66rem] tracking-[0.18em] uppercase text-offwhite/55">
        Newsletter · novidades das obras
      </span>
      <div className="flex border-b border-offwhite/30 focus-within:border-bronze transition-colors duration-300">
        <input
          type="email"
          name="email"
          required
          placeholder="o.seu@email.pt"
          autoComplete="email"
          aria-label="Email para newsletter"
          className="flex-1 bg-transparent text-offwhite placeholder:text-offwhite/30 font-sans py-2.5 px-0 focus:outline-none text-sm"
        />
        {/* Honeypot */}
        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        <button
          type="submit"
          disabled={pending}
          className="px-3 text-bronze hover:text-offwhite transition-colors duration-300 disabled:opacity-50"
          aria-label="Subscrever newsletter"
          data-cursor={pending ? "..." : "Enviar"}
        >
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
            <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
          </svg>
        </button>
      </div>
      {state.status === "ok" && state.message && (
        <span className="font-mono text-[0.62rem] tracking-[0.14em] uppercase text-bronze">
          ▸ {state.message}
        </span>
      )}
      {state.status === "error" && state.message && (
        <span className="font-mono text-[0.62rem] tracking-[0.14em] uppercase text-red-300/80">
          ▲ {state.message}
        </span>
      )}
    </form>
  );
}
