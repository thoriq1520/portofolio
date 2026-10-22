"use client";

import dynamic from "next/dynamic";

const HeroParticles = dynamic(() => import("./hero-particles"), { ssr: false });

export function HomeParticles() {
  return (
    <div className="home-particles" aria-hidden="true">
      <HeroParticles />
    </div>
  );
}
