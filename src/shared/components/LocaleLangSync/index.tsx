"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { LOCALE_LANGUAGE_TAGS, resolveLocale } from "@/shared/config/locales";

export default function LocaleLangSync() {
  const pathname = usePathname();

  useEffect(() => {
    const segment = pathname?.split("/").filter(Boolean)[0] ?? "";
    const locale = resolveLocale(segment);
    document.documentElement.lang = LOCALE_LANGUAGE_TAGS[locale];
  }, [pathname]);

  return null;
}
