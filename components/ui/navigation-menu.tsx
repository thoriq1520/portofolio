"use client";

import * as React from "react";
import { AnimatePresence, m, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { Menu } from "lucide-react";

import { BrandMark } from "@/components/layout/brand-mark";
import { MobileNav } from "@/components/mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { navItems } from "@/lib/navigation";
import { cn } from "@/lib/utils";

const COLLAPSE_AT = 150;
const EXPAND_DISTANCE = 80;

export function AnimatedNavigation({ home = false }: { home?: boolean }) {
  const [isExpanded, setExpanded] = React.useState(true);
  const previousScrollY = React.useRef(0);
  const collapsedAt = React.useRef(0);
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (reduceMotion) return;

    const previous = previousScrollY.current;

    if (isExpanded && latest > previous && latest > COLLAPSE_AT) {
      setExpanded(false);
      collapsedAt.current = latest;
    } else if (!isExpanded && latest < previous && collapsedAt.current - latest > EXPAND_DISTANCE) {
      setExpanded(true);
    }

    previousScrollY.current = latest;
  });

  const resolveHref = (href: string) => (home ? href : `/${href}`);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <div className="pointer-events-auto flex h-14 items-center gap-1 rounded-full border border-border/80 bg-background/88 p-1.5 shadow-[0_10px_32px_rgba(21,23,26,0.10)] backdrop-blur-xl md:hidden dark:shadow-[0_12px_36px_rgba(12,13,15,0.38)]">
        <a
          href={home ? "#top" : "/"}
          aria-label={home ? "Back to top" : "Back to homepage"}
          className="flex size-11 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <BrandMark className="h-8 w-[2.67rem]" />
        </a>
        <ThemeToggle />
        <MobileNav home={home} />
      </div>

      <m.nav
        aria-label="Primary navigation"
        initial={reduceMotion ? false : { y: -72, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          width: isExpanded ? "auto" : "3.5rem",
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className={cn(
          "pointer-events-auto hidden h-14 items-center overflow-hidden rounded-full border border-border/80 bg-background/88 shadow-[0_10px_32px_rgba(21,23,26,0.10)] backdrop-blur-xl md:flex dark:shadow-[0_12px_36px_rgba(12,13,15,0.38)]",
          !isExpanded && "justify-center"
        )}
      >
        <AnimatePresence initial={false} mode="popLayout">
          {isExpanded ? (
            <m.div
              key="expanded-navigation"
              initial={reduceMotion ? false : { opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, x: -12 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-1 p-1.5"
            >
              <a
                href={home ? "#top" : "/"}
                aria-label={home ? "Back to top" : "Back to homepage"}
                className="group flex h-11 items-center gap-2 rounded-full px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <BrandMark className="h-8 w-[2.67rem] transition-transform duration-200 group-hover:-rotate-2" />
                <span className="hidden whitespace-nowrap pr-1 text-sm font-semibold tracking-tight lg:block">
                  Thoriq F. Ajiji
                </span>
              </a>

              <div className="flex items-center gap-0.5">
                {navItems.map((item) => (
                  <m.a
                    key={item.href}
                    href={resolveHref(item.href)}
                    initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.18 }}
                    className="inline-flex h-11 items-center rounded-full px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {item.label}
                  </m.a>
                ))}
              </div>

              <ThemeToggle />
            </m.div>
          ) : (
            <m.button
              key="collapsed-navigation"
              type="button"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", damping: 15, stiffness: 300 }}
              onClick={() => setExpanded(true)}
              aria-label="Expand navigation"
              className="flex size-14 cursor-pointer items-center justify-center rounded-full text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Menu className="size-5" aria-hidden="true" />
            </m.button>
          )}
        </AnimatePresence>
      </m.nav>
    </header>
  );
}
