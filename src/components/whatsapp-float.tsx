import { WHATSAPP_URL } from "@/lib/constants";
import { WhatsAppIcon } from "./icons";

export function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener"
      aria-label="Falar pelo WhatsApp"
      className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-[80] w-14 h-14 inline-flex items-center justify-center rounded-full text-white transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:scale-105"
      style={{ background: "#25D366", boxShadow: "0 8px 30px rgba(37, 211, 102, 0.35)" }}
    >
      <WhatsAppIcon className="w-[22px] h-[22px]" />
      <span className="absolute inset-0 -z-[1] rounded-full wa-pulse" style={{ background: "#25D366" }} />
    </a>
  );
}
