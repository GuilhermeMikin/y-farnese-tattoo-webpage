import type { Metadata } from "next";
import Image from "next/image";
import ContactQuickForm from "@/shared/components/ContactQuickForm";
import { getLocalePath } from "@/shared/config/locales";
import { buildAbsoluteUrl } from "@/shared/config/site";
import { createSiteSettingsAdapter } from "@/shared/prismic/site-settings-adapter";
import { transformLocaleData } from "@/shared/utils/transformLocaleData";

type ContactPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { locale: safeLocale, messages } = transformLocaleData(locale);
  const seo = messages.SEO.pages?.contact ?? messages.SEO;
  const canonicalPath = getLocalePath(safeLocale, "contact");

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: buildAbsoluteUrl(canonicalPath),
    },
    openGraph: {
      url: buildAbsoluteUrl(canonicalPath),
    },
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  const { locale: safeLocale, messages } = transformLocaleData(locale);
  const siteSettings = await createSiteSettingsAdapter().get(safeLocale);
  const contact = messages.pages.contact;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
      <section className="section-card p-7 md:p-10">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          {contact.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700 dark:text-slate-300">
          {contact.intro}
        </p>
        <ContactQuickForm form={contact.form} whatsappHref={siteSettings.whatsappHref} />
      </section>

      <aside className="section-card p-7 md:p-9">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          {contact.channels_title}
        </h2>
        <p className="mt-3 text-base leading-7 text-slate-700 dark:text-slate-300">
          {contact.channels_intro}
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <a href={siteSettings.whatsappHref} target="_blank" rel="noreferrer" className="contact-pill">
            {contact.whatsapp_label}
          </a>
          <a href={siteSettings.instagramHref} target="_blank" rel="noreferrer" className="contact-pill">
            {contact.instagram_label}
          </a>
          {siteSettings.mapsHref ? (
            <a href={siteSettings.mapsHref} target="_blank" rel="noreferrer" className="contact-pill">
              {contact.location_label}
            </a>
          ) : (
            <div className="contact-pill">{siteSettings.addressLabel}</div>
          )}
        </div>
        <div className="relative mx-auto mt-8 aspect-square w-[70%]">
          <Image
            src="/yfarnese-qrcode.png"
            alt="QR Code para contato"
            fill
            sizes="(max-width: 1024px) 100vw, 420px"
            className="rounded-lg object-contain"
          />
        </div>
      </aside>
    </div>
  );
}
