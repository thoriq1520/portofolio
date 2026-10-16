import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/json-ld";
import { ProjectHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { NextProject } from "@/components/projects/next-project";
import { ProjectCover } from "@/components/projects/project-cover";
import { ProjectDetails } from "@/components/projects/project-details";
import { ProjectOverview } from "@/components/projects/project-overview";
import { absoluteUrl, getProject, ogImage, profile, projects, siteName, siteUrl } from "@/lib/site";

const projectPages = {
  "amc-racing": () => import("@/data/projects/amc-racing.mdx"),
  "teh-poci": () => import("@/data/projects/teh-poci.mdx"),
  datahub: () => import("@/data/projects/datahub.mdx"),
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
    <main id="top" className="min-h-dvh bg-background text-foreground">
      <JsonLd data={projectJsonLd} />
      <a
        href="#project-content"
        className="sr-only fixed left-4 top-4 z-[100] rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground focus:not-sr-only"
      >
        Skip to case study
      </a>

      <ProjectHeader />

      <div id="project-content" className="case-study">
        <ProjectOverview project={project} />
        <ProjectCover project={project} />
        <ProjectDetails project={project}>
          <ProjectBody />
        </ProjectDetails>
        <NextProject project={nextProject} />
        <SiteFooter className="mt-20" />
      </div>
    </main>
  );
}
