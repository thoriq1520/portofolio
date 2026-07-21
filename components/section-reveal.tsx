"use client";

import { m, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

type SectionRevealProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  distance?: number;
  amount?: number;
};

export function SectionReveal({
  children,
  className,
  id,
  delay = 0,
  distance = 24,
  amount = 0.08,
}: SectionRevealProps) {
  const reducedMotion = useReducedMotion();

  return (
    <m.div
      id={id}
      className={cn(className)}
      initial={reducedMotion ? false : { opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.42, delay, ease: "easeOut" }}
    >
      {children}
    </m.div>
  );
}
