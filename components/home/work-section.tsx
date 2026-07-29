import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { ProjectShowcase } from "@/components/project-showcase";
import { SectionReveal } from "@/components/section-reveal";
import { projects } from "@/lib/site";

export function WorkSection() {
  const featuredProject = projects.find((project) => project.slug === "ruang-main") ?? projects[0];
  const otherProjects = projects.filter((project) => project.slug !== featuredProject.slug);

  return (
    <SectionReveal id="work" className="border-y border-border bg-card/45">
      <div className="mx-auto w-full max-w-[1280px] px-4 py-24 sm:px-6 sm:py-28 lg:px-10 lg:py-36">
        <div className="max-w-3xl">
          <h2 className="section-title">Systems shaped by real constraints.</h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground">
            Selected delivery across financial workflows, public products, operations, and ordering systems.
          </p>
        </div>

        <Link
          href={`/projects/${featuredProject.slug}`}
          className="group mt-14 block rounded-[1.25rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={`Read ${featuredProject.title} case study`}
        >
          <div className="relative aspect-[16/10] overflow-hidden rounded-[1.25rem] border border-border bg-muted sm:aspect-[16/8]">
            <Image
              src="/images/ruang-main-cover.png"
              alt="Ruang Main browser game platform homepage"
              fill
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.01]"
            />
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-[0.8fr_1.2fr_auto] sm:items-start sm:gap-8">
            <h3 className="text-2xl font-semibold tracking-[-0.04em]">{featuredProject.title}</h3>
            <p className="max-w-2xl text-sm leading-7 text-muted-foreground">{featuredProject.summary}</p>
            <ArrowUpRight className="size-6 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" aria-hidden="true" />
          </div>
        </Link>

        <div className="mt-14">
          <ProjectShowcase projects={otherProjects} />
        </div>
      </div>
    </SectionReveal>
  );
}
