import Link from "next/link";
import { redirect } from "next/navigation";
import { getLocalePath } from "@/shared/config/locales";
import { resolveCanonicalPathAlias } from "@/shared/utils/routing";
import { transformLocaleData } from "@/shared/utils/transformLocaleData";

type LocalizedSlugPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function LocalizedSlugPage({
  params,
}: LocalizedSlugPageProps) {
  const { locale, slug } = await params;
  const { locale: safeLocale, messages } = transformLocaleData(locale);
  const canonicalPath = resolveCanonicalPathAlias(safeLocale, slug);

  if (canonicalPath) {
    redirect(getLocalePath(safeLocale, canonicalPath));
  }

  return (
    <section className="section-card mx-auto max-w-3xl p-8 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
        /{safeLocale}/{slug}
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
        {messages.under_construction.title}
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-700 dark:text-slate-300">
        {messages.under_construction.description}
      </p>
      <Link
        href={getLocalePath(safeLocale)}
        className="mt-8 inline-flex min-h-11 items-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-dark dark:bg-brand-dark dark:hover:bg-brand"
      >
        {messages.under_construction.back_home_label}
      </Link>
    </section>
  );
}
