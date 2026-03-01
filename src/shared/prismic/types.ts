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

export type ProcedureSummaryData = {
  slug: string;
  locale: SupportedLocale;
  title: string;
  category: string;
  description: string;
  ctaLabel: string;
  source: ContentSource;
};

export type ProcedureDetailData = ProcedureSummaryData & {
  body: string[];
  beforeAfterImages: MediaImage[];
};

export type ProcedureRouteRef = {
  locale: SupportedLocale;
  slug: string;
  source: ContentSource;
};

export interface SiteSettingsAdapter {
  get(locale: SupportedLocale): Promise<SiteSettingsData>;
}

export interface ProcedureAdapter {
  list(locale: SupportedLocale): Promise<ProcedureSummaryData[]>;
  getBySlug(locale: SupportedLocale, slug: string): Promise<ProcedureDetailData | null>;
  listRouteRefs(): Promise<ProcedureRouteRef[]>;
}

export type PrismicDocumentData = Record<
  string,
  prismic.AnyRegularField | prismic.GroupField | prismic.NestedGroupField | prismic.SliceZone | null
>;
