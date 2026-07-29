import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { SectionReveal } from "@/components/section-reveal";
import type { Project } from "@/lib/site";

export function NextProject({ project }: { project: Project }) {
  return (
    <SectionReveal className="mt-20 border-t border-border pt-10 sm:mt-28 sm:pt-14" distance={18} amount={0.2}>
      <p className="text-sm text-muted-foreground">Next case study</p>
      <Link
        href={`/projects/${project.slug}`}
        className="group mt-5 flex items-end justify-between gap-6 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <h2 className="text-4xl font-semibold leading-none tracking-[-0.05em] sm:text-6xl">{project.title}</h2>
        <ArrowUpRight className="size-8 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" aria-hidden="true" />
      </Link>
    </SectionReveal>
  );
}
