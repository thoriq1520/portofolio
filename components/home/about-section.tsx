import Image from "next/image";
import { SectionReveal } from "@/components/section-reveal";
import { profile } from "@/lib/site";

export function AboutSection() {
  return (
    <section id="about" className="about-section page-shell section-space">
      <div className="about-portrait">
        <SectionReveal distance={90}>
          <div className="portrait-frame"><Image src={profile.resumePhoto} alt={`${profile.name}, software engineer`} fill sizes="(min-width: 1024px) 28vw, 70vw" className="object-cover object-[center_34%]" /></div>
        </SectionReveal>
      </div>
      <div className="about-copy">
        <SectionReveal><h2>Behind the work</h2></SectionReveal>
        <SectionReveal delay={0.08}><p className="about-statement">I build the parts people use and the systems behind them, from online stores and daily operations to enterprise data and browser games.</p></SectionReveal>
        <SectionReveal delay={0.16}><p className="about-description">Based in Bandung, my experience spans backend and full-stack development, with hands-on quality assurance for financing workflows. I like work where the interface, business rules, and data have to make sense together.</p></SectionReveal>
        <SectionReveal delay={0.2} className="about-facts">
          <div><p>Development</p><p>Backend & full stack</p></div>
          <div><p>Validation</p><p>Manual & integration testing</p></div>
        </SectionReveal>
      </div>
    </section>
  );
}
