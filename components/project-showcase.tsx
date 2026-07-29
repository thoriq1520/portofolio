import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type Project = {
  slug: string;
  title: string;
  summary: string;
  role: string;
  year: string;
  stack: string[];
};

export function ProjectShowcase({ projects }: { projects: Project[] }) {
  return (
    <div className="border-t border-border">
      {projects.map((project) => (
        <Link
          key={project.slug}
          href={`/projects/${project.slug}`}
          aria-label={`Read ${project.title} case study`}
          className="group grid min-h-40 gap-5 border-b border-border py-7 transition-colors duration-200 hover:bg-muted/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:px-5 sm:-mx-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(20rem,1.1fr)_auto] lg:items-center"
        >
          <div>
            <p className="text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
              {project.title}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {project.role} / {project.year}
            </p>
          </div>

          <div>
            <p className="max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
              {project.summary}
            </p>
            <p className="mt-3 text-xs leading-6 text-muted-foreground">
              {project.stack.slice(0, 4).join(", ")}
            </p>
          </div>

          <ArrowUpRight
            className="size-6 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary"
            aria-hidden="true"
          />
        </Link>
      ))}
    </div>
  );
}
