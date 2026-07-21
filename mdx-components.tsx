import type { MDXComponents } from "mdx/types";
import Link from "next/link";

const baseComponents: MDXComponents = {
  a: ({ href = "#", ...props }) => (
    <Link
      href={href}
      className="font-medium text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:text-primary/75"
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
