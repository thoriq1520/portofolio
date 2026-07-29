import Image from "next/image";
import { ArrowDownRight, Mail } from "lucide-react";

import { SectionReveal } from "@/components/section-reveal";
import { Button } from "@/components/ui/button";
import { profile } from "@/lib/site";

export function HeroSection() {
  return (
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
  );
}
