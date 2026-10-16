import { SectionReveal } from "@/components/section-reveal";
import { skills } from "@/lib/site";

export function SkillsSection() {
  return (
    <section id="skills" className="skills-section section-space">
      <div className="page-shell">
        <SectionReveal className="section-heading"><h2>A practical stack</h2><p>The tools behind the work.</p></SectionReveal>
        <div className="skills-list">{skills.map((group, index) => (
          <SectionReveal key={group.category} delay={index * 0.06} distance={88}>
            <h3>{group.category}</h3><ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul>
          </SectionReveal>
        ))}</div>
      </div>
    </section>
  );
}
