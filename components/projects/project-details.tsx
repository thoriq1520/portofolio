import { SectionReveal } from "@/components/section-reveal";
import type { Project } from "@/lib/site";

type ProjectDetailsProps = {
  project: Project;
  children: React.ReactNode;
};

export function ProjectDetails({ project, children }: ProjectDetailsProps) {
  return (
    <div className="mt-16 grid gap-14 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start lg:gap-20">
      <SectionReveal distance={18} amount={0.08}>
        <article className="prose max-w-[760px]">{children}</article>
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
  );
}
