import enUS from "@/shared/lang/en-us.json";
import ptBR from "@/shared/lang/pt-br.json";
import { DEFAULT_LOCALE, isLocale, resolveLocale } from "@/shared/config/locales";
import type { LocaleMessages, SupportedLocale } from "@/shared/types/locale";

const enUsMessages: LocaleMessages = enUS;
const ptBrMessages: LocaleMessages = ptBR;

const localeMessagesMap: Record<SupportedLocale, LocaleMessages> = {
  "en-us": enUsMessages,
  "pt-br": ptBrMessages,
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function joinPath(path: string, key: string): string {
  return path ? `${path}.${key}` : key;
}

function collectLocaleShapeWarnings(reference: unknown, candidate: unknown, path: string, warnings: Set<string>): void {
  if (Array.isArray(reference) && Array.isArray(candidate)) {
    const referenceObjectSample = reference.find((item) => isRecord(item));
    const candidateObjectSample = candidate.find((item) => isRecord(item));

    if (referenceObjectSample && candidateObjectSample) {
      collectLocaleShapeWarnings(referenceObjectSample, candidateObjectSample, `${path}[]`, warnings);
    }

    return;
  }

  if (!isRecord(reference) || !isRecord(candidate)) {
    return;
  }

  const referenceKeys = Object.keys(reference);
  const candidateKeys = Object.keys(candidate);

  for (const key of referenceKeys) {
    if (!(key in candidate)) {
      warnings.add(`${joinPath(path, key)}: missing in en-us.`);
    }
  }

  for (const key of candidateKeys) {
    if (!(key in reference)) {
      warnings.add(`${joinPath(path, key)}: missing in pt-br.`);
    }
  }

  for (const key of referenceKeys) {
    if (!(key in candidate)) {
      continue;
    }

    collectLocaleShapeWarnings(reference[key], candidate[key], joinPath(path, key), warnings);
  }
}

function warnLocaleKeyParity(referenceMessages: LocaleMessages, candidateMessages: LocaleMessages): void {
  const warnings = new Set<string>();
  collectLocaleShapeWarnings(referenceMessages, candidateMessages, "", warnings);

  if (warnings.size === 0) {
    return;
  }

  const warningDetails = Array.from(warnings)
    .sort((left, right) => left.localeCompare(right))
    .map((warning) => `- ${warning}`)
    .join("\n");

  console.warn(`[i18n] Locale key parity warnings detected between pt-br and en-us:\n${warningDetails}`);
}

warnLocaleKeyParity(ptBrMessages, enUsMessages);

export function isSupportedLocale(locale: string): locale is SupportedLocale {
  return isLocale(locale);
}

export function normalizeLocale(locale: string): SupportedLocale {
  return resolveLocale(locale);
}

export function transformLocaleData(locale: string): { locale: SupportedLocale; messages: LocaleMessages } {
  const safeLocale = normalizeLocale(locale);

  return {
    locale: safeLocale,
    messages: localeMessagesMap[safeLocale] ?? localeMessagesMap[DEFAULT_LOCALE],
  };
}
