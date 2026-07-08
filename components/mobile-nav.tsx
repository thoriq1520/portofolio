"use client";

import { useState } from "react";


const navItems = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  function close() {
    setOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open navigation"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface-soft)] text-[var(--foreground)] md:hidden"
      >
        <span className="text-lg">☰</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={close}>
          <div
            role="dialog"
            aria-modal="true"
            className="absolute right-0 top-0 h-full w-full max-w-[320px] z-50 border-l border-[var(--line)] bg-[var(--surface)] shadow-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <button
                type="button"
                onClick={close}
                aria-label="Close navigation"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)]"
              >
                ✕
              </button>
            </div>
            <nav className="flex flex-col gap-1 text-[15px]">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className="rounded-xl px-4 py-3 text-[var(--foreground)] transition hover:bg-[var(--surface-soft)]"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
