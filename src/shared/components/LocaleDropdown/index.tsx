"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { getLocalePath, LOCALE_LABELS, pathnameToPathSegment, SUPPORTED_LOCALES } from "@/shared/config/locales";
import type { SupportedLocale } from "@/shared/types/locale";

function buildLocaleHref(pathname: string, targetLocale: SupportedLocale): string {
  const segment = pathnameToPathSegment(pathname);
  return getLocalePath(targetLocale, segment);
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

type LocaleDropdownProps = {
  locale: SupportedLocale;
  onSelect?: () => void;
};

export default function LocaleDropdown({ locale, onSelect }: LocaleDropdownProps) {
  const pathname = usePathname() ?? "/";
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Selecionar idioma"
        className="inline-flex h-11 min-w-[7rem] items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-[0.81rem] font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-700 dark:focus-visible:ring-offset-slate-900"
      >
        <span>{LOCALE_LABELS[locale]}</span>
        <ChevronDownIcon
          className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="absolute left-0 bottom-full z-50 mb-2 min-w-[7rem] overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-700 dark:bg-slate-800 dark:shadow-slate-900/50 md:bottom-auto md:mb-0 md:top-full md:mt-2"
        >
          {SUPPORTED_LOCALES.map((targetLocale) => {
            const isActive = targetLocale === locale;
            const href = buildLocaleHref(pathname, targetLocale);

            return (
              <Link
                key={targetLocale}
                href={href}
                role="option"
                aria-selected={isActive}
                onClick={() => {
                  setIsOpen(false);
                  onSelect?.();
                }}
                className={`block px-3 py-2.5 text-[0.81rem] font-medium transition-colors first:mt-0 last:mb-0 ${
                  isActive
                    ? "bg-brand/10 text-brand-dark dark:bg-brand/20 dark:text-brand-light"
                    : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {LOCALE_LABELS[targetLocale]}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
