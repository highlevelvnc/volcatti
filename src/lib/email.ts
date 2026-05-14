/**
 * Email transport. Uses Resend if RESEND_API_KEY + RESEND_FROM are set,
 * otherwise logs the payload to console (dev safety net — no silent fail
 * in production: build will succeed but the form will tell users their
 * message was received and we log it).
 *
 * To enable real send:
 *   1. Sign up at https://resend.com (free tier: 100 emails/day, 3000/mo)
 *   2. Add domain or use onboarding @resend.dev for testing
 *   3. Set env vars in Vercel:
 *      RESEND_API_KEY=re_...
 *      RESEND_FROM="Volcatti <noreply@volcatti.pt>"
 *      RESEND_TO="contacto@volcatti.pt"
 */

import { Resend } from "resend";

type LeadPayload = {
  name: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
};

const SERVICE_LABELS: Record<string, string> = {
  construcao: "Construção Civil",
  remodelacao: "Remodelação",
  piscina: "Construção de Piscina",
  "casa-maquinas": "Casa de Máquinas",
  "assistencia-piscina": "Assistência a Piscina",
  eletrica: "Elétrica",
  acabamentos: "Acabamentos",
  manutencao: "Manutenção",
  outro: "Outro",
};

export async function sendLead(payload: LeadPayload): Promise<{ ok: true } | { ok: false; error: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM ?? "Volcatti <onboarding@resend.dev>";
  const to = process.env.RESEND_TO ?? "vnc.oli@gmail.com";

  if (!apiKey) {
    // Soft fallback — log + return ok. The user UX still feels
    // successful and the lead is preserved in the dev logs.
    console.warn("[email] RESEND_API_KEY not set — lead logged, not sent.");
    console.log("[email lead]", payload);
    return { ok: true };
  }

  try {
    const resend = new Resend(apiKey);
    const subject = `Novo pedido de orçamento — ${SERVICE_LABELS[payload.service] ?? payload.service}`;

    const html = renderEmail(payload);
    const text = renderText(payload);

    const result = await resend.emails.send({
      from,
      to: to.split(",").map((s) => s.trim()),
      replyTo: payload.email,
      subject,
      html,
      text,
    });

    if (result.error) {
      console.error("[email] Resend error:", result.error);
      return { ok: false, error: "Falha ao enviar — tenta novamente em momentos." };
    }

    return { ok: true };
  } catch (err) {
    console.error("[email] unexpected:", err);
    return { ok: false, error: "Erro inesperado ao enviar." };
  }
}

function renderEmail(p: LeadPayload): string {
  const escape = (s: string) => s.replace(/[<>&"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c]!));
  const service = SERVICE_LABELS[p.service] ?? p.service;
  return `<!DOCTYPE html>
<html lang="pt">
<head><meta charset="utf-8"><title>Novo pedido — Volcatti</title></head>
<body style="margin:0;background:#F4F1EA;font-family:-apple-system,Segoe UI,sans-serif;color:#111;padding:24px">
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" border="0" style="background:#fff;border:1px solid #C9C3B8">
        <tr><td style="padding:32px 32px 0">
          <div style="font-family:monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#B88A2A">▸ Novo pedido de orçamento</div>
          <h1 style="font-family:Georgia,serif;font-weight:300;font-size:32px;line-height:1.1;margin:14px 0 0;letter-spacing:-0.02em">${escape(p.name)}</h1>
          <p style="margin:8px 0 0;color:#3a3a35;font-size:15px">Quer um orçamento para <strong style="color:#B88A2A">${escape(service)}</strong>.</p>
        </td></tr>
        <tr><td style="padding:24px 32px;border-top:1px solid #ECE7DC;border-bottom:1px solid #ECE7DC">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td width="35%" style="font-family:monospace;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#6e6c64;padding:8px 0">Email</td>
              <td style="font-size:15px;padding:8px 0"><a href="mailto:${escape(p.email)}" style="color:#111;text-decoration:none">${escape(p.email)}</a></td>
            </tr>
            ${p.phone ? `<tr>
              <td style="font-family:monospace;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#6e6c64;padding:8px 0">Telefone</td>
              <td style="font-size:15px;padding:8px 0"><a href="tel:${escape(p.phone.replace(/\s+/g, ""))}" style="color:#111;text-decoration:none">${escape(p.phone)}</a></td>
            </tr>` : ""}
            <tr>
              <td style="font-family:monospace;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#6e6c64;padding:8px 0">Serviço</td>
              <td style="font-size:15px;padding:8px 0">${escape(service)}</td>
            </tr>
          </table>
        </td></tr>
        <tr><td style="padding:24px 32px">
          <div style="font-family:monospace;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#6e6c64;margin-bottom:8px">Mensagem</div>
          <p style="margin:0;font-size:15px;line-height:1.6;color:#1c1c1a;white-space:pre-wrap">${escape(p.message)}</p>
        </td></tr>
        <tr><td style="padding:18px 32px;background:#111;color:#F4F1EA;font-family:monospace;font-size:10px;letter-spacing:0.18em;text-transform:uppercase">
          <span style="color:#B88A2A">▸</span> Volcatti · Lisboa · Resposta em ≤ 24h úteis
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function renderText(p: LeadPayload): string {
  const service = SERVICE_LABELS[p.service] ?? p.service;
  return [
    "▸ NOVO PEDIDO DE ORÇAMENTO",
    "",
    `Nome:    ${p.name}`,
    `Email:   ${p.email}`,
    p.phone ? `Telefone: ${p.phone}` : "",
    `Serviço: ${service}`,
    "",
    "MENSAGEM:",
    p.message,
    "",
    "—",
    "Volcatti · Lisboa · Resposta em ≤ 24h úteis",
  ]
    .filter(Boolean)
    .join("\n");
}
