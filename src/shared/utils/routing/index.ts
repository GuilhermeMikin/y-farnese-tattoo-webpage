import type { CanonicalPagePath, SupportedLocale } from "@/shared/types/locale";

const aliasToCanonicalMap: Record<SupportedLocale, Record<string, CanonicalPagePath>> = {
  "en-us": {
    "about-us": "about",
    aboutus: "about",
    services: "portfolio",
    styles: "portfolio",
    tattoos: "portfolio",
    booking: "contact",
    book: "contact",
    "book-now": "contact",
    "contact-us": "contact",
    privacy: "privacy-policy",
  },
  "pt-br": {
    sobre: "about",
    "quem-e-yolanda": "about",
    procedimentos: "portfolio",
    portfólio: "portfolio",
    tatuagens: "portfolio",
    estilos: "portfolio",
    contato: "contact",
    orcamento: "contact",
    agendamento: "contact",
    agendar: "contact",
    "politica-de-privacidade": "privacy-policy"
  }
};

export function resolveCanonicalPathAlias(locale: SupportedLocale, slug: string): CanonicalPagePath | null {
  const normalizedSlug = slug.trim().toLowerCase();
  return aliasToCanonicalMap[locale][normalizedSlug] ?? null;
}
