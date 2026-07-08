"use client";

import Link from "next/link";
import { GithubLogo, GlobeHemisphereWest } from "@phosphor-icons/react/dist/ssr";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Project } from "@/lib/site";

export function ProjectDialog({
  project,
  trigger,
}: {
  project: Project;
  trigger: React.ReactElement;
}) {
  return (
    <Dialog>
      <DialogTrigger render={trigger} />
      <DialogContent className="w-[min(1100px,calc(100vw-2rem))] max-w-none rounded-[var(--radius)] border border-white/10 bg-[var(--surface)] p-7 text-[var(--foreground)] shadow-2xl shadow-black/40 sm:w-[min(1100px,calc(100vw-3rem))] sm:max-w-none sm:p-8 lg:p-9">
        <DialogHeader className="gap-4">
          <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
            <span>{project.role}</span>
            <span>{project.year}</span>
          </div>
          <DialogTitle className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {project.title}
          </DialogTitle>
          <DialogDescription className="max-w-2xl text-base leading-7 text-[var(--muted)]">
            {project.summary}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 border-y border-white/10 py-6 md:grid-cols-2 xl:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
              Problem
            </p>
            <p className="mt-2 text-sm leading-7 text-[var(--foreground)]/88">
              {project.problem}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
              Solution
            </p>
            <p className="mt-2 text-sm leading-7 text-[var(--foreground)]/88">
              {project.solution}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
              Result
            </p>
            <p className="mt-2 text-sm leading-7 text-[var(--foreground)]/88">
              {project.result}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span
              key={item}
              className="rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3 py-1 text-xs text-[var(--accent-soft)]"
            >
              {item}
            </span>
          ))}
        </div>

        <DialogFooter className="-mx-0 -mb-0 mt-1 rounded-none border-0 bg-transparent p-0 sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {project.links.live ? (
              <Button
                nativeButton={false}
                variant="outline"
                render={<Link href={project.links.live} target="_blank" rel="noreferrer" />}
                className="h-10 rounded-xl border-white/15 bg-transparent px-4 text-white hover:bg-white/6"
              >
                Live
                <GlobeHemisphereWest className="size-4" weight="bold" />
              </Button>
            ) : null}

            {project.links.github ? (
              <Button
                nativeButton={false}
                variant="outline"
                render={<Link href={project.links.github} target="_blank" rel="noreferrer" />}
                className="h-10 rounded-xl border-white/15 bg-transparent px-4 text-white hover:bg-white/6"
              >
                GitHub
                <GithubLogo className="size-4" weight="bold" />
              </Button>
            ) : null}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
