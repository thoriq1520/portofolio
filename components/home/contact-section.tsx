import { ArrowUpRight } from "lucide-react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SectionReveal } from "@/components/section-reveal";
import { profile } from "@/lib/site";

export function ContactSection() {
  return (
    <section id="contact" className="contact-section">
      <div className="page-shell">
        <div className="contact-top">
          <SectionReveal distance={110}><h2>Let's talk.</h2></SectionReveal>
          <SectionReveal delay={0.1} className="contact-details">
            <p>Have a project or a role in mind?<br />I'd like to hear about it.</p>
            <a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight aria-hidden="true" /></a>
          </SectionReveal>
        </div>
        <SectionReveal distance={130} amount={0.05}>
          <svg className="footer-wordmark" viewBox="0 0 1280 440" aria-hidden="true" focusable="false">
            <text x="0" y="325" textLength="1280" lengthAdjust="spacingAndGlyphs">Thoriq</text>
          </svg>
        </SectionReveal>
        <SiteFooter showPhone />
      </div>
    </section>
  );
}
