import { AboutSection } from "@/components/home/about-section";
import { ContactSection } from "@/components/home/contact-section";
import { ExperienceSection } from "@/components/home/experience-section";
import { HeroSection } from "@/components/home/hero-section";
import { SkillsSection } from "@/components/home/skills-section";
import { WorkSection } from "@/components/home/work-section";
import { JsonLd } from "@/components/json-ld";
import { HomeHeader } from "@/components/layout/site-header";
import {
  absoluteUrl,
  profile,
  siteDescription,
  siteName,
  siteUrl,
  skills,
} from "@/lib/site";

const personId = `${siteUrl}/#person`;
const websiteId = `${siteUrl}/#website`;
const profilePageId = `${siteUrl}/#profile`;

const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: siteUrl,
      name: siteName,
      description: siteDescription,
      inLanguage: "en",
      author: { "@id": personId },
    },
    {
      "@type": "ProfilePage",
      "@id": profilePageId,
      url: siteUrl,
      name: `${profile.name} - Software Engineer Portfolio`,
      description: siteDescription,
      inLanguage: "en",
      isPartOf: { "@id": websiteId },
      mainEntity: { "@id": personId },
    },
    {
      "@type": "Person",
      "@id": personId,
      name: profile.name,
      url: siteUrl,
      image: absoluteUrl(profile.resumePhoto),
      jobTitle: profile.role,
      description: profile.objective,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bandung",
        addressCountry: "ID",
      },
      knowsAbout: skills.flatMap((group) => group.items),
    },
  ],
};

export default function Home() {
  return (
    <main id="top" className="min-h-dvh bg-background text-foreground">
      <JsonLd data={homeJsonLd} />
      <a
        href="#content"
        className="sr-only fixed left-4 top-4 z-[100] rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground focus:not-sr-only"
      >
        Skip to content
      </a>

      <HomeHeader />

      <div id="content">
        <HeroSection />
        <WorkSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ContactSection />
      </div>
    </main>
  );
}
