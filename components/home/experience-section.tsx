import { SectionReveal } from "@/components/section-reveal";
import { experience } from "@/lib/site";

export function ExperienceSection() {
  return (
    <section id="experience" className="experience-section page-shell section-space">
      <SectionReveal className="section-heading"><h2>Experience</h2><p>Teams, assignments, and the work in between.</p></SectionReveal>
      <div className="experience-list">
        {experience.map(item => (
          <SectionReveal key={`${item.company}-${item.role}`} distance={80}>
            <article className="experience-item">
              <div className="experience-company"><h3>{item.company}</h3><p>{item.role} · {item.engagement}</p><p className="experience-period">{item.period}</p></div>
              <div className="experience-description"><p>{item.summary}</p><ul>{item.details.map(detail => <li key={detail}>{detail}</li>)}</ul></div>
            </article>
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}
