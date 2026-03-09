import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  getLocalePath,
  LOCALE_LANGUAGE_TAGS,
  SUPPORTED_LOCALES,
} from "@/shared/config/locales";
import {
  buildAbsoluteUrl,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
} from "@/shared/config/site";
import FloatingActions from "@/shared/components/FloatingActions";
import Footer from "@/shared/components/Footer";
import Sidebar from "@/shared/components/Sidebar";
import { createSiteSettingsAdapter } from "@/shared/prismic/site-settings-adapter";
import { transformLocaleData } from "@/shared/utils/transformLocaleData";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { locale: safeLocale, messages } = transformLocaleData(locale);
  const siteSettings = await createSiteSettingsAdapter().get(safeLocale);

  return {
    title: messages.SEO.title,
    description: messages.SEO.description,
    keywords: messages.SEO.keywords,
    alternates: {
      languages: Object.fromEntries(
        SUPPORTED_LOCALES.map((supportedLocale) => [
          LOCALE_LANGUAGE_TAGS[supportedLocale],
          buildAbsoluteUrl(getLocalePath(supportedLocale)),
        ]),
      ),
    },
    openGraph: {
      type: "website",
      locale: LOCALE_LANGUAGE_TAGS[safeLocale],
      siteName: SITE_NAME,
      title: messages.SEO.title,
      description: messages.SEO.description,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          alt: siteSettings.brandName,
        },
      ],
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  const { locale: safeLocale, messages } = transformLocaleData(locale);
  const siteSettings = await createSiteSettingsAdapter().get(safeLocale);

  return (
    <div className="min-h-screen">
      <Sidebar locale={safeLocale} header={messages.header} siteSettings={siteSettings} />
      <main className="container-page py-10">{children}</main>
      <Footer messages={messages.footer} siteSettings={siteSettings} />
      <FloatingActions
        whatsappHref={siteSettings.whatsappHref}
        instagramHref={siteSettings.instagramHref}
        whatsappLabel={siteSettings.primaryCtaLabel}
        instagramLabel={messages.pages.contact.instagram_label}
        backToTopLabel={messages.pages.home.floating_actions.back_to_top_label}
      />
    </div>
  );
}
