"use client";

import { ArrowUpRight, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navItems } from "@/lib/navigation";
import { profile } from "@/lib/site";

export function MobileNav({ home = false }: { home?: boolean }) {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open navigation"
            className="rounded-full md:hidden"
          />
        }
      >
        <Menu aria-hidden="true" />
      </SheetTrigger>

      <SheetContent className="w-[min(88vw,360px)] border-0 bg-popover p-0">
        <SheetHeader className="px-6 py-6">
          <SheetTitle className="text-left text-lg font-semibold tracking-tight">
            Thoriq F. Ajiji
          </SheetTitle>
          <SheetDescription className="text-left">Software Engineer</SheetDescription>
        </SheetHeader>

        <nav aria-label="Mobile navigation" className="flex flex-1 flex-col px-3 py-4">
          {navItems.map((item) => (
            <SheetClose
              key={item.href}
              render={
                <a
                  href={home ? item.href : `/${item.href}`}
                  aria-label={item.label}
                  className="group flex min-h-14 items-center justify-between rounded-xl px-4 text-lg font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              }
            >
              <span>{item.label}</span>
              <ArrowUpRight className="size-4 text-muted-foreground" aria-hidden="true" />
            </SheetClose>
          ))}
        </nav>

        <SheetFooter className="p-5">
          <Button
            nativeButton={false}
            render={<a href={`mailto:${profile.email}`} aria-label="Email me" />}
            className="w-full rounded-full"
          >
            Email me
            <ArrowUpRight aria-hidden="true" />
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
