import "server-only";
import type { SupportedLocale } from "@/shared/types/locale";

function normalizePrismicLocale(locale: string): string {
  return locale.trim().toLowerCase();
}

export const PRISMIC_LOCALE_BY_SITE_LOCALE: Record<SupportedLocale, string> = {
  "en-us": "en-us",
  "pt-br": "pt-br",
};

export const SITE_LOCALE_BY_PRISMIC_LOCALE: Record<string, SupportedLocale> = {
  "en-us": "en-us",
  "pt-br": "pt-br",
};

export function toPrismicLocale(locale: SupportedLocale): string {
  return PRISMIC_LOCALE_BY_SITE_LOCALE[locale];
}

export function fromPrismicLocale(locale: string): SupportedLocale | null {
  return SITE_LOCALE_BY_PRISMIC_LOCALE[normalizePrismicLocale(locale)] ?? null;
}
