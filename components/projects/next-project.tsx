import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionReveal } from "@/components/section-reveal";
import type { Project } from "@/lib/site";

export function NextProject({ project }: { project: Project }) {
  return <SectionReveal className="next-project"><Link href={`/projects/${project.slug}`}>
    <span><span className="next-project-label">Next project</span><span className="next-project-title">{project.title}</span></span>
    <ArrowUpRight aria-hidden="true" />
  </Link></SectionReveal>;
}
