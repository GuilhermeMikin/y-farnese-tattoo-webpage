import "server-only";
import { cache } from "react";
import type * as prismic from "@prismicio/client";
import {
  ADDRESS_FULL,
  ADDRESS_LABEL,
  INSTAGRAM_URL,
  MAPS_URL,
  SITE_NAME,
  SITE_TAGLINE,
  WHATSAPP_HREF,
} from "@/shared/config/site";
import type { SupportedLocale } from "@/shared/types/locale";
import { transformLocaleData } from "@/shared/utils/transformLocaleData";
import { createPrismicClient } from "./client";
import { toPrismicLocale } from "./locales";
import { readLinkUrl, readTextField } from "./helpers";
import type { PrismicDocumentData, SiteSettingsAdapter, SiteSettingsData } from "./types";

const SITE_SETTINGS_TYPE = "site_settings";

function buildFallbackSiteSettings(locale: SupportedLocale): SiteSettingsData {
  const { messages } = transformLocaleData(locale);

  return {
    locale,
    brandName: SITE_NAME,
    tagline: SITE_TAGLINE,
    primaryCtaLabel: messages.header.primary_cta,
    whatsappHref: WHATSAPP_HREF,
    instagramHref: INSTAGRAM_URL,
    mapsHref: MAPS_URL,
    addressLabel: ADDRESS_LABEL,
    addressFull: ADDRESS_FULL,
    source: "fallback",
  };
}

const getSiteSettingsUncached = async (locale: SupportedLocale): Promise<SiteSettingsData> => {
  const fallback = buildFallbackSiteSettings(locale);
  const client = createPrismicClient();
  if (!client) {
    return fallback;
  }

  try {
    const response = await client.getByType(SITE_SETTINGS_TYPE, {
      lang: toPrismicLocale(locale),
      pageSize: 1,
    });
    const document = response.results[0] as prismic.PrismicDocument<PrismicDocumentData> | undefined;
    if (!document?.data) {
      return fallback;
    }
    const data = document.data as Record<string, unknown>;

    return {
      ...fallback,
      brandName: readTextField(data.brand_name) ?? fallback.brandName,
      tagline: readTextField(data.tagline) ?? fallback.tagline,
      primaryCtaLabel:
        readTextField(data.primary_cta_label) ?? fallback.primaryCtaLabel,
      whatsappHref: readLinkUrl(data.whatsapp_link) ?? fallback.whatsappHref,
      instagramHref: readLinkUrl(data.instagram_link) ?? fallback.instagramHref,
      mapsHref: readLinkUrl(data.maps_link) ?? fallback.mapsHref,
      addressLabel: readTextField(data.address_label) ?? fallback.addressLabel,
      addressFull: readTextField(data.address_full) ?? fallback.addressFull,
      source: "prismic",
    };
  } catch (error) {
    console.error(`[prismic] Failed to load site settings for locale '${locale}'.`, error);
    return fallback;
  }
};

const getSiteSettings =
  process.env.NODE_ENV === "development"
    ? getSiteSettingsUncached
    : cache(getSiteSettingsUncached);

const siteSettingsAdapter: SiteSettingsAdapter = {
  async get(locale) {
    return getSiteSettings(locale);
  },
};

export function createSiteSettingsAdapter(): SiteSettingsAdapter {
  return siteSettingsAdapter;
}
