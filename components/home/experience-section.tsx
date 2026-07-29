import { SectionReveal } from "@/components/section-reveal";
import { experience } from "@/lib/site";

export function ExperienceSection() {
  return (
    <SectionReveal id="experience" className="mx-auto w-full max-w-[1280px] px-4 py-24 sm:px-6 sm:py-28 lg:px-10 lg:py-36">
      <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="section-title">Across build, integration, and validation.</h2>
          <p className="mt-6 max-w-md text-base leading-8 text-muted-foreground">
            Experience across implementation, maintenance, integration, and critical-path testing.
          </p>
        </div>
        <div className="border-t border-border">
          {experience.map((item) => (
            <article key={`${item.company}-${item.role}`} className="border-b border-border py-9 sm:py-11">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                <h3 className="text-2xl font-semibold tracking-[-0.035em]">{item.role}</h3>
                <p className="shrink-0 text-sm text-muted-foreground">{item.period}</p>
              </div>
              <p className="mt-2 text-sm font-medium text-primary">{item.company}</p>
              <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">{item.summary}</p>
              <ul className="mt-6 grid gap-3 text-sm leading-7 text-muted-foreground sm:grid-cols-2">
                {item.details.map((detail) => <li key={detail} className="pr-5">{detail}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
