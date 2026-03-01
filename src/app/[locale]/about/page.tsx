import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getLocalePath } from "@/shared/config/locales";
import { buildAbsoluteUrl } from "@/shared/config/site";
import { createSiteSettingsAdapter } from "@/shared/prismic/site-settings-adapter";
import { transformLocaleData } from "@/shared/utils/transformLocaleData";

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { locale: safeLocale, messages } = transformLocaleData(locale);
  const seo = messages.SEO.pages?.about ?? messages.SEO;
  const canonicalPath = getLocalePath(safeLocale, "about");

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

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const { locale: safeLocale, messages } = transformLocaleData(locale);
  const siteSettings = await createSiteSettingsAdapter().get(safeLocale);
  const about = messages.pages.about;

  return (
    <section className="section-card p-7 md:p-10">
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            {about.title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-700 dark:text-slate-300">
            {about.intro}
          </p>
          <div className="mt-8 space-y-4 text-base leading-7 text-slate-700 dark:text-slate-300">
            {about.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <ul className="mt-8 flex flex-wrap gap-3">
            {about.highlights.map((highlight) => (
              <li key={highlight} className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium dark:border-slate-800 dark:bg-slate-950/40">
                {highlight}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={getLocalePath(safeLocale, "contact")}
              className="inline-flex min-h-11 items-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-dark dark:bg-brand-dark dark:hover:bg-brand"
            >
              {about.cta_label}
            </Link>
            <a
              href={siteSettings.instagramHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:border-brand hover:text-brand-dark dark:border-slate-700 dark:text-slate-200"
            >
              Instagram
            </a>
          </div>
        </div>

        <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] border border-white/40 bg-white/30 shadow-xl shadow-brand/10">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#f4f1ec_0%,#d9d1c7_40%,#a63a37_100%)]" />
          <Image
            src="/yfarnese2.png"
            alt={siteSettings.brandName}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 420px"
          />
        </div>
      </div>
    </section>
  );
}
