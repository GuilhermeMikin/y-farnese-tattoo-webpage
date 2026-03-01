import "server-only";
import { cache } from "react";
import type * as prismic from "@prismicio/client";
import { createPrismicClient } from "./client";
import { toPrismicLocale } from "./locales";
import { readTextField } from "./helpers";
import type {
  PrismicDocumentData,
  ProcedureAdapter,
  ProcedureDetailData,
  ProcedureRouteRef,
  ProcedureSummaryData,
} from "./types";

import type { SupportedLocale } from "@/shared/types/locale";

type FallbackProcedure = Omit<ProcedureDetailData, "locale" | "source">;

const FALLBACK_PROCEDURES: Record<SupportedLocale, FallbackProcedure[]> = {
  "pt-br": [
    {
      slug: "fine-line",
      title: "Fine Line",
      category: "Estilo",
      description: "Traços delicados, composição leve e leitura precisa para ideias que pedem sutileza.",
      ctaLabel: "Pedir orçamento",
      body: [
        "Esta rota já está pronta para receber descrição editorial, referências e galeria via Prismic.",
        "Use este placeholder para validar navegação, shell e estrutura de conteúdo sem depender do CMS preenchido.",
      ],
      beforeAfterImages: [],
    },
    {
      slug: "blackwork",
      title: "Blackwork",
      category: "Estilo",
      description: "Composições de maior contraste e presença visual para propostas com peso gráfico mais marcado.",
      ctaLabel: "Pedir orçamento",
      body: [
        "A modelagem atual suporta resumo, corpo, CTA e galeria sem expor shapes crus do Prismic para a UI.",
      ],
      beforeAfterImages: [],
    },
    {
      slug: "lettering-symbols",
      title: "Lettering e Símbolos",
      category: "Portfolio",
      description: "Categoria inicial para trabalhos com frases curtas, palavras, símbolos e composições minimalistas.",
      ctaLabel: "Pedir orçamento",
      body: [
        "As nomenclaturas finais ainda dependem de confirmação editorial, mas a estrutura da rota permanece estável.",
      ],
      beforeAfterImages: [],
    },
    {
      slug: "illustrated-pieces",
      title: "Peças Ilustradas",
      category: "Portfolio",
      description: "Agrupamento inicial para peças ilustradas observadas nas referências visuais do perfil.",
      ctaLabel: "Pedir orçamento",
      body: [
        "Quando o conteúdo estiver no Prismic, esta página pode receber narrativa de estilo, galeria e FAQs específicas.",
      ],
      beforeAfterImages: [],
    },
  ],
  "en-us": [
    {
      slug: "fine-line",
      title: "Fine Line",
      category: "Style",
      description: "Delicate linework and lighter compositions for ideas that need precision without visual weight.",
      ctaLabel: "Request quote",
      body: [
        "This route is ready to receive editorial copy, references, and gallery content from Prismic.",
      ],
      beforeAfterImages: [],
    },
    {
      slug: "blackwork",
      title: "Blackwork",
      category: "Style",
      description: "Higher-contrast compositions for tattoo ideas with a stronger graphic presence.",
      ctaLabel: "Request quote",
      body: [
        "The current model already separates adapter output from UI so the final CMS content can drop in safely.",
      ],
      beforeAfterImages: [],
    },
    {
      slug: "lettering-symbols",
      title: "Lettering and Symbols",
      category: "Portfolio",
      description: "Initial category for short phrases, symbols, and more minimal tattoo compositions.",
      ctaLabel: "Request quote",
      body: [
        "Final naming still depends on editorial confirmation, but the route contract is already stable.",
      ],
      beforeAfterImages: [],
    },
    {
      slug: "illustrated-pieces",
      title: "Illustrated Pieces",
      category: "Portfolio",
      description: "Initial grouping for illustrated work observed in the current visual references.",
      ctaLabel: "Request quote",
      body: [
        "Once content is published in Prismic, this page can receive style narrative, gallery content, and supporting FAQ.",
      ],
      beforeAfterImages: [],
    },
  ],
};

