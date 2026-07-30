import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Gamepad2,
  Landmark,
  Server,
  ShieldCheck,
  ShoppingCart,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Project } from "@/lib/site";

const projectIcons: Record<string, LucideIcon> = {
  "ruang-main": Gamepad2,
  "new-los": ShieldCheck,
  esuite: Server,
  "workshop-management-system": Wrench,
  "ordering-platform": ShoppingCart,
  "nobu-link-portal": Landmark,
};

export function ProjectShowcase({ projects }: { projects: Project[] }) {
  return (
    <div className="divide-y divide-border border-y border-border">
      {projects.map((project) => {
        const Icon = projectIcons[project.slug] ?? Code2;

        return (
          <article
            key={project.slug}
            className="grid items-center gap-6 py-7 sm:px-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)_auto] md:py-8"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-16 shrink-0 items-center justify-center rounded-xl border border-border bg-muted text-foreground">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h3 className="text-lg font-semibold tracking-[-0.025em]">{project.title}</h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {project.role} / {project.year}
                </p>
              </div>
            </div>

            <p className="max-w-2xl text-lg font-medium leading-7 tracking-[-0.02em] sm:text-xl sm:leading-8">
              {project.summary}
            </p>

            <Button
              nativeButton={false}
              variant="outline"
              render={
                <Link
                  href={`/projects/${project.slug}`}
                  aria-label={`View ${project.title} project`}
                />
              }
              className="w-fit rounded-full md:ml-auto"
            >
              View project
              <ArrowRight aria-hidden="true" />
            </Button>
          </article>
        );
      })}
    </div>
  );
}
