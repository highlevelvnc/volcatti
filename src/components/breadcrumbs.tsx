import Link from "next/link";
import { COMPANY } from "@/lib/constants";

type Crumb = { label: string; href?: string };
type Props = { items: Crumb[]; light?: boolean };

/**
 * Breadcrumbs with both visual rendering AND SEO BreadcrumbList JSON-LD
 * structured data. Last item is the current page (no link).
 */
export function Breadcrumbs({ items, light = false }: Props) {
  const base = COMPANY.url.replace(/\/$/, "");
  const json = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${base}${item.href}` } : {}),
    })),
  };

  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className="font-mono text-[0.65rem] tracking-[0.18em] uppercase"
      >
        <ol className="flex flex-wrap items-center gap-1.5">
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            const cls = light
              ? isLast
                ? "text-bronze"
                : "text-offwhite/55"
              : isLast
                ? "text-bronze"
                : "text-graphite/55";
            return (
              <li key={`${item.label}-${i}`} className="inline-flex items-center gap-1.5">
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className={`${cls} hover:text-bronze transition-colors duration-300`}
                    data-cursor="Voltar"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className={cls}>{item.label}</span>
                )}
                {!isLast && <span className={light ? "text-offwhite/30" : "text-graphite/30"}>/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
    </>
  );
}
