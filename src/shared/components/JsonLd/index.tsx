import {
  ADDRESS_LABEL,
  ADDRESS_CITY,
  ADDRESS_COUNTRY,
  ADDRESS_REGION,
  DEFAULT_OG_IMAGE,
  INSTAGRAM_URL,
  OCCUPATION,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/shared/config/site";

const PROFESSIONAL_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  jobTitle: OCCUPATION,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
  sameAs: [INSTAGRAM_URL],
  knowsAbout: [
    "Tattoo art",
    "Fine Line tattoos",
    "Blackwork tattoos",
    "Lettering tattoos",
    "Illustrated tattoos",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: ADDRESS_CITY,
    addressRegion: ADDRESS_REGION,
    addressCountry: ADDRESS_COUNTRY,
  },
  areaServed: ADDRESS_LABEL,
} as const;

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(PROFESSIONAL_JSON_LD) }}
    />
  );
}
