import { ArrowUpRight, LockKeyhole } from "lucide-react";

import { SectionReveal } from "@/components/section-reveal";
import { Button } from "@/components/ui/button";
import type { Project } from "@/lib/site";

export function ProjectOverview({ project }: { project: Project }) {
  return (
    <SectionReveal distance={22} amount={0.01}>
      <div className="max-w-4xl">
        <p className="eyebrow">Case study</p>
        <h1 className="mt-7 text-5xl font-semibold leading-[0.94] tracking-[-0.06em] sm:text-7xl lg:text-8xl">
          {project.title}
        </h1>
        <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl sm:leading-9">
          {project.summary}
        </p>
      </div>

      <div className="mt-12 grid border-y border-border sm:grid-cols-3">
        <div className="border-b border-border py-5 sm:border-b-0 sm:pr-6">
          <p className="text-xs text-muted-foreground">Period</p>
          <p className="mt-2 text-sm font-semibold">{project.year}</p>
        </div>
        <div className="border-b border-border py-5 sm:border-b-0 sm:border-l sm:px-6">
          <p className="text-xs text-muted-foreground">Role</p>
          <p className="mt-2 text-sm font-semibold">{project.role}</p>
        </div>
        <div className="py-5 sm:border-l sm:pl-6">
          <p className="text-xs text-muted-foreground">Access</p>
          <p className="mt-2 flex items-center gap-2 text-sm font-semibold">
            {project.links.live ? <ArrowUpRight className="size-4 text-primary" aria-hidden="true" /> : <LockKeyhole className="size-4 text-primary" aria-hidden="true" />}
            {project.links.live ? "Live product" : "Private delivery"}
          </p>
        </div>
      </div>

      {project.links.live ? (
        <Button
          nativeButton={false}
          size="lg"
          render={<a href={project.links.live} target="_blank" rel="noreferrer" />}
          className="mt-8 rounded-full"
        >
          Visit live product
          <ArrowUpRight aria-hidden="true" />
        </Button>
      ) : null}
    </SectionReveal>
  );
}
