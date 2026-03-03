import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getLocalePath } from "@/shared/config/locales";
import { buildAbsoluteUrl } from "@/shared/config/site";
import { createPortfolioAdapter } from "@/shared/prismic/portfolio-adapter";
import { createSiteSettingsAdapter } from "@/shared/prismic/site-settings-adapter";
import { transformLocaleData } from "@/shared/utils/transformLocaleData";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const { locale: safeLocale, messages } = transformLocaleData(locale);
  const canonicalPath = getLocalePath(safeLocale);
  const seo = messages.SEO.pages?.home ?? messages.SEO;

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

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const { locale: safeLocale, messages } = transformLocaleData(locale);
  const siteSettings = await createSiteSettingsAdapter().get(safeLocale);
  const portfolio = await createPortfolioAdapter().list(safeLocale);
  const home = messages.pages.home;
  const about = messages.pages.about;

  return (
    <div className="space-y-10">
      <section className="section-card overflow-hidden px-7 py-8 md:px-10 md:py-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-dark dark:text-brand-light">
              {home.hero.eyebrow}
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 md:text-6xl">
              {home.hero.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 dark:text-slate-300 md:text-lg">
              {home.hero.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={siteSettings.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-dark dark:bg-brand-dark dark:hover:bg-brand"
              >
                {home.hero.primary_cta}
              </a>
              <Link
                href={getLocalePath(safeLocale, "portfolio")}
                className="inline-flex min-h-11 items-center rounded-full border border-brand-light bg-brand-light px-6 py-3 text-sm font-semibold text-brand-dark hover:bg-brand hover:text-white dark:border-brand/40 dark:bg-brand/20 dark:text-brand-light dark:hover:bg-brand dark:hover:text-white"
              >
                {home.hero.secondary_cta}
              </Link>
            </div>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-[20.4rem] overflow-hidden rounded-full">
            <Image
              src="/yfarnese.png"
              alt={siteSettings.brandName}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 420px"
            />
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {home.trust.bullets.map((bullet) => (
          <article key={bullet} className="section-card min-h-36 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-dark dark:text-brand-light">
              {home.trust.title}
            </p>
            <h2 className="mt-5 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              {bullet}
            </h2>
          </article>
        ))}
      </section>

      <section className="section-card p-7 md:p-9">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              {home.featured_portfolios.title}
            </h2>
            <p className="mt-3 max-w-3xl text-base text-slate-700 dark:text-slate-300">
              {home.featured_portfolios.description}
            </p>
          </div>
          <Link
            href={getLocalePath(safeLocale, "portfolio")}
            className="inline-flex min-h-11 items-center rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:border-brand hover:text-brand-dark dark:border-slate-700 dark:text-slate-200"
          >
            {messages.common.learn_more}
          </Link>
        </div>
        <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {portfolio.slice(0, 4).map((portfolio) => (
            <article key={portfolio.slug} className="rounded-3xl border border-slate-200 bg-white/70 p-5 dark:border-slate-800 dark:bg-slate-950/40">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-dark dark:text-brand-light">
                {portfolio.category}
              </p>
              <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-slate-100">
                {portfolio.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
                {portfolio.description}
              </p>
              <Link
                href={getLocalePath(safeLocale, `portfolio/${portfolio.slug}`)}
                className="mt-5 inline-flex min-h-11 items-center rounded-full bg-brand-light px-4 py-2 text-sm font-semibold text-brand-dark hover:bg-brand dark:bg-brand/20 dark:text-brand-light"
              >
                {home.featured_portfolios.details_cta}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="section-card p-7 md:p-9">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-dark dark:text-brand-light">
            {messages.header.navigation.about}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            {about.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-700 dark:text-slate-300">
            {about.intro}
          </p>
          <ul className="mt-6 flex flex-wrap gap-3 text-sm text-slate-700 dark:text-slate-300">
            {about.highlights.map((highlight) => (
              <li key={highlight} className="rounded-full border border-slate-200 bg-white/70 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/40">
                {highlight}
              </li>
            ))}
          </ul>
          <Link
            href={getLocalePath(safeLocale, "about")}
            className="mt-6 inline-flex min-h-11 items-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-dark dark:bg-brand-dark dark:hover:bg-brand"
          >
            {about.cta_label}
          </Link>
        </article>

        <article className="section-card p-7 md:p-9">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            {home.contact_strip.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-700 dark:text-slate-300">
            {home.contact_strip.description}
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <a href={siteSettings.whatsappHref} target="_blank" rel="noreferrer" className="contact-pill">
              {home.contact_strip.whatsapp_label}
            </a>
            <a href={siteSettings.instagramHref} target="_blank" rel="noreferrer" className="contact-pill">
              {home.contact_strip.instagram_label}
            </a>
            {siteSettings.mapsHref ? (
              <a href={siteSettings.mapsHref} target="_blank" rel="noreferrer" className="contact-pill">
                {home.contact_strip.location_label}
              </a>
            ) : (
              <div className="contact-pill">{siteSettings.addressLabel}</div>
            )}
          </div>
        </article>
      </section>
    </div>
  );
}
