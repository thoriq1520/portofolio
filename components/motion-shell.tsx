"use client";

import { LazyMotion, domAnimation, m, useReducedMotion, useScroll } from "motion/react";

export function MotionShell({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  return (
    <LazyMotion features={domAnimation} strict>
      {!reducedMotion ? (
        <m.div
          aria-hidden="true"
          className="fixed inset-x-0 top-0 z-[80] h-0.5 origin-left bg-primary"
          style={{ scaleX: scrollYProgress }}
        />
      ) : null}

      <m.div
        aria-hidden="true"
        className="motion-intro pointer-events-none fixed inset-0 z-[70] grid place-items-center bg-foreground text-background"
        initial={{ opacity: 1 }}
        animate={{ opacity: reducedMotion ? 0 : [1, 1, 0] }}
        transition={{ duration: reducedMotion ? 0 : 0.65, times: [0, 0.68, 1], ease: "easeIn" }}
      >
        <div className="w-32 text-center">
          <m.p
            className="text-4xl font-bold tracking-[-0.08em]"
            initial={reducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            TF
          </m.p>
          {!reducedMotion ? (
            <div className="mt-5 h-px overflow-hidden bg-background/20">
              <m.div
                className="h-full origin-left bg-primary"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.42, ease: "easeOut" }}
              />
            </div>
          ) : null}
        </div>
      </m.div>

      {children}
    </LazyMotion>
  );
}
