import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { DEFAULT_LOCALE, LOCALE_LANGUAGE_TAGS } from "@/shared/config/locales";
import JsonLd from "@/shared/components/JsonLd";
import LocaleLangSync from "@/shared/components/LocaleLangSync";
import {
  SITE_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
  THEME_STORAGE_KEY,
  SHOW_LOCALE_AND_THEME,
} from "@/shared/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  icons: {
    icon: "/icon.png",
  },
};

const themeScript = `
(() => {
  try {
    const showLocaleAndTheme = ${SHOW_LOCALE_AND_THEME};
    const storageKey = "${THEME_STORAGE_KEY}";
    const root = document.documentElement;
    const storedTheme = showLocaleAndTheme ? localStorage.getItem(storageKey) : null;
    const theme = showLocaleAndTheme && (storedTheme === "light" || storedTheme === "dark") ? storedTheme : "dark";

    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
  } catch (_error) {
    // Ignore runtime access errors from restricted environments.
  }
})();
`;

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang={LOCALE_LANGUAGE_TAGS[DEFAULT_LOCALE]} className="dark" suppressHydrationWarning>
      <body>
        <JsonLd />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <LocaleLangSync />
        {children}
      </body>
    </html>
  );
}
