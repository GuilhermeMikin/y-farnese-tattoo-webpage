import businessInfo from "../../../docs/business-specs/basic-business-info.json";

const siteUrlFromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const siteUrlFromJson = "site_url" in businessInfo ? businessInfo.site_url : undefined;
const mapsFromLinks = "maps" in businessInfo.links ? businessInfo.links.maps : undefined;

export const SITE_NAME = businessInfo.site_name ?? businessInfo.brand_name;
export const PERSON_NAME = businessInfo.person_name ?? businessInfo.brand_name;
export const SITE_TITLE = businessInfo.site_title ?? `${SITE_NAME} | Tattoo Artist`;
export const SITE_DESCRIPTION = businessInfo.site_description;
export const SITE_TAGLINE = businessInfo.tagline;
export const OCCUPATION = businessInfo.occupation;
export const SITE_URL =
  siteUrlFromEnv ||
  (typeof siteUrlFromJson === "string" && siteUrlFromJson.trim().length > 0
    ? siteUrlFromJson.trim()
    : "https://example.com");

export const INSTAGRAM_URL = businessInfo.links.instagram ?? businessInfo.instagram_profile_url;
export const MAPS_URL =
  typeof mapsFromLinks === "string" && mapsFromLinks.trim().length > 0
    ? mapsFromLinks.trim()
    : null;
export const ADDRESS_LABEL = businessInfo.address_label;
export const ADDRESS_FULL = businessInfo.address_label;
export const ADDRESS_CITY = businessInfo.city;
export const ADDRESS_REGION = businessInfo.state;
export const ADDRESS_COUNTRY = businessInfo.country;
export const WHATSAPP_HREF =
  businessInfo.links.whatsapp ||
  businessInfo.whatsapp_link ||
  process.env.NEXT_PUBLIC_WHATSAPP_HREF?.trim() ||
  "";
export const PHONE_NUMBER = businessInfo.phone_number;
export const DEFAULT_OG_IMAGE = "/yfarnese2.png";
export const THEME_STORAGE_KEY = "y-farnese-theme";

/** When false, locale and theme selection are hidden. Default: pt-br, dark. Set to true to re-enable. */
export const SHOW_LOCALE_AND_THEME = false;

export function buildAbsoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}
