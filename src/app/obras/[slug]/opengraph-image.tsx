import { GALLERY, GALLERY_FILTERS } from "@/lib/constants";
import { renderOG, OG_SIZE } from "@/lib/og";

export const runtime = "edge";
export const contentType = "image/png";
export const size = OG_SIZE;
export const alt = "Obra Volcatti";

type Props = { params: Promise<{ slug: string }> };

export default async function OG({ params }: Props) {
  const { slug } = await params;
  const obra = GALLERY.find((g) => g.slug === slug);
  if (!obra) return renderOG({ kicker: "Obra Volcatti", title: "Obra não encontrada" });

  const cat = GALLERY_FILTERS.find((f) => f.value === obra.cat)?.label ?? "Obra";
  return renderOG({
    kicker: `${cat} · ${obra.location}`,
    title: obra.title,
    meta: [
      ...(obra.area ? [{ label: "Área", value: obra.area }] : []),
      ...(obra.year ? [{ label: "Ano", value: obra.year }] : []),
      ...(obra.duration ? [{ label: "Duração", value: obra.duration }] : []),
    ],
  });
}
