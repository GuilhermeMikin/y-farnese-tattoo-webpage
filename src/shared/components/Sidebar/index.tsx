"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { getLocalePath, pathnameToPathSegment } from "@/shared/config/locales";
import { SHOW_LOCALE_AND_THEME } from "@/shared/config/site";
import ThemeSwitch from "@/shared/components/ThemeSwitch";
import LocaleDropdown from "@/shared/components/LocaleDropdown";
import type { LocaleMessages, SupportedLocale } from "@/shared/types/locale";
import type { SiteSettingsData } from "@/shared/prismic/types";

type SidebarProps = {
  locale: SupportedLocale;
  header: LocaleMessages["header"];
  siteSettings: SiteSettingsData;
};

function NavLinks({
  locale,
  header,
  siteSettings,
  isHome,
  isAbout,
  isPortfolios,
  isContact,
  onLinkClick,
  hideWhatsApp = false
}: {
  locale: SupportedLocale;
  header: LocaleMessages["header"];
  siteSettings: SiteSettingsData;
  isHome: boolean;
  isAbout: boolean;
  isPortfolios: boolean;
  isContact: boolean;
  onLinkClick?: () => void;
  hideWhatsApp?: boolean;
}) {
  return (
    <>
      <Link
        href={getLocalePath(locale)}
        onClick={onLinkClick}
        className={`inline-flex min-h-11 items-center rounded-full px-3 py-2 hover:text-brand-dark dark:hover:text-brand-light ${isHome ? "font-bold" : ""}`}
      >
        {header.navigation.home}
      </Link>
      <Link
        href={getLocalePath(locale, "about")}
        onClick={onLinkClick}
        className={`inline-flex min-h-11 items-center rounded-full px-3 py-2 hover:text-brand-dark dark:hover:text-brand-light ${isAbout ? "font-bold" : ""}`}
      >
        {header.navigation.about}
      </Link>
      <Link
        href={getLocalePath(locale, "portfolio")}
        onClick={onLinkClick}
        className={`inline-flex min-h-11 items-center rounded-full px-3 py-2 hover:text-brand-dark dark:hover:text-brand-light ${isPortfolios ? "font-bold" : ""}`}
      >
        {header.navigation.portfolio}
      </Link>
      <Link
        href={getLocalePath(locale, "contact")}
        onClick={onLinkClick}
        className={`inline-flex min-h-11 items-center rounded-full px-3 py-2 hover:text-brand-dark dark:hover:text-brand-light ${isContact ? "font-bold" : ""}`}
      >
        {header.navigation.contact}
      </Link>
      {!hideWhatsApp && (
        <a
          href={siteSettings.whatsappHref}
          target="_blank"
          rel="noreferrer"
          onClick={onLinkClick}
          className="inline-flex min-h-11 items-center rounded-full bg-brand px-4 py-2 text-[0.81rem] font-semibold text-white hover:bg-brand-dark dark:bg-brand-dark dark:hover:bg-brand"
        >
          {siteSettings.primaryCtaLabel}
        </a>
      )}
    </>
  );
}

