import type { Locale } from "@/shared/config/locales";

export type SupportedLocale = Locale;

export const CANONICAL_PAGES = [
  "about",
  "portfolio",
  "contact",
  "privacy-policy",
] as const;

export type CanonicalPagePath = (typeof CANONICAL_PAGES)[number];

export interface LocaleMessages {
  SEO: {
    title: string;
    description: string;
    keywords?: string;
    pages?: {
      home: { title: string; description: string };
      about: { title: string; description: string };
      portfolio: { title: string; description: string };
      contact: { title: string; description: string };
      privacy_policy: { title: string; description: string };
    };
  };
  common: {
    learn_more: string;
    back_home: string;
    back_to_portfolios: string;
  };
  header: {
    brand_name: string;
    tagline: string;
    navigation: {
      home: string;
      about: string;
      portfolio: string;
      contact: string;
    };
    primary_cta: string;
    menu_open_label: string;
    menu_close_label: string;
    language_label: string;
    theme: {
      label: string;
      light_label: string;
      dark_label: string;
    };
  };
  footer: {
    copyright: string;
    note: string;
    links: {
      instagram: string;
      location: string;
      whatsapp: string;
    };
  };
  pages: {
    home: {
      hero: {
        eyebrow: string;
        title: string;
        description: string;
        primary_cta: string;
        secondary_cta: string;
      };
      trust: {
        cards: Array<{ title: string; description: string }>;
      };
      featured_portfolios: {
        title: string;
        description: string;
        details_cta: string;
      };
      contact_strip: {
        title: string;
        description: string;
        whatsapp_label: string;
        instagram_label: string;
        location_label: string;
      };
    };
    about: {
      title: string;
      intro: string;
      story: string[];
      highlights: string[];
      cta_label: string;
    };
    portfolio: {
      title: string;
      intro: string;
      category_label: string;
      booking_cta: string;
      empty_state: string;
    };
    portfolio_detail: {
      category_label: string;
      booking_cta: string;
      not_found_title: string;
      not_found_description: string;
      gallery_title: string;
      gallery_empty_state: string;
    };
    contact: {
      title: string;
      intro: string;
      form: {
        name_label: string;
        business_type_label: string;
        description_label: string;
        submit_label: string;
        whatsapp_message_template: string;
      };
      channels_title: string;
      channels_intro: string;
      whatsapp_label: string;
      instagram_label: string;
      location_label: string;
    };
    privacy_policy: {
      title: string;
      intro: string;
      sections: Array<{
        title: string;
        body: string;
      }>;
    };
  };
  under_construction: {
    title: string;
    description: string;
    back_home_label: string;
  };
}