const PROCEDURE_TYPE = "procedure";

function mapFallbackProcedure(locale: SupportedLocale, procedure: FallbackProcedure): ProcedureDetailData {
  return {
    ...procedure,
    locale,
    source: "fallback",
  };
}

function mapPrismicProcedureDocument(
  locale: SupportedLocale,
  document: prismic.PrismicDocument<PrismicDocumentData>,
  fallback: ProcedureDetailData,
): ProcedureDetailData {
  const galleryField = Array.isArray(document.data.before_after_gallery)
    ? document.data.before_after_gallery
    : [];
  const beforeAfterImages = galleryField
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null;
      }

      const image = "image" in item ? (item as { image?: { url?: string } }).image : null;
      const alt = "image_alt" in item ? readTextField((item as { image_alt?: unknown }).image_alt) : null;

      if (!image?.url) {
        return null;
      }

      return {
        src: image.url,
        alt: alt ?? fallback.title,
      };
    })
    .filter((item): item is { src: string; alt: string } => Boolean(item));

  const bodyValue = document.data.body;
  const body = Array.isArray(bodyValue)
    ? bodyValue
        .map((entry) => readTextField(entry))
        .filter((entry): entry is string => Boolean(entry))
    : fallback.body;

  return {
    ...fallback,
    slug: document.uid ?? fallback.slug,
    locale,
    title: readTextField(document.data.title) ?? fallback.title,
    category: readTextField(document.data.category) ?? fallback.category,
    description: readTextField(document.data.summary) ?? fallback.description,
    ctaLabel: readTextField(document.data.cta_label) ?? fallback.ctaLabel,
    body: body.length > 0 ? body : fallback.body,
    beforeAfterImages,
    source: "prismic",
  };
}

async function listFallbackProcedures(locale: SupportedLocale): Promise<ProcedureDetailData[]> {
  return FALLBACK_PROCEDURES[locale].map((procedure) => mapFallbackProcedure(locale, procedure));
}

const listProceduresUncached = async (locale: SupportedLocale): Promise<ProcedureDetailData[]> => {
  const fallback = await listFallbackProcedures(locale);
  const client = createPrismicClient();
  if (!client) {
    return fallback;
  }

  try {
    const documents = (await client.getAllByType(PROCEDURE_TYPE, {
      lang: toPrismicLocale(locale),
      orderings: [{ field: "my.procedure.title", direction: "asc" }],
    })) as prismic.PrismicDocument<PrismicDocumentData>[];

    if (documents.length === 0) {
      return fallback;
    }

    return documents.map((document, index) =>
      mapPrismicProcedureDocument(locale, document, fallback[index] ?? fallback[0]),
    );
  } catch (error) {
    console.error(`[prismic] Failed to load procedures for locale '${locale}'.`, error);
    return fallback;
  }
};

const listProcedures =
  process.env.NODE_ENV === "development"
    ? listProceduresUncached
    : cache(listProceduresUncached);

const procedureAdapter: ProcedureAdapter = {
  async list(locale) {
    const procedures = await listProcedures(locale);
    return procedures.map<ProcedureSummaryData>(
      ({ slug, locale: procedureLocale, title, category, description, ctaLabel, source }) => ({
        slug,
        locale: procedureLocale,
        title,
        category,
        description,
        ctaLabel,
        source,
      }),
    );
  },

  async getBySlug(locale, slug) {
    const procedures = await listProcedures(locale);
    return procedures.find((procedure) => procedure.slug === slug) ?? null;
  },

  async listRouteRefs() {
    const entries = await Promise.all(
      (["pt-br", "en-us"] as const).map(async (locale) => {
        const procedures = await listProcedures(locale);
        return procedures.map<ProcedureRouteRef>((procedure) => ({
          locale,
          slug: procedure.slug,
          source: procedure.source,
        }));
      }),
    );

    return entries.flat();
  },
};

export function createProcedureAdapter(): ProcedureAdapter {
  return procedureAdapter;
}
