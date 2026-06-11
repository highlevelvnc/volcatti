"use server";

import { sendLead } from "@/lib/email";

export type ContactState = {
  status: "idle" | "ok" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "email" | "phone" | "service" | "message" | "attachments", string>>;
};

const SERVICES = ["construcao", "remodelacao", "piscina", "casa-maquinas", "assistencia-piscina", "eletrica", "acabamentos", "manutencao", "outro"] as const;

// Anexos — limites e tipos aceites
const MAX_FILES = 5;
const MAX_TOTAL_BYTES = 10 * 1024 * 1024; // 10 MB no total
const ACCEPTED = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif", "application/pdf"];

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

  // Anexos (opcional) — validar tipo, número e tamanho total
  const rawFiles = formData.getAll("attachments").filter((f): f is File => f instanceof File && f.size > 0);
  const attachments: { filename: string; content: Buffer }[] = [];
  if (rawFiles.length > 0) {
    if (rawFiles.length > MAX_FILES) {
      errors.attachments = `Máximo ${MAX_FILES} ficheiros.`;
    } else {
      const total = rawFiles.reduce((sum, f) => sum + f.size, 0);
      const badType = rawFiles.find((f) => f.type && !ACCEPTED.includes(f.type));
      if (total > MAX_TOTAL_BYTES) {
        errors.attachments = "Anexos excedem 10 MB no total.";
      } else if (badType) {
        errors.attachments = "Só aceitamos imagens (JPG, PNG, WEBP) e PDF.";
      } else {
        for (const f of rawFiles) {
          attachments.push({ filename: f.name, content: Buffer.from(await f.arrayBuffer()) });
        }
      }
    }
  }

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors, message: "Verifique os campos." };
  }

  const send = await sendLead({ name, email, phone: phone || undefined, service, message, attachments });

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
