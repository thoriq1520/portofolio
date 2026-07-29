import { SectionReveal } from "@/components/section-reveal";
import { skills } from "@/lib/site";

export function SkillsSection() {
  return (
    <SectionReveal id="skills" className="border-y border-border bg-card/45">
      <div className="mx-auto w-full max-w-[1280px] px-4 py-24 sm:px-6 sm:py-28 lg:px-10 lg:py-36">
        <div className="max-w-3xl">
          <h2 className="section-title">Tools follow the problem.</h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground">
            A practical stack for backend systems, interfaces, data, testing, and delivery.
          </p>
        </div>
        <div className="mt-14 grid border-t border-border sm:grid-cols-2 lg:grid-cols-[1.15fr_1fr_.9fr_1.15fr_.8fr]">
          {skills.map((group) => (
            <div key={group.category} className="border-b border-border py-7 sm:pr-7 lg:border-b-0 lg:not-first:border-l lg:not-first:px-6">
              <h3 className="text-base font-semibold">{group.category}</h3>
              <ul className="mt-5 space-y-2.5 text-sm leading-6 text-muted-foreground">
                {group.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
