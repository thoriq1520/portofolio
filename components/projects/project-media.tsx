import Image from "next/image";
import type { Project } from "@/lib/site";

export function ProjectMedia({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <div className={`project-media project-media--${project.slug}`}>
      {project.cover ? (
        <Image src={project.cover.src} alt={project.cover.alt} fill
          sizes="(min-width: 1024px) 60vw, 100vw" priority={priority}
          className={project.cover.fit === "contain" ? "media-contain" : "media-cover"} />
      ) : (
        <div className="project-wordmark" aria-hidden="true">
          <span>{project.title}</span><span className="project-wordmark-detail">Admin & portal development</span>
        </div>
      )}
    </div>
  );
}
