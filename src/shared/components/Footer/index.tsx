import type { LocaleMessages } from "@/shared/types/locale";
import type { SiteSettingsData } from "@/shared/prismic/types";

type FooterProps = {
  messages: LocaleMessages["footer"];
  siteSettings: SiteSettingsData;
};

export default function Footer({ messages, siteSettings }: FooterProps) {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white/90 dark:border-slate-800 dark:bg-slate-900/90">
      <div className="container-page py-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{messages.note}</p>
          <div className="flex flex-wrap gap-3 text-sm">
            <a href={siteSettings.whatsappHref} target="_blank" rel="noreferrer" className="hover:text-brand-dark dark:hover:text-brand-light">
              {messages.links.whatsapp}
            </a>
            <a href={siteSettings.instagramHref} target="_blank" rel="noreferrer" className="hover:text-brand-dark dark:hover:text-brand-light">
              {messages.links.instagram}
            </a>
            {siteSettings.mapsHref ? (
              <a href={siteSettings.mapsHref} target="_blank" rel="noreferrer" className="hover:text-brand-dark dark:hover:text-brand-light">
                {messages.links.location}
              </a>
            ) : (
              <span className="text-slate-600 dark:text-slate-300">{siteSettings.addressLabel}</span>
            )}
          </div>
        </div>
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{messages.copyright}</p>
      </div>
    </footer>
  );
}
