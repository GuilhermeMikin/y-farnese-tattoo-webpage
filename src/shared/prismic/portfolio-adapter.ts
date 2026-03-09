import "server-only";
import { cache } from "react";
import type * as prismic from "@prismicio/client";
import { filter } from "@prismicio/client";
import { createPrismicClient } from "./client";
import { toPrismicLocale } from "./locales";
import { readTextField } from "./helpers";
import { transformLocaleData } from "@/shared/utils/transformLocaleData";
import type {
  PortfolioAdapter,
  PortfolioDetailData,
  PortfolioRouteRef,
  PortfolioSummaryData,
  WorkSummaryData,
} from "./types";
import type { SupportedLocale } from "@/shared/types/locale";

const CATEGORIA_TYPE = "categoria";
const TRABALHO_TYPE = "trabalho";

type FallbackPortfolio = Omit<PortfolioDetailData, "locale" | "source">;

const FALLBACK_PORTFOLIOS: Record<SupportedLocale, FallbackPortfolio[]> = {
  "pt-br": [
    {
      slug: "fine-line",
      title: "Fine Line",
      category: "Estilo",
      description: "Traços delicados, composição leve e leitura precisa para ideias que pedem sutileza.",
      ctaLabel: "Pedir orçamento",
      body: [],
      beforeAfterImages: [],
      carouselImages: [],
      works: [],
    },
    {
      slug: "blackwork",
      title: "Blackwork",
      category: "Estilo",
      description: "Composições de maior contraste e presença visual para propostas com peso gráfico mais marcado.",
      ctaLabel: "Pedir orçamento",
      body: [],
      beforeAfterImages: [],
      carouselImages: [],
      works: [],
    },
    {
      slug: "lettering-symbols",
      title: "Lettering e Símbolos",
      category: "Portfólio",
      description: "Categoria inicial para trabalhos com frases curtas, palavras, símbolos e composições minimalistas.",
      ctaLabel: "Pedir orçamento",
      body: [],
      beforeAfterImages: [],
      carouselImages: [],
      works: [],
    },
    {
      slug: "covered-piece",
      title: "Coberturas",
      category: "Portfólio",
      description: "Coberturas ou reformas de tatuagens existentes.",
      ctaLabel: "Pedir orçamento",
      body: [],
      beforeAfterImages: [],
      carouselImages: [],
      works: [],
    },
  ],
  "en-us": [
    {
      slug: "fine-line",
      title: "Fine Line",
      category: "Style",
      description: "Delicate linework and lighter compositions for ideas that need precision without visual weight.",
      ctaLabel: "Request quote",
      body: [],
      beforeAfterImages: [],
      carouselImages: [],
      works: [],
    },
    {
      slug: "blackwork",
      title: "Blackwork",
      category: "Style",
      description: "Higher-contrast compositions for tattoo ideas with a stronger graphic presence.",
      ctaLabel: "Request quote",
      body: [],
      beforeAfterImages: [],
      carouselImages: [],
      works: [],
    },
    {
      slug: "lettering-symbols",
      title: "Lettering and Symbols",
      category: "Portfolio",
      description: "Initial category for short phrases, symbols, and more minimal tattoo compositions.",
      ctaLabel: "Request quote",
      body: [],
      beforeAfterImages: [],
      carouselImages: [],
      works: [],
    },
    {
      slug: "illustrated-pieces",
      title: "Illustrated Pieces",
      category: "Portfolio",
      description: "Initial grouping for illustrated work observed in the current visual references.",
      ctaLabel: "Request quote",
      body: [ ],
      beforeAfterImages: [],
      carouselImages: [],
      works: [],
    },
  ],
};

function mapFallbackPortfolio(locale: SupportedLocale, portfolio: FallbackPortfolio): PortfolioDetailData {
  return {
    ...portfolio,
    locale,
    source: "fallback",
  };
}

function extractGalleryFromWork(
  workData: prismic.PrismicDocument["data"],
  fallbackAlt: string,
): { src: string; alt: string }[] {
  const data = (workData ?? {}) as Record<string, unknown>;
  const galleryField = Array.isArray(data.gallery_images) ? data.gallery_images : [];
  return galleryField
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const image = "image" in item ? (item as { image?: { url?: string } }).image : null;
      const alt = "image_alt" in item ? readTextField((item as { image_alt?: unknown }).image_alt) : null;
      if (!image?.url) return null;
      return { src: image.url, alt: alt ?? fallbackAlt };
    })
    .filter((item): item is { src: string; alt: string } => Boolean(item));
}

