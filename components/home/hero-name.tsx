"use client";

import type { PointerEvent } from "react";

export function HeroName() {
  function tilt(event: PointerEvent<HTMLHeadingElement>) {
    if (event.pointerType !== "mouse" || !matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty("--pointer-x", `${-y * 12}deg`);
    event.currentTarget.style.setProperty("--pointer-y", `${x * 14}deg`);
  }

  function reset(event: PointerEvent<HTMLHeadingElement>) {
    event.currentTarget.style.removeProperty("--pointer-x");
    event.currentTarget.style.removeProperty("--pointer-y");
  }

  return (
    <h1 className="hero-title" aria-label="Thoriq" onPointerMove={tilt} onPointerLeave={reset}>
      <span className="hero-name-scene" aria-hidden="true">
        <span className="hero-name">
          {Array.from("Thoriq", (letter, index) => (
            <span className="hero-letter" style={{ animationDelay: `${index * 75}ms` }} key={index}>{letter}</span>
          ))}
        </span>
      </span>
    </h1>
  );
}
