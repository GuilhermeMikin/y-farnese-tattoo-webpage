> Active technical routing spec for the Yolanda Farnese site. This copy may change; the source template in `docs/template-specs/` stays untouched.

# Content and Routing Technical Spec

Status: Draft  
Last updated: 2026-03-01

## Technical Baseline

- Framework: Next.js App Router
- Runtime model: mostly static server-rendered pages with client-side navigation widgets
- Content source:
  - Locale JSON for fixed UI strings and small page copy
  - Prismic for `site_settings`, tattoo style/service pages, and portfolio/work entries
- Existing locale infrastructure already lives in `src/middleware.ts`, `src/shared/config/locales.ts`, and `src/shared/utils/transformLocaleData/index.ts`

## Route Contract

1. `/` serves the default locale (`pt-br`) through middleware rewrite while keeping the locale hidden in the public URL.
2. `/{locale}` renders localized home for non-default locales only in public URLs, so `/en-us` is valid and `/pt-br` redirects to `/`.
3. `/about`, `/portfolio`, `/contact`, and `/privacy-policy` serve `pt-br` publicly while being internally rewritten to `/{locale}/...`.
4. `/en-us/about`, `/en-us/portfolio`, `/en-us/contact`, and `/en-us/privacy-policy` remain locale-prefixed.
5. `/{locale}/portfolio/[slug]` stores canonical dynamic detail routes for style/service pages.
6. Public default-locale detail pages hide the locale prefix: `/portfolio/[slug]`.
7. `/{locale}/{slug}`:
   - Redirects known localized aliases to canonical English slugs
   - May render future landing pages only if a dedicated content type is approved
   - Shows the localized fallback only for unsupported slugs after alias checks

## Canonical Slug Policy

- Canonical route slugs remain English for stability:
  - `about`
  - `portfolio`
  - `contact`
  - `privacy-policy`
- Localized aliases redirect to canonical slugs:
  - `pt-br`: `sobre`, `portfolio`, `tatuagens`, `estilos`, `contato`, `orcamento`, `agendar`, `politica-de-privacidade`
  - `en-us`: `about-us`, `portfolio`, `tattoos`, `book`, `contact-us`, `privacy`
- Detail page slugs should also be stored canonically in English when practical, with localized aliases handled at the redirect layer if needed.

## Locale Contract

Each locale file in `src/shared/lang/` must keep the same key set and remain loadable through `transformLocaleData`.

Minimum expected key groups:

- `SEO`
- `footer`
- `header`
- `pages.about`
- `pages.contact`
- `pages.home`
- `pages.portfolio`
- `pages.privacy_policy`
- `under_construction`

If new keys are added for tattoo-specific sections such as featured work, portfolio filters, or booking FAQs, they must be added to both `pt-br.json` and `en-us.json` in the same change.

## Localization Rules

1. Supported locale keys remain `pt-br` and `en-us`.
2. `pt-br` is the default locale and fallback locale.
3. Public URLs hide `pt-br`, but internal route handling remains locale-aware.
4. Canonical page slugs remain English even when the visible navigation labels are localized.
5. `basic-business-info.json` is the primary source for static business facts; locale JSON files translate or present those facts, but should not contradict them.

## Content Source Strategy

- Keep fixed UI strings, navigation labels, error/fallback states, and short static copy in locale JSON.
- Use Prismic as the primary source for:
  - `site_settings`
  - `portfolio` or renamed `service` content type for tattoo styles/services
  - `work` content type for portfolio entries
- Do not introduce `course` or `landing_page` into the active build unless new reference material explicitly supports them.

## Theme Contract

1. Theme switch must remain visible in the header next to the language selector.
2. Theme uses class-based dark mode (`html.dark`), defaults to light when no preference is stored, and persists preference in `localStorage`.
3. Theme labels are localized in `header.theme` for each locale file.
4. Light and dark styles must render correctly on every localized route, including portfolio details and fallback pages.

## Metadata Rules

- Metadata must draw brand name, title, description, and contact intent from `basic-business-info.json`.
- Home metadata should emphasize:
  - `Yolanda Farnese`
  - `Tattoo Artist`
  - `Fine Line`
  - `Blackwork`
  - `Uberlandia - MG`
- Detail page metadata should use the pattern:
  - Title: `<Style or Work Title> | Yolanda Farnese`
  - Description: short human-readable summary plus location and primary style cue
- Canonical URLs must reflect locale-hidden `pt-br` URLs and locale-prefixed `en-us` URLs.

## Sitemap and Robots Notes

- Sitemap should include canonical page routes for both locales and all published Prismic detail pages.
- Do not index duplicate alias routes; redirect them before indexing.
- `robots.ts` should allow crawl of production pages and exclude preview or simulator endpoints.

## Change Workflow

For routing, content, or navigation changes:

1. Update `basic-business-info.json` first when the change affects business facts.
2. Update `pt-br` locale content next.
3. Apply matching key changes to `en-us`.
4. Update Prismic adapters, route alias maps, or middleware only if the content model or URL contract changes.
5. Validate locale switching, alias redirects, and theme switching manually.
6. Run `npm run lint` and `npm run build` once the repository scripts exist and the package manifest is corrected.

## Quality Gates

- No missing locale keys between `pt-br` and `en-us`
- No broken WhatsApp or Instagram links
- No route regressions for locale-hidden default URLs
- No alias route resolving to stale page types
- Metadata remains aligned with Yolanda's tattoo positioning and location