function mapTrabalhoToWorkSummary(work: prismic.PrismicDocument): WorkSummaryData {
  const workTitle = readTextField(work.data?.title) ?? "";
  const workDescription = readTextField(work.data?.description) ?? "";
  const images = extractGalleryFromWork(work.data, workTitle);
  const coverImage = images.length > 0 ? images[0] : null;
  return {
    title: workTitle,
    description: workDescription,
    coverImage,
    galleryImages: images,
  };
}

function mapCategoriaToPortfolioDetail(
  locale: SupportedLocale,
  categoriaDoc: prismic.PrismicDocument,
  trabalhos: prismic.PrismicDocument[],
  fallback: PortfolioDetailData,
): PortfolioDetailData {
  const data = categoriaDoc.data ?? {};
  const description = readTextField(data.page_description) ?? fallback.description;
  const bodyValue = data.page_description;
  const body = Array.isArray(bodyValue)
    ? (bodyValue as unknown[])
        .map((entry) => readTextField(entry))
        .filter((entry): entry is string => Boolean(entry))
    : fallback.body;

  const beforeAfterImages: { src: string; alt: string }[] = [];
  const works: WorkSummaryData[] = [];
  for (const work of trabalhos) {
    const workTitle = readTextField(work.data?.title) ?? fallback.title;
    const images = extractGalleryFromWork(work.data, workTitle);
    beforeAfterImages.push(...images);
    works.push(mapTrabalhoToWorkSummary(work));
  }

  const { messages } = transformLocaleData(locale);
  const ctaLabel = messages.pages.portfolio_detail.booking_cta;

  return {
    slug: categoriaDoc.uid ?? fallback.slug,
    locale,
    title: readTextField(data.title) ?? fallback.title,
    category: "Categoria",
    description,
    ctaLabel,
    carouselImages: beforeAfterImages,
    body: body.length > 0 ? body : fallback.body,
    beforeAfterImages: beforeAfterImages.length > 0 ? beforeAfterImages : fallback.beforeAfterImages,
    works,
    source: "prismic",
  };
}

async function listFallbackPortfolios(locale: SupportedLocale): Promise<PortfolioDetailData[]> {
  return FALLBACK_PORTFOLIOS[locale].map((portfolio) => mapFallbackPortfolio(locale, portfolio));
}

const listPortfoliosUncached = async (locale: SupportedLocale): Promise<PortfolioDetailData[]> => {
  const fallback = await listFallbackPortfolios(locale);
  const client = createPrismicClient();
  if (!client) {
    return fallback;
  }

  try {
    const categorias = await client.getAllByType(CATEGORIA_TYPE, {
      lang: toPrismicLocale(locale),
      orderings: [
        { field: "my.categoria.order", direction: "asc" },
        { field: "document.first_publication_date", direction: "asc" },
      ],
    });

    if (categorias.length === 0) {
      return fallback;
    }

    const result: PortfolioDetailData[] = [];
    for (let i = 0; i < categorias.length; i++) {
      const cat = categorias[i];
      const catId = cat.id;
      const trabalhos = await client.getAllByType(TRABALHO_TYPE, {
        lang: toPrismicLocale(locale),
        filters: [filter.at("my.trabalho.categorias.categoria", catId)],
        orderings: [
          { field: "my.trabalho.order", direction: "asc" },
          { field: "document.first_publication_date", direction: "asc" },
        ],
      });

      const fallbackItem = fallback[i] ?? fallback[0];
      result.push(mapCategoriaToPortfolioDetail(locale, cat, trabalhos, fallbackItem));
    }

    return result;
  } catch (error) {
    console.error(`[prismic] Failed to load portfolio (categorias/trabalhos) for locale '${locale}'.`, error);
    return fallback;
  }
};

const listPortfolios =
  process.env.NODE_ENV === "development"
    ? listPortfoliosUncached
    : cache(listPortfoliosUncached);

const portfolioAdapter: PortfolioAdapter = {
  async list(locale) {
    const portfolio = await listPortfolios(locale);
    return portfolio.map<PortfolioSummaryData>(
      ({ slug, locale: portfolioLocale, title, category, description, ctaLabel, carouselImages, source }) => ({
        slug,
        locale: portfolioLocale,
        title,
        category,
        description,
        ctaLabel,
        carouselImages: carouselImages ?? [],
        source,
      }),
    );
  },

  async getBySlug(locale, slug) {
    const portfolio = await listPortfolios(locale);
    return portfolio.find((p) => p.slug === slug) ?? null;
  },

  async listRouteRefs() {
    const entries = await Promise.all(
      (["pt-br", "en-us"] as const).map(async (locale) => {
        const portfolio = await listPortfolios(locale);
        return portfolio.map<PortfolioRouteRef>((p) => ({
          locale,
          slug: p.slug,
          source: p.source,
        }));
      }),
    );

    return entries.flat();
  },
};

export function createPortfolioAdapter(): PortfolioAdapter {
  return portfolioAdapter;
}
