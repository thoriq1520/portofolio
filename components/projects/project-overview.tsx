import { ArrowUpRight } from "lucide-react";
import { SectionReveal } from "@/components/section-reveal";
import type { Project } from "@/lib/site";

export function ProjectOverview({ project }: { project: Project }) {
  return (
    <SectionReveal className="project-overview" distance={80} amount={0.01}>
      <h1>{project.title}</h1>
      <p className="project-intro">{project.summary}</p>
      <dl className="project-facts">
        <div><dt>Period</dt><dd>{project.period}</dd></div>
        <div><dt>Role</dt><dd>{project.role}</dd></div>
        <div><dt>Organization</dt><dd>{project.organization}</dd></div>
        <div><dt>Engagement</dt><dd>{project.engagement}</dd></div>
      </dl>
      {project.links.live ? <a href={project.links.live} target="_blank" rel="noreferrer" className="action-link">Visit live product <ArrowUpRight aria-hidden="true" /></a> : null}
    </SectionReveal>
  );
}
