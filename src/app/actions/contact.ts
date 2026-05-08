"use server";

import { sendLead } from "@/lib/email";

export type ContactState = {
  status: "idle" | "ok" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "email" | "phone" | "service" | "message", string>>;
};

const SERVICES = ["construcao", "remodelacao", "piscina", "eletrica", "acabamentos", "manutencao", "outro"] as const;

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const service = String(formData.get("service") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const honeypot = String(formData.get("website") ?? "");

  if (honeypot) return { status: "ok", message: "Recebido. Em breve entraremos em contacto." };

  const errors: ContactState["errors"] = {};
  if (!name || name.length < 2) errors.name = "Indique o seu nome.";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Email inválido.";
  if (phone && !/^[0-9 +()\-]{6,}$/.test(phone)) errors.phone = "Telefone inválido.";
  if (!service || !SERVICES.includes(service as (typeof SERVICES)[number])) errors.service = "Escolha um serviço.";
  if (!message || message.length < 10) errors.message = "Descreva o seu projeto (mínimo 10 caracteres).";

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors, message: "Verifique os campos." };
  }

  const send = await sendLead({ name, email, phone: phone || undefined, service, message });

  if (!send.ok) {
    return { status: "error", message: send.error };
  }

  return {
    status: "ok",
    message: `Recebemos a sua mensagem, ${name.split(" ")[0]}. Respondemos em 24h úteis para ${email}.`,
  };
}

export type NewsletterState = {
  status: "idle" | "ok" | "error";
  message?: string;
};

export async function subscribeNewsletter(_prev: NewsletterState, formData: FormData): Promise<NewsletterState> {
  const email = String(formData.get("email") ?? "").trim();
  const honeypot = String(formData.get("website") ?? "");

  if (honeypot) return { status: "ok", message: "Subscrito." };

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Email inválido." };
  }

  // Newsletter list — soft fallback for now (logs only). Easy upgrade
  // path when ready: Resend audiences API or Mailchimp.
  if (process.env.NODE_ENV !== "production") {
    console.log("[newsletter]", email);
  }

  return { status: "ok", message: "Subscrito. Receberá novidades das obras." };
}
