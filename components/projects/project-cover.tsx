import Image from "next/image";

import { SectionReveal } from "@/components/section-reveal";
import type { Project } from "@/lib/site";

export function ProjectCover({ project }: { project: Project }) {
  if (project.slug !== "ruang-main") return null;

  return (
    <SectionReveal className="mt-14" distance={18} amount={0.08}>
      <div className="relative aspect-[16/10] overflow-hidden rounded-[1.25rem] border border-border bg-muted sm:aspect-[16/8]">
        <Image
          src="/images/ruang-main-cover.png"
          alt="Ruang Main browser game platform homepage"
          fill
          sizes="(min-width: 1180px) 1100px, 100vw"
          priority
          className="object-cover"
        />
      </div>
    </SectionReveal>
  );
}
