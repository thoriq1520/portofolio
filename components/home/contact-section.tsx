import { ArrowUpRight } from "lucide-react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SectionReveal } from "@/components/section-reveal";
import { Button } from "@/components/ui/button";
import { profile } from "@/lib/site";

export function ContactSection() {
  return (
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
              className="mt-7 rounded-full bg-[#0b1732] text-white hover:bg-[#14234a]"
            >
              Email me
              <ArrowUpRight aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
      <SiteFooter className="mt-10 pt-8" showPhone />
    </SectionReveal>
  );
}
