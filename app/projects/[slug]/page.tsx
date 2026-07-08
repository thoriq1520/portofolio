import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { getProject, profile, projects } from "@/lib/site";

const projectPages = {
  "new-los": () => import("@/data/projects/new-los.mdx"),
  esuite: () => import("@/data/projects/esuite.mdx"),
  "workshop-management-system": () => import("@/data/projects/workshop-management-system.mdx"),
  "ordering-platform": () => import("@/data/projects/ordering-platform.mdx"),
  "nobu-link-portal": () => import("@/data/projects/nobu-link-portal.mdx"),
} as const;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const loader = projectPages[slug as keyof typeof projectPages];

  if (!loader) {
    notFound();
  }

  const { default: ProjectBody } = await loader();

  return (
    <main className="min-h-[100dvh] bg-[var(--background)] px-4 py-10 text-[var(--foreground)] sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-4xl items-center justify-end">
        <ThemeToggle />
      </div>
      <div className="mx-auto max-w-4xl">
        <Button
          variant="outline"
          render={<Link href="/#work" />}
          className="mb-8 h-10 rounded-2xl border-[var(--line)] bg-transparent px-4 text-[var(--foreground)] hover:bg-white/6"
        >
          <ArrowLeft className="size-4" weight="bold" />
          Back to work
        </Button>

        <section className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--accent-soft)]">
            {project.role}
          </p>
          <h1 className="mt-4 text-4xl leading-[0.98] tracking-[-0.05em] text-[var(--foreground)] sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--muted)]">
            {project.summary}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-soft)] p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">Year</p>
              <p className="mt-2 text-[var(--foreground)]">{project.year}</p>
            </div>
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-soft)] p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">Role</p>
              <p className="mt-2 text-[var(--foreground)]">{project.role}</p>
            </div>
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-soft)] p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">Availability</p>
              <p className="mt-2 text-[var(--foreground)]">Private delivery</p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3 py-1 text-xs text-[var(--accent-soft)]"
              >
                {item}
              </span>
            ))}
          </div>

          <article className="prose mt-10 max-w-none">
            <ProjectBody />
          </article>

          <div className="mt-10 flex flex-wrap gap-3 border-t border-[var(--line)] pt-6">
            <Button
              render={<Link href={`mailto:${profile.email}`} />}
              className="h-11 rounded-2xl bg-[var(--accent)] px-5 text-black hover:bg-[var(--accent-soft)]"
            >
              Contact Me
              <ArrowUpRight className="size-4" weight="bold" />
            </Button>
            <Button
              variant="outline"
              render={<Link href="/#contact" />}
              className="h-11 rounded-2xl border-[var(--line)] bg-transparent px-5 text-[var(--foreground)] hover:bg-white/6"
            >
              More contact options
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
