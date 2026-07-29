import Image from "next/image";
import { ArrowDownRight, ArrowUpRight, Mail } from "lucide-react";

import { JsonLd } from "@/components/json-ld";
import { MobileNav } from "@/components/mobile-nav";
import { ProjectShowcase } from "@/components/project-showcase";
import { SectionReveal } from "@/components/section-reveal";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  absoluteUrl,
  experience,
  profile,
  projects,
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

const navItems = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Stack", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

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

      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/88 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-10">
          <a
            href="#top"
            className="group flex min-h-11 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Back to top"
          >
            <span className="grid size-9 place-items-center rounded-full bg-foreground text-xs font-bold tracking-[-0.04em] text-background transition-transform duration-200 group-hover:rotate-6">
              TF
            </span>
            <span className="hidden text-sm font-semibold tracking-tight sm:block">
              Thoriq F. Ajiji
            </span>
          </a>

          <div className="flex items-center gap-2">
            <nav aria-label="Primary navigation" className="mr-2 hidden items-center lg:flex">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="inline-flex h-11 items-center rounded-lg px-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <ThemeToggle />
            <MobileNav />
          </div>
        </div>
      </header>

      <div id="content">
        <section className="border-b border-border">
          <div className="mx-auto grid min-h-[calc(100dvh-4rem)] w-full max-w-[1280px] items-center gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.08fr_0.92fr] lg:px-10 lg:py-24">
            <SectionReveal className="max-w-4xl" delay={0.08} distance={24} amount={0.01}>
              <p className="eyebrow">Software engineer</p>
              <h1 className="display-title mt-7">Reliable systems, from backend to browser.</h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-muted-foreground sm:text-xl sm:leading-9">
                I build dependable software across backend, full-stack delivery, and quality assurance.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button nativeButton={false} size="lg" render={<a href="#work" />} className="rounded-full">
                  View work
                  <ArrowDownRight aria-hidden="true" />
                </Button>
                <Button
                  nativeButton={false}
                  size="lg"
                  variant="outline"
                  render={<a href={`mailto:${profile.email}`} />}
                  className="rounded-full"
                >
                  <Mail aria-hidden="true" />
                  Email me
                </Button>
              </div>
            </SectionReveal>

            <SectionReveal
              className="mx-auto w-full max-w-[500px] lg:justify-self-end"
              delay={0.16}
              distance={24}
              amount={0.01}
            >
              <div className="overflow-hidden rounded-[1.25rem] bg-card">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={profile.resumePhoto}
                    alt={`${profile.name}, software engineer`}
                    fill
                    sizes="(min-width: 1024px) 38vw, 92vw"
                    priority
                    className="object-cover object-[center_34%] saturate-[0.9]"
                  />
                </div>
              </div>
              <div className="mt-4 flex items-start justify-between gap-5 border-t border-border pt-4 text-sm">
                <p className="font-medium">{profile.name}</p>
                <p className="max-w-56 text-right leading-6 text-muted-foreground">
                  Backend, full-stack, and QA engineering
                </p>
              </div>
            </SectionReveal>
          </div>
        </section>

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

        <SectionReveal id="work" className="border-y border-border bg-card/45">
          <div className="mx-auto w-full max-w-[1280px] px-4 py-24 sm:px-6 sm:py-28 lg:px-10 lg:py-36">
            <div className="max-w-3xl">
              <h2 className="section-title">Systems shaped by real constraints.</h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground">
                Selected delivery across financial workflows, public products, operations, and ordering systems.
              </p>
            </div>
            <div className="relative mt-14 aspect-[16/10] overflow-hidden rounded-[1.25rem] border border-border bg-muted sm:aspect-[16/8]">
              <Image
                src="/images/systems-cover.png"
                alt="Abstract visualization of connected software system modules"
                fill
                sizes="(min-width: 1280px) 1200px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="mt-14">
              <ProjectShowcase projects={projects} />
            </div>
          </div>
        </SectionReveal>

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

        <SectionReveal id="contact" className="mx-auto w-full max-w-[1280px] px-4 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-32">
          <div className="rounded-[1.25rem] bg-primary p-7 text-primary-foreground sm:p-10 lg:p-14">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <h2 className="max-w-4xl text-4xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
                Let&apos;s build something dependable.
              </h2>
              <div className="lg:justify-self-end">
                <p className="max-w-md text-base leading-8 opacity-80">
                  Open to software engineering opportunities where reliability and clear delivery matter.
                </p>
                <Button
                  nativeButton={false}
                  size="lg"
                  render={<a href={`mailto:${profile.email}`} />}
                  className="mt-7 rounded-full bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                >
                  Email me
                  <ArrowUpRight aria-hidden="true" />
                </Button>
              </div>
            </div>
          </div>
          <footer className="mt-10 flex flex-col gap-5 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 {profile.name}</p>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              <a className="transition-colors hover:text-foreground" href={`mailto:${profile.email}`}>{profile.email}</a>
              <a className="transition-colors hover:text-foreground" href={`tel:${profile.phone}`}>{profile.phone}</a>
            </div>
          </footer>
        </SectionReveal>
      </div>
    </main>
  );
}
