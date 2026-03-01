export const SUPPORTED_LOCALES = ["pt-br", "en-us"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "pt-br";

export const LOCALE_LABELS = {
  "pt-br": "Português",
  "en-us": "English",
} satisfies Record<Locale, string>;

export const LOCALE_LANGUAGE_TAGS = {
  "pt-br": "pt-BR",
  "en-us": "en-US",
} satisfies Record<Locale, string>;

export function normalizeLocaleCode(locale: string): string {
  return locale.trim().toLowerCase();
}

export function isLocale(locale: string): locale is Locale {
  return SUPPORTED_LOCALES.includes(normalizeLocaleCode(locale) as Locale);
}

export function resolveLocale(locale: string): Locale {
  const normalizedLocale = normalizeLocaleCode(locale);
  return isLocale(normalizedLocale) ? normalizedLocale : DEFAULT_LOCALE;
}

/**
 * Returns the public URL path for a locale. For pt-br (default), the locale is hidden from the URL.
 * For en-us, the locale prefix is included.
 */
export function getLocalePath(locale: Locale, path = ""): string {
  const normalizedPath = path.startsWith("/") ? path : path ? `/${path}` : "";
  if (locale === DEFAULT_LOCALE) {
    return normalizedPath || "/";
  }
  return `/${locale}${normalizedPath}`;
}

/**
 * Extracts the path segment from a pathname (strips locale prefix if present).
 * Used to build locale-switch hrefs from the current pathname.
 */
export function pathnameToPathSegment(pathname: string): string {
  const trimmed = pathname.replace(/\/$/, "").trim() || "/";
  for (const locale of SUPPORTED_LOCALES) {
    const prefix = `/${locale}`;
    if (trimmed === prefix || trimmed.startsWith(`${prefix}/`)) {
      return trimmed === prefix ? "" : trimmed.slice(prefix.length);
    }
  }
  return trimmed === "/" ? "" : trimmed.slice(1);
}
