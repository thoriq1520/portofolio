import { SectionReveal } from "@/components/section-reveal";
import type { Project } from "@/lib/site";

type ProjectDetailsProps = { project: Project; children: React.ReactNode };

export function ProjectDetails({ project, children }: ProjectDetailsProps) {
  return (
    <div className="project-details">
      <SectionReveal><article className="prose">{children}</article></SectionReveal>
      <aside className="project-aside">
        <h2>Technology</h2><ul>{project.stack.map(item => <li key={item}>{item}</li>)}</ul>
        <h2>Outcome</h2><p>{project.result}</p>
      </aside>
    </div>
  );
}
