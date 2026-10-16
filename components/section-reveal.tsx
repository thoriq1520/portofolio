"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

type SectionRevealProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  distance?: number;
  amount?: number;
};

export function SectionReveal({ children, className, id, delay = 0, distance = 72, amount = 0.08 }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!inView || reducedMotion || !ref.current) return;
    const travel = matchMedia("(max-width: 767px)").matches ? Math.min(distance, 48) : distance;
    // ponytail: animate after entry; server HTML stays visible without JavaScript.
    const animation = animate(ref.current, { opacity: [0, 1], y: [travel, 0] }, {
      duration: 0.85, delay, ease: [0.16, 1, 0.3, 1],
    });
    return () => animation.complete();
  }, [inView, reducedMotion, delay, distance]);

  return <div ref={ref} id={id} className={className}>{children}</div>;
}
