"use client";

import { useEffect, useState } from "react";
import { THEME_STORAGE_KEY } from "@/shared/config/site";

const STORAGE_KEY = THEME_STORAGE_KEY;

type ThemeMode = "light" | "dark";

type ThemeSwitchProps = {
  label: string;
  lightLabel: string;
  darkLabel: string;
};

function applyTheme(theme: ThemeMode) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}

export default function ThemeSwitch({ label, lightLabel, darkLabel }: ThemeSwitchProps) {
  const [theme, setTheme] = useState<ThemeMode>("dark");

  useEffect(() => {
    let savedTheme: string | null = null;
    try {
      savedTheme = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      savedTheme = null;
    }

    const initialTheme = savedTheme === "light" || savedTheme === "dark" ? savedTheme : "dark";
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const isDark = theme === "dark";
  const handleToggle = () => {
    const nextTheme: ThemeMode = isDark ? "light" : "dark";
    setTheme(nextTheme);
    applyTheme(nextTheme);

    try {
      window.localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {
      // Keep runtime behavior working even if storage is unavailable.
    }
  };

  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[0.64rem] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
        {label}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label={`${label}: ${isDark ? darkLabel : lightLabel}`}
        onClick={handleToggle}
        className={`relative inline-flex h-11 w-16 items-center rounded-full px-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 ${
          isDark ? "bg-brand" : "bg-slate-300"
        }`}
      >
        <span className="sr-only">{isDark ? darkLabel : lightLabel}</span>
        <span
          className={`h-7 w-7 rounded-full bg-white shadow-sm transition-transform ${
            isDark ? "translate-x-7" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
