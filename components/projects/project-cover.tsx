import { SectionReveal } from "@/components/section-reveal";
import { ProjectMedia } from "@/components/projects/project-media";
import type { Project } from "@/lib/site";

export function ProjectCover({ project }: { project: Project }) {
  if (!project.cover) return null;
  return <SectionReveal className="project-cover" distance={100}><ProjectMedia project={project} priority /></SectionReveal>;
}
