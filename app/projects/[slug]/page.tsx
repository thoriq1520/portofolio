import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, LockKeyhole } from "lucide-react";

import { JsonLd } from "@/components/json-ld";
import { SectionReveal } from "@/components/section-reveal";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { absoluteUrl, getProject, ogImage, profile, projects, siteName, siteUrl } from "@/lib/site";

const projectPages = {
  "ruang-main": () => import("@/data/projects/ruang-main.mdx"),
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
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: project.title, item: canonicalUrl },
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

      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/88 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-[1180px] items-center justify-between px-4 sm:px-6 lg:px-10">
          <Link
            href="/#work"
            className="group flex min-h-11 items-center gap-3 rounded-lg text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ArrowLeft className="size-4 transition-transform duration-200 group-hover:-translate-x-1" aria-hidden="true" />
            All work
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <div id="project-content" className="mx-auto w-full max-w-[1180px] px-4 pb-10 pt-16 sm:px-6 sm:pt-20 lg:px-10 lg:pt-24">
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

        <SectionReveal className="mt-14" distance={18} amount={0.08}>
          <div className="relative aspect-[16/10] overflow-hidden rounded-[1.25rem] border border-border bg-muted sm:aspect-[16/8]">
            <Image
              src="/images/systems-cover.png"
              alt={`${project.title} system architecture visualization`}
              fill
              sizes="(min-width: 1180px) 1100px, 100vw"
              priority
              className="object-cover"
            />
          </div>
        </SectionReveal>

        <div className="mt-16 grid gap-14 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start lg:gap-20">
          <SectionReveal distance={18} amount={0.08}>
            <article className="prose max-w-[760px]">
              <ProjectBody />
            </article>
          </SectionReveal>

          <SectionReveal className="lg:sticky lg:top-24" delay={0.05} distance={18} amount={0.08}>
            <aside className="border-t border-border pt-6">
              <h2 className="text-base font-semibold">Technology</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <li key={item} className="rounded-full border border-border bg-muted/55 px-3 py-2 text-xs text-muted-foreground">
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-10 border-t border-border pt-6">
                <h2 className="text-base font-semibold">Outcome</h2>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{project.result}</p>
              </div>
            </aside>
          </SectionReveal>
        </div>

        <SectionReveal className="mt-20 border-t border-border pt-10 sm:mt-28 sm:pt-14" distance={18} amount={0.2}>
          <p className="text-sm text-muted-foreground">Next case study</p>
          <Link
            href={`/projects/${nextProject.slug}`}
            className="group mt-5 flex items-end justify-between gap-6 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <h2 className="text-4xl font-semibold leading-none tracking-[-0.05em] sm:text-6xl">{nextProject.title}</h2>
            <ArrowUpRight className="size-8 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" aria-hidden="true" />
          </Link>
        </SectionReveal>

        <footer className="mt-20 flex flex-col gap-4 border-t border-border py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {profile.name}</p>
          <a className="transition-colors hover:text-foreground" href={`mailto:${profile.email}`}>Email me</a>
        </footer>
      </div>
    </main>
  );
}
