import "server-only";
import type * as prismic from "@prismicio/client";
import type { SupportedLocale } from "@/shared/types/locale";

export type ContentSource = "prismic" | "fallback";

export type MediaImage = {
  src: string;
  alt: string;
};

export type SiteSettingsData = {
  locale: SupportedLocale;
  brandName: string;
  tagline: string;
  primaryCtaLabel: string;
  whatsappHref: string;
  instagramHref: string;
  mapsHref: string | null;
  addressLabel: string;
  addressFull: string;
  source: ContentSource;
};

export type PortfolioSummaryData = {
  slug: string;
  locale: SupportedLocale;
  title: string;
  category: string;
  description: string;
  ctaLabel: string;
  carouselImages: MediaImage[];
  source: ContentSource;
};

export type WorkSummaryData = {
  title: string;
  description: string;
  coverImage: MediaImage | null;
  galleryImages: MediaImage[];
};

export type PortfolioDetailData = PortfolioSummaryData & {
  body: string[];
  beforeAfterImages: MediaImage[];
  works: WorkSummaryData[];
};

export type PortfolioRouteRef = {
  locale: SupportedLocale;
  slug: string;
  source: ContentSource;
};

export interface SiteSettingsAdapter {
  get(locale: SupportedLocale): Promise<SiteSettingsData>;
}

export interface PortfolioAdapter {
  list(locale: SupportedLocale): Promise<PortfolioSummaryData[]>;
  getBySlug(locale: SupportedLocale, slug: string): Promise<PortfolioDetailData | null>;
  listRouteRefs(): Promise<PortfolioRouteRef[]>;
}

export type PrismicDocumentData = Record<
  string,
  prismic.AnyRegularField | prismic.GroupField | prismic.NestedGroupField | prismic.SliceZone | null
>;
