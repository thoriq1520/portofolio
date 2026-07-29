import { SectionReveal } from "@/components/section-reveal";
import { profile } from "@/lib/site";

const capabilities = [
  {
    title: "Backend engineering",
    text: "APIs, services, and data flows designed for dependable delivery.",
  },
  {
    title: "Full-stack delivery",
    text: "Product interfaces connected cleanly to the systems behind them.",
  },
  {
    title: "Quality assurance",
    text: "Critical workflows tested from business requirement to release.",
  },
];

export function AboutSection() {
  return (
    <SectionReveal id="about" className="mx-auto w-full max-w-[1280px] px-4 py-24 sm:px-6 sm:py-28 lg:px-10 lg:py-36">
      <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
        <h2 className="section-title">The whole product stays in view.</h2>
        <div>
          <p className="max-w-3xl text-xl font-medium leading-9 tracking-[-0.02em] sm:text-2xl sm:leading-10">
            {profile.objective}
          </p>
          <div className="mt-14 grid border-t border-border sm:grid-cols-3">
            {capabilities.map((item) => (
              <div key={item.title} className="border-b border-border py-7 sm:border-b-0 sm:pr-7 sm:not-first:pl-7">
                <h3 className="text-base font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