export default function Sidebar({ locale, header, siteSettings }: SidebarProps) {
  const pathname = usePathname() ?? "/";
  const pathSegment = pathnameToPathSegment(pathname);
  const isHome = pathSegment === "";
  const isAbout = pathSegment === "about";
  const isPortfolios = pathSegment === "portfolio" || pathSegment.startsWith("portfolio/");
  const isContact = pathSegment === "contact";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95">
      <div className="container-page flex items-stretch justify-between gap-3 py-2.5">
        {/* Icon + Brand + tagline - always visible */}
        <Link href={getLocalePath(locale)} className="flex min-w-0 flex-1 items-center gap-3">
          <span className="flex h-full flex-shrink-0 items-center">
            <Image
              src="/icon.png"
              alt=""
              width={64}
              height={64}
              className="h-[90%] w-auto object-contain"
            />
          </span>
          <span className="space-y-0.5">
            <span className="block text-[1.3rem] font-bold leading-tight tracking-tight text-brand-dark dark:text-brand-light">
              {header.brand_name}
            </span>
            <p className="text-[0.73rem] leading-tight text-slate-600 dark:text-slate-300">{siteSettings.tagline}</p>
          </span>
        </Link>

        {/* Desktop nav - hidden on mobile */}
        <nav className="hidden items-center gap-3 self-center text-[0.81rem] font-medium text-slate-700 dark:text-slate-200 md:flex">
          <NavLinks
            locale={locale}
            header={header}
            siteSettings={siteSettings}
            isHome={isHome}
            isAbout={isAbout}
            isPortfolios={isPortfolios}
            isContact={isContact}
          />
        </nav>

        {/* Desktop language + theme - hidden on mobile. Disabled when SHOW_LOCALE_AND_THEME is false. */}
        {SHOW_LOCALE_AND_THEME && (
          <div className="hidden items-center gap-3 self-center md:flex">
            <LocaleDropdown locale={locale} />
            <ThemeSwitch
              lightLabel={header.theme.light_label}
              darkLabel={header.theme.dark_label}
            />
          </div>
        )}

        {/* Hamburger button - visible only on mobile */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={isMenuOpen ? header.menu_close_label : header.menu_open_label}
          aria-expanded={isMenuOpen}
          className="flex h-11 w-11 flex-shrink-0 flex-col items-center justify-center gap-1 self-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 md:hidden"
        >
          <span
            className={`h-0.5 w-5 rounded-full bg-current transition-all ${
              isMenuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-5 rounded-full bg-current transition-all ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-5 rounded-full bg-current transition-all ${
              isMenuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile slide-out menu - rendered via portal to ensure it's above all content */}
      {mounted &&
        createPortal(
          <div
            className={`fixed inset-0 z-[9999] md:hidden ${isMenuOpen ? "" : "pointer-events-none"}`}
            aria-hidden={!isMenuOpen}
          >
            {/* Backdrop */}
            <button
              type="button"
              onClick={closeMenu}
              className={`absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 ${
                isMenuOpen ? "opacity-100" : "opacity-0"
              }`}
              aria-label={header.menu_close_label}
            />

            {/* Side panel - solid opaque background */}
            <aside
              className={`absolute right-0 top-0 flex h-full w-80 max-w-[88vw] flex-col gap-5 border-l border-slate-200 bg-[var(--surface)] p-5 shadow-2xl transition-transform duration-300 ease-out dark:border-slate-800 dark:bg-[var(--surface)] ${
                isMenuOpen ? "translate-x-0" : "translate-x-full"
              }`}
              style={{ backgroundColor: "var(--surface)" }}
            >
          <nav className="flex flex-col gap-3 text-sm font-medium text-slate-700 dark:text-slate-200">
            <NavLinks
              locale={locale}
              header={header}
              siteSettings={siteSettings}
              isHome={isHome}
              isAbout={isAbout}
              isPortfolios={isPortfolios}
              isContact={isContact}
              onLinkClick={closeMenu}
              hideWhatsApp={!SHOW_LOCALE_AND_THEME}
            />
          </nav>

          <div className="mt-auto flex flex-row flex-wrap items-center gap-3 border-t border-slate-200 pt-5 dark:border-slate-700">
            {SHOW_LOCALE_AND_THEME ? (
              <>
                <LocaleDropdown locale={locale} onSelect={closeMenu} />
                <ThemeSwitch
                  lightLabel={header.theme.light_label}
                  darkLabel={header.theme.dark_label}
                />
              </>
            ) : (
              <a
                href={siteSettings.whatsappHref}
                target="_blank"
                rel="noreferrer"
                onClick={closeMenu}
                className="inline-flex min-h-11 items-center rounded-full bg-brand px-4 py-2 text-[0.81rem] font-semibold text-white hover:bg-brand-dark dark:bg-brand-dark dark:hover:bg-brand"
              >
                {siteSettings.primaryCtaLabel}
              </a>
            )}
          </div>
        </aside>
      </div>,
          document.body
        )}
    </header>
  );
}
