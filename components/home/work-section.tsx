import { ProjectShowcase } from "@/components/project-showcase";
import { SectionReveal } from "@/components/section-reveal";
import { projects } from "@/lib/site";

export function WorkSection() {
  return (
    <section id="work" className="work-section page-shell section-space">
      <SectionReveal className="section-heading">
        <h2>Selected work</h2>
        <p>Commerce, outlet operations, enterprise data, and a little play.</p>
      </SectionReveal>
      <ProjectShowcase projects={projects} />
    </section>
  );
}
