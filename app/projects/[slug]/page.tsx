import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, BriefcaseBusiness, CalendarDays, LockKeyhole } from "lucide-react";

import { JsonLd } from "@/components/json-ld";
import { SectionReveal } from "@/components/section-reveal";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { absoluteUrl, getProject, ogImage, profile, projects, siteName, siteUrl } from "@/lib/site";

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
    return { title: "Project not found", robots: { index: false, follow: false } };
  }

  const canonicalPath = `/projects/${project.slug}`;
  const pageTitle = `${project.title} Case Study`;

  return {
    title: pageTitle,
    description: project.summary,
    keywords: [project.title, `${project.title} case study`, project.role, ...project.stack],
    alternates: { canonical: canonicalPath },
    openGraph: {
      title: `${pageTitle} | ${profile.name}`,
      description: project.summary,
      url: canonicalPath,
      siteName,
      locale: "en_US",
      type: "article",
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${project.title} case study`, type: "image/webp" }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${pageTitle} | ${profile.name}`,
      description: project.summary,
      images: [{ url: ogImage, alt: `${project.title} case study` }],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  const loader = projectPages[slug as keyof typeof projectPages];

  if (!project || !loader) notFound();

  const canonicalUrl = absoluteUrl(`/projects/${project.slug}`);
  const projectJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${canonicalUrl}#project`,
        url: canonicalUrl,
        name: project.title,
        headline: `${project.title} Case Study`,
        description: project.summary,
        abstract: project.problem,
        image: absoluteUrl(ogImage),
        genre: "Software engineering case study",
        inLanguage: "en",
        keywords: project.stack,
        author: { "@id": `${siteUrl}/#person` },
        isPartOf: { "@id": `${siteUrl}/#website` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: project.title,
            item: canonicalUrl,
          },
        ],
      },
    ],
  };



  const { default: ProjectBody } = await loader();
  const projectIndex = projects.findIndex((item) => item.slug === slug);
  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <JsonLd data={projectJsonLd} />
      <a
        href="#project-content"
        className="sr-only fixed left-4 top-4 z-[100] rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground focus:not-sr-only"
      >
        Skip to case study
      </a>

      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/82 backdrop-blur-xl">
        <div className="mx-auto flex h-20 w-full max-w-[1180px] items-center justify-between px-4 sm:px-6 lg:px-10">
          <Link
            href="/#work"
            className="group flex min-h-11 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="grid size-10 place-items-center rounded-full bg-foreground text-sm font-bold text-background">TF</span>
            <span className="hidden text-sm font-semibold tracking-tight sm:block">Selected work</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <div id="project-content" className="mx-auto w-full max-w-[1180px] px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-20">
        <Link
          href="/#work"
          className="inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to selected work
        </Link>

        <SectionReveal className="relative mt-10 overflow-hidden rounded-[1.5rem] border border-border bg-card p-6 shadow-sm sm:p-10 lg:p-14" delay={0.38} distance={30} amount={0.01}>
          <div className="absolute right-0 top-0 size-72 translate-x-1/3 -translate-y-1/3 rounded-full bg-primary/12 blur-3xl" />
          <div className="relative">
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
              <span className="text-primary">Case study 0{projectIndex + 1}</span>
              <span aria-hidden="true">/</span>
              <span>{project.role}</span>
            </div>
            <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[0.9] tracking-[-0.065em] sm:text-7xl lg:text-8xl">
              {project.title}
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl sm:leading-9">
              {project.summary}
            </p>

            <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
              <div className="bg-background p-5 sm:p-6">
                <CalendarDays className="size-5 text-primary" aria-hidden="true" />
                <p className="mt-5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">Timeline</p>
                <p className="mt-2 text-sm font-semibold">{project.year}</p>
              </div>
              <div className="bg-background p-5 sm:p-6">
                <BriefcaseBusiness className="size-5 text-primary" aria-hidden="true" />
                <p className="mt-5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">Role</p>
                <p className="mt-2 text-sm font-semibold">{project.role}</p>
              </div>
              <div className="bg-background p-5 sm:p-6">
                <LockKeyhole className="size-5 text-primary" aria-hidden="true" />
                <p className="mt-5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">Access</p>
                <p className="mt-2 text-sm font-semibold">Private delivery</p>
              </div>
            </div>
          </div>
        </SectionReveal>

        <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
          <SectionReveal distance={18} amount={0.08}>
            <Card className="border-border bg-card py-0 shadow-sm ring-0">
              <CardContent className="p-6 sm:p-10 lg:p-12">
                <article className="prose max-w-none">
                  <ProjectBody />
                </article>
              </CardContent>
            </Card>
          </SectionReveal>

          <SectionReveal className="lg:sticky lg:top-25 lg:self-start" delay={0.05} distance={18} amount={0.08}>
            <aside className="space-y-5">
              <Card className="border-border bg-card py-0 shadow-sm ring-0">
                <CardContent className="p-6">
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">Technology</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <li key={item} className="rounded-full border border-border bg-muted px-3 py-2 text-xs font-medium text-muted-foreground">
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 bg-primary py-0 text-primary-foreground shadow-sm ring-0">
                <CardContent className="p-6">
                  <p className="font-mono text-xs uppercase tracking-[0.14em] opacity-70">Interested?</p>
                  <p className="mt-4 text-xl font-semibold leading-snug tracking-[-0.03em]">
                    Let&apos;s talk about what you&apos;re building.
                  </p>
                  <Button
                    nativeButton={false}
                    render={<a href={`mailto:${profile.email}`} />}
                    className="mt-6 w-full bg-white text-slate-950 hover:bg-white/90"
                  >
                    Email me
                    <ArrowUpRight aria-hidden="true" />
                  </Button>
                </CardContent>
              </Card>
            </aside>
          </SectionReveal>
        </div>

        <SectionReveal className="mt-20 border-t border-border pt-10 sm:mt-28 sm:pt-14" distance={18} amount={0.2}>
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">Next case study</p>
          <Link
            href={`/projects/${nextProject.slug}`}
            className="group mt-5 flex items-end justify-between gap-6 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <h2 className="text-4xl font-semibold leading-none tracking-[-0.05em] sm:text-6xl">{nextProject.title}</h2>
            <ArrowUpRight className="size-8 shrink-0 text-muted-foreground transition-all duration-200 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" aria-hidden="true" />
          </Link>
        </SectionReveal>

        <footer className="mt-20 flex flex-col gap-4 border-t border-border py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {profile.name}</p>
          <Link className="transition-colors hover:text-foreground" href="/#top">Back to portfolio</Link>
        </footer>
      </div>
    </main>
  );
}
