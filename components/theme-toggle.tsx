"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "theme";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(STORAGE_KEY, theme);
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const nextTheme: Theme = saved === "dark" ? "dark" : "light";
    setTheme(nextTheme);
    applyTheme(nextTheme);
  }, []);

  function toggleTheme() {
    const nextTheme: Theme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    applyTheme(nextTheme);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      className="inline-flex h-10 items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface-soft)] px-3 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--surface)]"
    >
      <span aria-hidden="true">{theme === "light" ? "☀" : "☾"}</span>
      <span>{theme === "light" ? "Light" : "Dark"}</span>
    </button>
  );
}
