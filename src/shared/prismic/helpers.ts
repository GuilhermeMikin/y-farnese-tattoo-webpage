import * as prismic from "@prismicio/client";

export function readTextField(value: unknown): string | null {
  if (typeof value === "string") {
    const normalizedValue = value.trim();
    return normalizedValue.length > 0 ? normalizedValue : null;
  }

  if (Array.isArray(value)) {
    const normalizedValue = prismic.asText(value as prismic.RichTextField).trim();
    return normalizedValue.length > 0 ? normalizedValue : null;
  }

  return null;
}

export function readStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((entry) => readTextField(entry))
    .filter((entry): entry is string => Boolean(entry));
}

export function readLinkUrl(value: unknown): string | null {
  if (typeof value === "string") {
    const normalizedValue = value.trim();
    return normalizedValue.length > 0 ? normalizedValue : null;
  }

  if (value && typeof value === "object" && "url" in value) {
    const url = (value as { url?: unknown }).url;
    return typeof url === "string" && url.trim().length > 0 ? url.trim() : null;
  }

  return null;
}
