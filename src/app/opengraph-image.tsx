import { renderOG, OG_SIZE } from "@/lib/og";

export const runtime = "edge";
export const contentType = "image/png";
export const size = OG_SIZE;
export const alt = "Volcatti — Construção, Remodelação, Piscinas e Elétrica";

export default async function OG() {
  return renderOG({
    kicker: "Construção & Remodelação Premium",
    title: "Construção, Remodelação, Piscinas e Elétrica.",
  });
}
