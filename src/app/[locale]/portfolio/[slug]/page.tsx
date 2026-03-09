import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocalePath } from "@/shared/config/locales";
import { buildAbsoluteUrl, SITE_NAME } from "@/shared/config/site";
import { createPortfolioAdapter } from "@/shared/prismic/portfolio-adapter";
import { createSiteSettingsAdapter } from "@/shared/prismic/site-settings-adapter";
import { transformLocaleData } from "@/shared/utils/transformLocaleData";
import { PortfolioWorkGallery } from "@/shared/components/PortfolioWorkGallery";

type PortfolioDetailPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const routeRefs = await createPortfolioAdapter().listRouteRefs();
  return routeRefs.map((routeRef) => ({
    locale: routeRef.locale,
    slug: routeRef.slug,
  }));
}

export async function generateMetadata({
  params,
}: PortfolioDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const { locale: safeLocale } = transformLocaleData(locale);
  const portfolio = await createPortfolioAdapter().getBySlug(safeLocale, slug);
  if (!portfolio) {
    return {};
  }

  const canonicalPath = getLocalePath(safeLocale, `portfolio/${portfolio.slug}`);
  return {
    title: `${portfolio.title} | ${SITE_NAME}`,
    description: portfolio.description,
    alternates: {
      canonical: buildAbsoluteUrl(canonicalPath),
    },
    openGraph: {
      url: buildAbsoluteUrl(canonicalPath),
    },
  };
}

export default async function PortfolioDetailPage({
  params,
}: PortfolioDetailPageProps) {
  const { locale, slug } = await params;
  const { locale: safeLocale, messages } = transformLocaleData(locale);
  const portfolio = await createPortfolioAdapter().getBySlug(safeLocale, slug);
  const siteSettings = await createSiteSettingsAdapter().get(safeLocale);
  const detail = messages.pages.portfolio_detail;

  if (!portfolio) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <nav className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
        <Link href={getLocalePath(safeLocale)} className="hover:text-brand-dark dark:hover:text-brand-light">
          {messages.header.navigation.home}
        </Link>
        <span aria-hidden="true">/</span>
        <Link href={getLocalePath(safeLocale, "portfolio")} className="hover:text-brand-dark dark:hover:text-brand-light">
          {messages.header.navigation.portfolio}
        </Link>
        <span aria-hidden="true">/</span>
        <span className="font-medium text-slate-900 dark:text-slate-100">{portfolio.title}</span>
      </nav>

      <section className="section-card p-7 md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-dark dark:text-brand-light">
          {detail.category_label}
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          {portfolio.title}
        </h1>
        <p className="mt-3 text-base font-medium text-brand-dark dark:text-brand-light">
          {portfolio.category}
        </p>
        <p className="mt-6 max-w-3xl text-base leading-7 text-slate-700 dark:text-slate-300">
          {portfolio.description}
        </p>
        <div className="mt-8 space-y-4 text-base leading-7 text-slate-700 dark:text-slate-300">
          {portfolio.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={siteSettings.whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-dark dark:bg-brand-dark dark:hover:bg-brand"
          >
            {detail.booking_cta}
          </a>
          <Link
            href={getLocalePath(safeLocale, "portfolio")}
            className="inline-flex min-h-11 items-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:border-brand hover:text-brand-dark dark:border-slate-700 dark:text-slate-200"
          >
            {messages.common.back_to_portfolios}
          </Link>
        </div>
      </section>

      {portfolio.works.length > 0 && (
        <section className="section-card p-7 md:p-9">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            {detail.works_title}
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {portfolio.works.map((work, index) => (
              <article
                key={`${work.title}-${index}`}
                className="section-card flex flex-col p-5"
              >
                <PortfolioWorkGallery
                  images={work.galleryImages}
                  labels={messages.pages.home.portfolio.gallery_labels}
                />
                <h3 className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {work.title}
                </h3>
                {work.description && (
                  <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                    {work.description}
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="section-card p-7 md:p-9">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          {detail.gallery_title}
        </h2>
        {portfolio.beforeAfterImages.length > 0 ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {portfolio.beforeAfterImages.map((image, index) => (
              <div
                key={`${image.src}-${index}`}
                className="relative aspect-video overflow-hidden rounded-xl border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-900"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 95vw"
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm leading-6 text-slate-700 dark:text-slate-300">
            {detail.gallery_empty_state}
          </p>
        )}
      </section>
    </div>
  );
}
