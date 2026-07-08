import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  EnvelopeSimple,
  MapPin,
  Phone,
  Stack,
} from "@phosphor-icons/react/dist/ssr";

import { SectionReveal } from "@/components/section-reveal";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileNav } from "@/components/mobile-nav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { experience, profile, projects, skills } from "@/lib/site";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Home() {
  return (
    <main className="min-h-[100dvh] bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto flex w-full max-w-[1240px] flex-col px-4 sm:px-6 lg:px-8">
        <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--background)]">
          <div className="mx-auto flex h-18 w-full max-w-[1240px] items-center justify-between gap-4 px-1">
            <a href="#top" className="text-sm font-medium tracking-[0.14em] text-[var(--foreground)]">
              THORIQ
            </a>
            <div className="flex items-center gap-3">
              <nav aria-label="Primary" className="hidden items-center gap-5 text-sm text-[var(--muted)] md:flex">
                {navItems.map((item) => (
                  <a key={item.href} href={item.href} className="transition hover:text-[var(--foreground)]">
                    {item.label}
                  </a>
                ))}
              </nav>
              <div className="md:hidden">
                <MobileNav />
              </div>
              <ThemeToggle />
            </div>
          </div>
        </header>

        <section
          id="top"
          className="grid min-h-[100dvh] items-center gap-12 py-20 md:grid-cols-[1.1fr_0.9fr] md:py-24"
        >
          <SectionReveal className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--accent-soft)]">
              Software engineer portfolio
            </p>
            <h1 className="mt-5 max-w-3xl text-5xl leading-[0.98] tracking-[-0.05em] text-[var(--foreground)] sm:text-6xl lg:text-7xl">
              Backend focus.
              <br />
              Full-stack range.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted)] sm:text-lg">
              {profile.tagline}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#work"
                className="inline-flex h-11 items-center justify-center gap-1.5 rounded-2xl bg-[var(--accent)] px-5 text-sm font-medium text-black transition hover:bg-[var(--accent-soft)]"
              >
                View Work
                <ArrowRight className="size-4" weight="bold" />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex h-11 items-center justify-center gap-1.5 rounded-2xl border border-white/12 bg-transparent px-5 text-sm font-medium text-[var(--foreground)] transition hover:bg-white/6"
              >
                Email Me
                <EnvelopeSimple className="size-4" weight="bold" />
              </a>
            </div>
            <div className="mt-10 grid gap-3 text-sm text-[var(--muted)] sm:grid-cols-3">
              <div className="inline-flex items-center gap-2 rounded-2xl border border-[var(--line)] bg-[var(--surface-soft)] px-4 py-3">
                <MapPin className="size-4 text-[var(--accent)]" weight="fill" />
                <span>{profile.location}</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-2xl border border-[var(--line)] bg-[var(--surface-soft)] px-4 py-3">
                <Briefcase className="size-4 text-[var(--accent)]" weight="fill" />
                <span>{profile.availability}</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-2xl border border-[var(--line)] bg-[var(--surface-soft)] px-4 py-3">
                <Stack className="size-4 text-[var(--accent)]" weight="fill" />
                <span>Next.js, Go, Spring Boot</span>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal className="md:justify-self-end">
            <div className="relative overflow-hidden rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-3 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.16),transparent_60%)]" />
              <div className="relative overflow-hidden rounded-[calc(var(--radius)-0.5rem)] border border-[var(--line)] bg-[#111827]">
                <Image
                  src={profile.resumePhoto}
                  alt={`${profile.name} portrait`}
                  width={1600}
                  height={1600}
                  sizes="(min-width: 1024px) 34rem, (min-width: 768px) 40vw, 92vw"
                  priority
                  className="aspect-square h-full w-full object-cover"
                />
              </div>
            </div>
          </SectionReveal>
        </section>

        <SectionReveal
          id="about"
          className="grid gap-10 border-t border-[var(--line)] py-20 lg:grid-cols-[0.78fr_1.22fr] lg:items-start"
        >
          <div className="max-w-md">
            <h2 className="section-title">About</h2>
            <p className="mt-5 text-base leading-8 text-[var(--muted)]">
              Engineer with backend-first range, product delivery focus, and hands-on QA experience across real production workflows.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-soft)] px-4 py-4">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--accent-soft)]">Based in</p>
                <p className="mt-2 text-sm text-[var(--foreground)]">{profile.location}</p>
              </div>
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-soft)] px-4 py-4">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--accent-soft)]">Focus</p>
                <p className="mt-2 text-sm text-[var(--foreground)]">Backend, full-stack, QA</p>
              </div>
            </div>
          </div>
          <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <Card className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] py-0 shadow-none">
              <CardHeader className="px-6 pt-6">
                <CardTitle className="text-[var(--foreground)]">Profile</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6 text-[15px] leading-8 text-[var(--muted)]">
                <p>{profile.objective}</p>
              </CardContent>
            </Card>
            <Card className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] py-0 shadow-none">
              <CardHeader className="px-6 pt-6">
                <CardTitle className="text-[var(--foreground)]">Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 px-6 pb-6 text-[15px] leading-7 text-[var(--muted)]">
                <p className="text-sm leading-7 text-[var(--muted)]">
                  Available for software engineering roles and collaborative product work.
                </p>
                <div className="space-y-4">
                  <p className="inline-flex items-center gap-3">
                    <EnvelopeSimple className="size-4 text-[var(--accent)]" weight="fill" />
                    <a className="transition hover:text-[var(--foreground)]" href={`mailto:${profile.email}`}>
                      {profile.email}
                    </a>
                  </p>
                  <p className="inline-flex items-center gap-3">
                    <Phone className="size-4 text-[var(--accent)]" weight="fill" />
                    <a className="transition hover:text-[var(--foreground)]" href={`tel:${profile.phone}`}>
                      {profile.phone}
                    </a>
                  </p>
                  <p className="inline-flex items-center gap-3">
                    <MapPin className="size-4 text-[var(--accent)]" weight="fill" />
                    <span>{profile.location}</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </SectionReveal>

        <SectionReveal id="work" className="border-t border-[var(--line)] py-20">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h2 className="section-title">Selected Work</h2>
              <p className="mt-4 text-base leading-8 text-[var(--muted)]">
                Real systems across QA, backend, and full-stack delivery. Click each project for context and case study notes.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {projects.map((project, index) => (
              <a
                key={project.slug}
                href={`/projects/${project.slug}`}
                className={`group block h-full text-left ${index === 0 ? "md:col-span-2" : ""}`}
                aria-label={`Open ${project.title} project details`}
              >
                <Card className="h-full rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] py-0 shadow-none transition duration-200 hover:border-[var(--accent)]/35 hover:bg-white/[0.055]">
                  <CardHeader className="gap-6 px-6 pt-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-[var(--accent-soft)]">
                          {project.role}
                        </p>
                        <CardTitle className="mt-3 text-2xl text-[var(--foreground)]">
                          {project.title}
                        </CardTitle>
                      </div>
                      <span className="inline-flex rounded-full border border-[var(--line)] px-3 py-1 text-xs text-[var(--muted)]">
                        {project.year}
                      </span>
                    </div>
                    <div className="rounded-[calc(var(--radius)-0.5rem)] border border-[var(--line)] bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.20),transparent_55%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-5">
                      <p className="text-sm leading-7 text-[var(--foreground)]/88">
                        {project.summary}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-5 px-6 pb-6">
                    <div className="flex flex-wrap gap-2">
                      {project.stack.slice(0, 4).map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-[var(--line)] px-3 py-1 text-xs text-[var(--muted)]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                    <div className="inline-flex items-center gap-2 text-sm text-[var(--foreground)]">
                      Open details
                      <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" weight="bold" />
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal id="skills" className="border-t border-[var(--line)] py-20">
          <div className="max-w-2xl">
            <h2 className="section-title">Skills</h2>
            <p className="mt-4 text-base leading-8 text-[var(--muted)]">
              Core tools used across product delivery, backend implementation, and verification.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {skills.map((group) => (
              <Card key={group.category} className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] py-0 shadow-none">
                <CardHeader className="px-6 pt-6">
                  <CardTitle className="text-[var(--foreground)]">{group.category}</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-[var(--line)] bg-[var(--surface-soft)] px-3 py-2 text-sm text-[var(--muted)]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal id="experience" className="border-t border-[var(--line)] py-20">
          <div className="max-w-2xl">
            <h2 className="section-title">Experience</h2>
            <p className="mt-4 text-base leading-8 text-[var(--muted)]">
              Roles across quality assurance, backend systems, and full-stack product delivery.
            </p>
          </div>
          <div className="mt-10 space-y-5">
            {experience.map((item) => (
              <Card key={`${item.company}-${item.role}`} className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] py-0 shadow-none">
                <CardContent className="grid gap-6 px-6 py-6 md:grid-cols-[0.75fr_1.25fr]">
                  <div>
                    <p className="text-sm text-[var(--accent-soft)]">{item.period}</p>
                    <h3 className="mt-2 text-xl font-semibold text-[var(--foreground)]">{item.role}</h3>
                    <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{item.company}</p>
                  </div>
                  <div>
                    <p className="text-[15px] leading-8 text-[var(--foreground)]/88">{item.summary}</p>
                    <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--muted)]">
                      {item.details.map((detail) => (
                        <li key={detail} className="flex gap-3">
                          <span className="mt-[10px] size-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal id="contact" className="border-t border-[var(--line)] py-20">
          <Card className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] py-0 shadow-none">
            <CardContent className="grid gap-8 px-6 py-8 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <h2 className="section-title">Contact</h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--muted)]">
                  Looking for backend, full-stack, or QA support. Reach out by email or phone.
                </p>
              </div>
              <div className="flex flex-col gap-3 text-sm text-[var(--muted)] md:items-end">
                <a className="transition hover:text-[var(--foreground)]" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
                <a className="transition hover:text-[var(--foreground)]" href={`tel:${profile.phone}`}>
                  {profile.phone}
                </a>
              </div>
            </CardContent>
          </Card>
        </SectionReveal>
      </div>
    </main>
  );
}
