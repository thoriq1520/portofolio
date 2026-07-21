import Image from "next/image";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle2,
  Database,
  Mail,
  MapPin,
} from "lucide-react";

import { JsonLd } from "@/components/json-ld";
import { MobileNav } from "@/components/mobile-nav";
import { SectionReveal } from "@/components/section-reveal";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { absoluteUrl, experience, profile, projects, siteDescription, siteName, siteUrl, skills } from "@/lib/site";

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

      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/82 backdrop-blur-xl">
        <div className="mx-auto flex h-20 w-full max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-10">
          <a
            href="#top"
            className="group flex min-h-11 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Back to top"
          >
            <span className="grid size-10 place-items-center rounded-full bg-foreground text-sm font-bold tracking-[-0.04em] text-background transition-transform duration-200 group-hover:rotate-6">
              TF
            </span>
            <span className="hidden text-sm font-semibold tracking-tight sm:block">
              Thoriq F. Ajiji
            </span>
          </a>

          <div className="flex items-center gap-2">
            <nav aria-label="Primary navigation" className="mr-3 hidden items-center gap-1 lg:flex">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="inline-flex h-11 items-center rounded-lg px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
        <section className="relative overflow-hidden border-b border-border">
          <div className="pointer-events-none absolute left-[8%] top-20 -z-0 size-[28rem] rounded-full bg-primary/10 blur-[110px]" />
          <div className="relative mx-auto grid min-h-[calc(100dvh-5rem)] w-full max-w-[1280px] items-center gap-14 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.18fr_0.82fr] lg:px-10 lg:py-24">
            <SectionReveal className="max-w-4xl" delay={0.38} distance={32} amount={0.01}>
              <div className="eyebrow">Available for new opportunities</div>
              <h1 className="display-title mt-8">
                I build systems that <span className="text-primary">hold up.</span>
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl sm:leading-9">
                Backend-focused software engineer with full-stack range and QA discipline—turning complex workflows into reliable products.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button nativeButton={false} size="lg" render={<a href="#work" />}>
                  Explore selected work
                  <ArrowDownRight aria-hidden="true" />
                </Button>
                <Button
                  nativeButton={false}
                  size="lg"
                  variant="outline"
                  render={<a href={`mailto:${profile.email}`} />}
                >
                  <Mail aria-hidden="true" />
                  Email me
                </Button>
              </div>

              <dl className="mt-14 grid max-w-2xl grid-cols-3 border-y border-border py-5 sm:mt-16">
                <div className="border-r border-border pr-4">
                  <dt className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">Projects</dt>
                  <dd className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">05</dd>
                </div>
                <div className="border-r border-border px-4 sm:px-6">
                  <dt className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">Roles</dt>
                  <dd className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">04</dd>
                </div>
                <div className="pl-4 sm:pl-6">
                  <dt className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">Focuses</dt>
                  <dd className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">03</dd>
                </div>
              </dl>
            </SectionReveal>

            <SectionReveal className="relative mx-auto w-full max-w-[500px] lg:justify-self-end" delay={0.46} distance={32} amount={0.01}>
              <div className="absolute -inset-3 -z-10 translate-x-3 translate-y-3 rounded-[1.75rem] border border-primary/40 bg-primary/10" />
              <div className="relative overflow-hidden rounded-[1.5rem] border border-border bg-card p-2 shadow-[0_24px_80px_rgba(0,0,0,0.25)]">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.15rem] bg-primary">
                  <Image
                    src={profile.resumePhoto}
                    alt={`${profile.name}, software engineer`}
                    fill
                    sizes="(min-width: 1024px) 38vw, 90vw"
                    priority
                    className="object-cover object-[center_34%] saturate-[0.92]"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/75 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white sm:p-6">
                    <div>
                      <p className="font-mono text-[0.68rem] uppercase tracking-[0.15em] text-white/65">Current base</p>
                      <p className="mt-2 flex items-center gap-2 text-sm font-semibold">
                        <MapPin className="size-4" aria-hidden="true" />
                        {profile.location}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/25 px-3 py-2 text-xs font-medium backdrop-blur-md">
                      <span className="size-2 rounded-full bg-emerald-400" />
                      Open to work
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute -left-5 top-10 hidden rounded-xl border border-border bg-card/95 p-4 shadow-xl backdrop-blur-md sm:block">
                <p className="font-mono text-xs text-muted-foreground">primary.mode</p>
                <p className="mt-1 text-sm font-semibold">Build · Test · Ship</p>
              </div>
            </SectionReveal>
          </div>
        </section>

        <SectionReveal id="about" className="mx-auto w-full max-w-[1280px] px-4 py-24 sm:px-6 sm:py-28 lg:px-10 lg:py-36">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
            <div>
              <p className="eyebrow">01 / About</p>
              <h2 className="section-title mt-6">Engineering with the whole product in view.</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="border-border bg-card py-0 shadow-sm ring-0 sm:col-span-2">
                <CardContent className="p-6 sm:p-8 lg:p-10">
                  <p className="max-w-3xl text-xl font-medium leading-8 tracking-[-0.02em] sm:text-2xl sm:leading-10">
                    {profile.objective}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-primary py-0 text-primary-foreground shadow-sm ring-0">
                <CardContent className="flex h-full min-h-64 flex-col justify-between p-6 sm:p-8">
                  <Database className="size-9" strokeWidth={1.6} aria-hidden="true" />
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.14em] opacity-70">Core mindset</p>
                    <p className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.035em]">
                      Backend-first. Product-aware. Quality-minded.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card py-0 shadow-sm ring-0">
                <CardContent className="p-6 sm:p-8">
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">How I work</p>
                  <ul className="mt-7 space-y-5">
                    {["Understand the workflow", "Ship the clearest solution", "Verify the critical path"].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm font-medium">
                        <CheckCircle2 className="size-5 shrink-0 text-primary" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal id="work" className="border-y border-border bg-card/45">
          <div className="mx-auto w-full max-w-[1280px] px-4 py-24 sm:px-6 sm:py-28 lg:px-10 lg:py-36">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="eyebrow">02 / Selected work</p>
                <h2 className="section-title mt-6">Real systems. Real constraints. Clear outcomes.</h2>
              </div>
              <p className="max-w-md text-base leading-7 text-muted-foreground lg:text-right">
                A selection of delivery across financial workflows, business platforms, inventory, and ordering systems.
              </p>
            </div>

            <div className="mt-14 grid gap-4 lg:grid-cols-2">
              {projects.map((project, index) => (
                <SectionReveal
                  key={project.slug}
                  className={index === 0 ? "lg:col-span-2" : undefined}
                  delay={(index % 2) * 0.05}
                  distance={18}
                  amount={0.12}
                >
                  <Link
                    href={`/projects/${project.slug}`}
                    aria-label={`Read ${project.title} case study`}
                    className="group block h-full"
                  >
                    <Card className="h-full border-border bg-background py-0 shadow-sm ring-0 transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-1 hover:border-primary/60 hover:shadow-xl">
                    <CardContent className={index === 0 ? "grid h-full gap-8 p-6 sm:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:p-10" : "flex h-full min-h-[380px] flex-col p-6 sm:p-8"}>
                      <div className={index === 0 ? "flex flex-col justify-between" : "flex items-start justify-between gap-6"}>
                        <span className="font-mono text-sm text-muted-foreground">0{index + 1}</span>
                        <ArrowUpRight className="size-6 text-muted-foreground transition-all duration-200 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" aria-hidden="true" />
                      </div>

                      <div className={index === 0 ? "" : "mt-auto pt-16"}>
                        <div className="flex flex-wrap items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted-foreground">
                          <span>{project.role}</span>
                          <span aria-hidden="true">/</span>
                          <span>{project.year}</span>
                        </div>
                        <h3 className={index === 0 ? "mt-4 text-4xl font-semibold leading-none tracking-[-0.05em] sm:text-5xl" : "mt-4 text-3xl font-semibold leading-none tracking-[-0.045em]"}>
                          {project.title}
                        </h3>
                        <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                          {project.summary}
                        </p>
                        <div className="mt-7 flex flex-wrap gap-2">
                          {project.stack.slice(0, 4).map((item) => (
                            <span key={item} className="rounded-full border border-border bg-muted/60 px-3 py-1.5 text-xs font-medium text-muted-foreground">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    </Card>
                  </Link>
                </SectionReveal>
              ))}
            </div>
          </div>
        </SectionReveal>

        <SectionReveal id="experience" className="mx-auto w-full max-w-[1280px] px-4 py-24 sm:px-6 sm:py-28 lg:px-10 lg:py-36">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="eyebrow">03 / Experience</p>
              <h2 className="section-title mt-6">Built across the delivery lifecycle.</h2>
              <p className="mt-6 max-w-md text-base leading-8 text-muted-foreground">
                Experience spanning implementation, integration, maintenance, and quality validation.
              </p>
            </div>

            <div className="border-t border-border">
              {experience.map((item, index) => (
                <SectionReveal key={`${item.company}-${item.role}`} delay={(index % 2) * 0.05} distance={18} amount={0.16}>
                  <article className="grid gap-5 border-b border-border py-8 sm:grid-cols-[7rem_1fr] sm:py-10">
                    <div>
                      <span className="font-mono text-xs text-primary">0{index + 1}</span>
                      <p className="mt-3 font-mono text-xs leading-5 text-muted-foreground">{item.period}</p>
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold tracking-[-0.035em]">{item.role}</h3>
                      <p className="mt-2 text-sm font-medium text-muted-foreground">{item.company}</p>
                      <p className="mt-5 text-base leading-8 text-muted-foreground">{item.summary}</p>
                      <ul className="mt-6 space-y-3">
                        {item.details.map((detail) => (
                          <li key={detail} className="flex gap-3 text-sm leading-7 text-muted-foreground">
                            <span className="mt-[0.65rem] size-1.5 shrink-0 rounded-full bg-primary" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </SectionReveal>
              ))}
            </div>
          </div>
        </SectionReveal>

        <SectionReveal id="skills" className="border-y border-border bg-foreground text-background">
          <div className="mx-auto w-full max-w-[1280px] px-4 py-24 sm:px-6 sm:py-28 lg:px-10 lg:py-36">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-end">
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-primary">04 / Technical stack</p>
                <h2 className="section-title mt-6 text-background">Tools chosen for the problem, not the trend.</h2>
              </div>
              <p className="max-w-md text-base leading-8 text-background/65 lg:justify-self-end">
                A practical stack across backend development, frontend delivery, databases, testing, and infrastructure.
              </p>
            </div>

            <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-background/15 bg-background/15 sm:grid-cols-2 lg:grid-cols-3">
              {skills.map((group, index) => (
                <SectionReveal key={group.category} className="h-full" delay={(index % 3) * 0.05} distance={16} amount={0.2}>
                  <div className="h-full min-h-64 bg-foreground p-6 sm:p-8">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-lg font-semibold tracking-tight text-background">{group.category}</h3>
                      <span className="font-mono text-xs text-background/40">0{index + 1}</span>
                    </div>
                    <ul className="mt-8 space-y-3">
                      {group.items.map((item) => (
                        <li key={item} className="flex items-center gap-3 text-sm text-background/65">
                          <span className="size-1.5 rounded-full bg-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </SectionReveal>

        <SectionReveal id="contact" className="mx-auto w-full max-w-[1280px] px-4 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-32">
          <Card className="overflow-hidden border-0 bg-primary py-0 text-primary-foreground shadow-[0_24px_80px_rgba(18,103,232,0.24)] ring-0">
            <CardContent className="relative p-7 sm:p-10 lg:p-14">
              <div className="absolute -right-24 -top-24 size-80 rounded-full border-[48px] border-white/10" />
              <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                <div>
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] opacity-70">05 / Let&apos;s work together</p>
                  <h2 className="mt-6 max-w-4xl text-4xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
                    Have a system that needs to work better?
                  </h2>
                </div>
                <div className="lg:justify-self-end">
                  <p className="max-w-md text-base leading-8 opacity-75">
                    I&apos;m open to backend, full-stack, and QA opportunities where reliability matters.
                  </p>
                  <Button
                    nativeButton={false}
                    size="lg"
                    render={<a href={`mailto:${profile.email}`} />}
                    className="mt-7 bg-white text-slate-950 hover:bg-white/90"
                  >
                    Start a conversation
                    <ArrowUpRight aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <footer className="flex flex-col gap-5 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 {profile.name}. Built with care in Bandung.</p>
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
