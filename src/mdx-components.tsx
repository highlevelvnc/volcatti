import type { MDXComponents } from "mdx/types";

/**
 * Required by Next.js when using @next/mdx in the App Router.
 * Returns the components used to render MDX. We pass through defaults —
 * styling lives in the `.legal-prose` class wrapper around the MDX body.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...components };
}
