"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { ArrowRight } from "./icons";

const SERVICE_OPTIONS = [
  { value: "construcao", label: "Construção Civil" },
  { value: "remodelacao", label: "Remodelação" },
  { value: "piscina", label: "Piscina" },
  { value: "eletrica", label: "Elétrica" },
  { value: "acabamentos", label: "Acabamentos" },
  { value: "manutencao", label: "Manutenção" },
  { value: "outro", label: "Outro" },
] as const;

const initial: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initial);

  return (
    <form
      action={formAction}
      className="grid gap-5 max-w-[680px] w-full"
      noValidate
      aria-busy={pending}
      aria-label="Pedido de orçamento"
    >
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid sm:grid-cols-2 gap-5">
        <Field
          name="name"
          label="Nome"
          required
          error={state.errors?.name}
        />
        <Field
          name="email"
          label="Email"
          type="email"
          required
          error={state.errors?.email}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field
          name="phone"
          label="Telefone"
          type="tel"
          placeholder="+351 ..."
          error={state.errors?.phone}
        />
        <SelectField
          name="service"
          label="Serviço"
          required
          options={SERVICE_OPTIONS}
          error={state.errors?.service}
        />
      </div>

      <Field
        name="message"
        label="Sobre o projeto"
        required
        textarea
        rows={5}
        placeholder="O que pretende construir, remodelar, instalar..."
        error={state.errors?.message}
      />

      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <p className="font-mono text-[0.65rem] tracking-[0.16em] uppercase text-offwhite/45 max-w-[40ch]">
          Resposta média: <span className="text-bronze">24 horas úteis</span> · Sem partilha de dados a terceiros.
        </p>
        <button
          type="submit"
          disabled={pending}
          className="btn btn--bronze btn--lg disabled:opacity-60 disabled:cursor-not-allowed"
          data-cursor={pending ? "Enviando…" : "Enviar →"}
        >
          {pending ? (
            <>
              <Spinner />
              <span>A enviar...</span>
            </>
          ) : (
            <>
              <span>Enviar pedido</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>

      {state.status === "ok" && (
        <div
          role="status"
          className="mt-2 p-5 border-l-2 border-bronze bg-offwhite/[0.04] flex items-start gap-4"
        >
          <CheckIcon />
          <div>
            <span className="block font-mono text-[0.7rem] tracking-[0.18em] uppercase text-bronze mb-1">
              Recebido
            </span>
            <p className="text-offwhite/85 text-[0.96rem] leading-relaxed">{state.message}</p>
          </div>
        </div>
      )}

      {state.status === "error" && state.message && (
        <div role="alert" className="mt-2 p-4 border-l-2 border-red-400 bg-red-500/[0.06] text-red-200/90 font-mono text-[0.7rem] tracking-[0.16em] uppercase">
          ▲ {state.message}
        </div>
      )}
    </form>
  );
}

/* ───────── helpers ───────── */
function Field({
  name,
  label,
  type = "text",
  required = false,
  textarea = false,
  rows = 3,
  placeholder,
  error,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  rows?: number;
  placeholder?: string;
  error?: string;
}) {
  const baseClass =
    "w-full bg-transparent border-b border-offwhite/30 text-offwhite placeholder:text-offwhite/30 font-sans py-3 px-0 focus:outline-none focus:border-bronze transition-colors duration-300";

  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-[0.66rem] tracking-[0.18em] uppercase text-offwhite/55">
        {label} {required && <span className="text-bronze">*</span>}
      </span>
      {textarea ? (
        <textarea
          name={name}
          required={required}
          rows={rows}
          placeholder={placeholder}
          className={`${baseClass} resize-none`}
          aria-invalid={!!error}
        />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          placeholder={placeholder}
          className={baseClass}
          aria-invalid={!!error}
        />
      )}
      {error && (
        <span className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-red-300/80">
          ▲ {error}
        </span>
      )}
    </label>
  );
}

function SelectField({
  name,
  label,
  options,
  required,
  error,
}: {
  name: string;
  label: string;
  options: ReadonlyArray<{ value: string; label: string }>;
  required?: boolean;
  error?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-[0.66rem] tracking-[0.18em] uppercase text-offwhite/55">
        {label} {required && <span className="text-bronze">*</span>}
      </span>
      <div className="relative">
        <select
          name={name}
          required={required}
          defaultValue=""
          className="w-full bg-transparent border-b border-offwhite/30 text-offwhite font-sans py-3 px-0 pr-8 appearance-none focus:outline-none focus:border-bronze transition-colors duration-300 [&>option]:text-graphite"
          aria-invalid={!!error}
        >
          <option value="" disabled>
            Selecionar...
          </option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <svg viewBox="0 0 16 16" className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 text-bronze pointer-events-none" fill="none" aria-hidden="true">
          <path d="M3 6 L8 11 L13 6" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
      {error && (
        <span className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-red-300/80">
          ▲ {error}
        </span>
      )}
    </label>
  );
}

function Spinner() {
  return (
    <svg viewBox="0 0 16 16" className="w-4 h-4 animate-spin" aria-hidden="true">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.3" />
      <path d="M14 8a6 6 0 0 0-6-6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="square" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6 text-bronze flex-shrink-0 mt-0.5" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.2" />
      <path d="M7 12 L11 16 L17 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}
