import { ProjectShowcase } from "@/components/project-showcase";
import { SectionReveal } from "@/components/section-reveal";
import { projects } from "@/lib/site";

export function WorkSection() {
  return (
    <SectionReveal id="work" className="border-y border-border bg-card/45">
      <div className="mx-auto w-full max-w-[1280px] px-4 py-24 sm:px-6 sm:py-28 lg:px-10 lg:py-36">
        <div className="max-w-3xl">
          <h2 className="section-title">Systems shaped by real constraints.</h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground">
            Selected delivery across financial workflows, public products, operations, and ordering systems.
          </p>
        </div>

        <div className="mt-14">
          <ProjectShowcase projects={projects} />
        </div>
      </div>
    </SectionReveal>
  );
}
