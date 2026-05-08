import { FAQS_HOME } from "@/lib/faqs";

/**
 * Renders FAQPage JSON-LD for the homepage FAQ. Server component —
 * keeps schema in the static HTML for crawlers without bloating client bundle.
 */
export function FaqSchema() {
  const json = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS_HOME.map((q) => ({
      "@type": "Question",
      name: q.q,
      acceptedAnswer: { "@type": "Answer", text: q.a },
    })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}
