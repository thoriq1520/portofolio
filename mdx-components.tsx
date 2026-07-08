import type { MDXComponents } from "mdx/types";
import Link from "next/link";

const baseComponents: MDXComponents = {
  a: ({ href = "#", ...props }) => (
    <Link
      href={href}
      className="text-[var(--accent)] underline underline-offset-4 transition hover:text-white"
      {...props}
    />
  ),
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...baseComponents,
    ...components,
  };
}
