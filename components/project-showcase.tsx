"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ProjectMedia } from "@/components/projects/project-media";
import { SectionReveal } from "@/components/section-reveal";
import type { Project } from "@/lib/site";

function FeaturedProject({ project }: { project: Project }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [56, 0, -56]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.88, 1, 0.94]);

  return (
    <article ref={ref} className={`project-feature project-feature--${project.slug}`}>
      <div className="project-copy">
        <SectionReveal distance={100}>
          <h3>{project.title}</h3>
          <p className="project-summary">{project.summary}</p>
        </SectionReveal>
        <SectionReveal delay={0.08} distance={64}>
          <p className="project-meta">{project.role}<br />{project.organization} · {project.engagement}<br />{project.period}</p>
          <Link href={`/projects/${project.slug}`} className="text-link" aria-label={`Explore ${project.title}`}>
            Explore project <ArrowUpRight aria-hidden="true" />
          </Link>
        </SectionReveal>
      </div>
      <m.div className="project-visual" style={{ y: reduced ? 0 : y, scale: reduced ? 1 : scale }}>
        <Link href={`/projects/${project.slug}`} aria-label={`View ${project.title} case study`} className="project-image-link">
          <ProjectMedia project={project} />
        </Link>
      </m.div>
    </article>
  );
}

export function ProjectShowcase({ projects }: { projects: Project[] }) {
  return (
    <>
      <div className="featured-projects">{projects.slice(0, 4).map(project => <FeaturedProject key={project.slug} project={project} />)}</div>
      <SectionReveal className="project-archive">
        <h2>More experience</h2>
        <div className="project-index">
          {projects.slice(4).map(project => (
            <Link key={project.slug} href={`/projects/${project.slug}`}>
              <span>{project.title}</span><ArrowUpRight aria-hidden="true" />
            </Link>
          ))}
        </div>
      </SectionReveal>
    </>
  );
}
