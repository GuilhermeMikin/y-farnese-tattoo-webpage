import type { Metadata } from "next";
import { getLocalePath } from "@/shared/config/locales";
import { buildAbsoluteUrl } from "@/shared/config/site";
import { transformLocaleData } from "@/shared/utils/transformLocaleData";

type PrivacyPolicyPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PrivacyPolicyPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { locale: safeLocale, messages } = transformLocaleData(locale);
  const seo = messages.SEO.pages?.privacy_policy ?? messages.SEO;
  const canonicalPath = getLocalePath(safeLocale, "privacy-policy");

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

export default async function PrivacyPolicyPage({ params }: PrivacyPolicyPageProps) {
  const { locale } = await params;
  const { messages } = transformLocaleData(locale);
  const privacyPolicy = messages.pages.privacy_policy;

  return (
    <section className="section-card p-7 md:p-10">
      <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
        {privacyPolicy.title}
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700 dark:text-slate-300">
        {privacyPolicy.intro}
      </p>
      <div className="mt-8 space-y-6">
        {privacyPolicy.sections.map((section) => (
          <article key={section.title}>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              {section.title}
            </h2>
            <p className="mt-2 text-base leading-7 text-slate-700 dark:text-slate-300">
              {section.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
