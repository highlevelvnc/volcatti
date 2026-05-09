import { SERVICES } from "@/lib/constants";
import { renderOG, OG_SIZE } from "@/lib/og";

export const runtime = "edge";
export const contentType = "image/png";
export const size = OG_SIZE;
export const alt = "Serviço Volcatti";

type Props = { params: Promise<{ slug: string }> };

export default async function OG({ params }: Props) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return renderOG({ kicker: "Serviço Volcatti", title: "Serviço não encontrado" });

  return renderOG({
    kicker: `Serviço · N.º ${service.num}`,
    title: service.title,
    meta: [
      { label: "Âmbito", value: service.scope ? `${service.scope.length} fases` : "Completo" },
      { label: "Equipa", value: "Própria" },
      { label: "Zona", value: "Lisboa · PT" },
    ],
  });
}
