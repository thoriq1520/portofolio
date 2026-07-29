import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { BrandMark } from "@/components/layout/brand-mark";
import { MobileNav } from "@/components/mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { navItems } from "@/lib/navigation";

const headerClassName = "sticky top-0 z-40 border-b border-border/80 bg-background/88 backdrop-blur-xl";

export function HomeHeader() {
  return (
    <header className={headerClassName}>
      <div className="mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-10">
        <a
          href="#top"
          className="group flex min-h-11 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Back to top"
        >
          <BrandMark className="transition-transform duration-200 group-hover:-rotate-2" />
          <span className="hidden text-sm font-semibold tracking-tight sm:block">Thoriq F. Ajiji</span>
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
  );
}

export function ProjectHeader() {
  return (
    <header className={headerClassName}>
      <div className="mx-auto flex h-16 w-full max-w-[1180px] items-center justify-between px-4 sm:px-6 lg:px-10">
        <Link
          href="/#work"
          className="group flex min-h-11 items-center gap-3 rounded-lg text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Back to all work"
        >
          <BrandMark className="h-8 w-[2.67rem] transition-transform duration-200 group-hover:-rotate-2" />
          <ArrowLeft className="size-4 transition-transform duration-200 group-hover:-translate-x-1" aria-hidden="true" />
          <span className="hidden sm:inline">All work</span>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
