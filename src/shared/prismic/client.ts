import "server-only";
import * as prismic from "@prismicio/client";

export const PRISMIC_CACHE_TAG = "prismic";

function getPrismicRepositoryName(): string | null {
  const repositoryName = process.env.PRISMIC_REPOSITORY_NAME?.trim();
  return repositoryName && repositoryName.length > 0 ? repositoryName : null;
}

export function isPrismicConfigured(): boolean {
  return getPrismicRepositoryName() !== null;
}

export function createPrismicClient(): prismic.Client | null {
  const repositoryName = getPrismicRepositoryName();
  if (!repositoryName) {
    return null;
  }

  const accessToken = process.env.PRISMIC_ACCESS_TOKEN?.trim();
  const isDev = process.env.NODE_ENV === "development";
  const fetchWithCacheTags: typeof fetch = (input, init) => {
    return fetch(input, {
      ...init,
      cache: isDev ? "no-store" : "force-cache",
      next: isDev ? undefined : { tags: [PRISMIC_CACHE_TAG] },
    } as RequestInit & { next?: { tags: string[] } });
  };

  return prismic.createClient(repositoryName, {
    accessToken: accessToken && accessToken.length > 0 ? accessToken : undefined,
    fetch: fetchWithCacheTags,
  });
}
