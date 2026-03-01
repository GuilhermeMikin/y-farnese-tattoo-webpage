import type { Metadata } from "next";
import Link from "next/link";
import { getLocalePath } from "@/shared/config/locales";
import { buildAbsoluteUrl } from "@/shared/config/site";
import { createProcedureAdapter } from "@/shared/prismic/procedure-adapter";
import { createSiteSettingsAdapter } from "@/shared/prismic/site-settings-adapter";
import { transformLocaleData } from "@/shared/utils/transformLocaleData";

type ProceduresPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: ProceduresPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { locale: safeLocale, messages } = transformLocaleData(locale);
  const seo = messages.SEO.pages?.procedures ?? messages.SEO;
  const canonicalPath = getLocalePath(safeLocale, "procedures");

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

export default async function ProceduresPage({ params }: ProceduresPageProps) {
  const { locale } = await params;
  const { locale: safeLocale, messages } = transformLocaleData(locale);
  const procedures = await createProcedureAdapter().list(safeLocale);
  const siteSettings = await createSiteSettingsAdapter().get(safeLocale);
  const proceduresPage = messages.pages.procedures;

  return (
    <section className="space-y-6">
      <div className="section-card p-7 md:p-9">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          {proceduresPage.title}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700 dark:text-slate-300">
          {proceduresPage.intro}
        </p>
      </div>

      {procedures.length === 0 ? (
        <section className="section-card p-8 text-center text-slate-700 dark:text-slate-300">
          {proceduresPage.empty_state}
        </section>
      ) : (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {procedures.map((procedure) => (
            <article key={procedure.slug} className="section-card flex h-full flex-col p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-dark dark:text-brand-light">
                {proceduresPage.category_label}
              </p>
              <h2 className="mt-4 text-2xl font-semibold text-slate-900 dark:text-slate-100">
                {procedure.title}
              </h2>
              <p className="mt-2 text-sm font-medium text-brand-dark dark:text-brand-light">
                {procedure.category}
              </p>
              <p className="mt-4 flex-1 text-sm leading-6 text-slate-700 dark:text-slate-300">
                {procedure.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={getLocalePath(safeLocale, `procedures/${procedure.slug}`)}
                  className="inline-flex min-h-11 items-center rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-dark dark:bg-brand-dark dark:hover:bg-brand"
                >
                  {messages.common.learn_more}
                </Link>
                <a
                  href={siteSettings.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:border-brand hover:text-brand-dark dark:border-slate-700 dark:text-slate-200"
                >
                  {proceduresPage.booking_cta}
                </a>
              </div>
            </article>
          ))}
        </section>
      )}
    </section>
  );
}
