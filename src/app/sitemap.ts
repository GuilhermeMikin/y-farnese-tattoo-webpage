import type { MetadataRoute } from "next";
import {
  DEFAULT_LOCALE,
  getLocalePath,
  LOCALE_LANGUAGE_TAGS,
  SUPPORTED_LOCALES,
} from "@/shared/config/locales";
import { buildAbsoluteUrl } from "@/shared/config/site";
import { createPortfolioAdapter } from "@/shared/prismic/portfolio-adapter";
import type { SupportedLocale } from "@/shared/types/locale";

const PAGES = ["", "about", "portfolio", "contact", "privacy-policy"] as const;

function buildLocalizedAlternates(
  pathByLocale: Partial<Record<SupportedLocale, string>>,
): Record<string, string> {
  const alternates: Record<string, string> = {};

  for (const locale of SUPPORTED_LOCALES) {
    const localizedPath = pathByLocale[locale];
    if (!localizedPath) {
      continue;
    }

    alternates[LOCALE_LANGUAGE_TAGS[locale]] = buildAbsoluteUrl(localizedPath);
  }

  const defaultPath = pathByLocale[DEFAULT_LOCALE] ?? pathByLocale[SUPPORTED_LOCALES[0]];
  if (defaultPath) {
    alternates["x-default"] = buildAbsoluteUrl(defaultPath);
  }

  return alternates;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of PAGES) {
    const localizedPaths: Partial<Record<SupportedLocale, string>> = {};

    for (const locale of SUPPORTED_LOCALES) {
      localizedPaths[locale] = getLocalePath(locale, page);
    }

    const alternates = buildLocalizedAlternates(localizedPaths);

    for (const locale of SUPPORTED_LOCALES) {
      const urlPath = localizedPaths[locale];
      if (!urlPath) {
        continue;
      }

      entries.push({
        url: buildAbsoluteUrl(urlPath),
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1 : 0.8,
        alternates: { languages: alternates },
      });
    }
  }

  const routeRefs = await createPortfolioAdapter().listRouteRefs();
  const pathsBySlug = new Map<string, Partial<Record<SupportedLocale, string>>>();

  for (const routeRef of routeRefs) {
    const current = pathsBySlug.get(routeRef.slug) ?? {};
    current[routeRef.locale] = getLocalePath(routeRef.locale, `portfolio/${routeRef.slug}`);
    pathsBySlug.set(routeRef.slug, current);
  }

  for (const pathByLocale of pathsBySlug.values()) {
    const alternates = buildLocalizedAlternates(pathByLocale);

    for (const locale of SUPPORTED_LOCALES) {
      const localizedPath = pathByLocale[locale];
      if (!localizedPath) {
        continue;
      }

      entries.push({
        url: buildAbsoluteUrl(localizedPath),
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.75,
        alternates: { languages: alternates },
      });
    }
  }

  return entries;
}
