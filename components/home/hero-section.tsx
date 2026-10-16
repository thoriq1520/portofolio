import { ArrowDownRight } from "lucide-react";
import { profile } from "@/lib/site";
import { HeroName } from "@/components/home/hero-name";

export function HeroSection() {
  return (
    <section className="hero page-shell" aria-label="Introduction">
      <div className="hero-top">
        <div className="hero-introduction">
          <p>Software engineer working across backend, full-stack products, and quality assurance.</p>
        </div>
        <p className="hero-location">Based in Bandung, Indonesia.<br />Building for the browser and beyond.</p>
      </div>
      <HeroName />
      <div className="hero-bottom">
        <div><p>{profile.name}</p><p>Software Engineer</p></div>
        <a className="action-link" href="#work">View selected work <ArrowDownRight aria-hidden="true" /></a>
      </div>
    </section>
  );
}
