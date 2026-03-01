> Template - copy to create a new site spec. DO NOT EDIT for the Debora Lima site.

# Content and Routing Technical Spec

Status: [Active | Draft]  
Last updated: [YYYY-MM-DD]

*Copy this file to `content-routing-spec.md` and fill placeholders. This spec is fixed across similar sites—only project-specific values change.*

## Technical Baseline

- Framework: Next.js App Router
- Runtime model: mostly static server-rendered pages with client-side navigation widgets
- Content source: locale JSON files; portfolio/gallery may use a CMS (e.g. Prismic) or repository files

## Route Contract

1. `/` redirects to `/[default-locale]` or serves default locale (optional: hide default locale from URL via middleware)
2. `/{locale}` renders localized home
3. `/{locale}/about` renders localized about
4. `/{locale}/contact` renders localized contact
5. `/{locale}/{slug}`:
   - Renders dynamic category/gallery pages if slug matches (optional, for portfolio/menu sites)
   - Redirects known localized aliases to canonical slugs (`about`, `contact`)
   - Shows localized under-construction fallback for unknown slugs

## Locale Contract

Each locale file in `src/shared/lang/` must include the same key set:

- `SEO`
- `footer`
- `header`
- `pages.about`
- `pages.contact`
- `pages.home`
- `under_construction`
- [Add keys for optional features: e.g. `pages.home.portfolio` for portfolio sites]

The expected shape is typed in `src/shared/types/` and loaded by `transformLocaleData`.

## Localization Rules

1. Supported locale keys must be declared in `transformLocaleData`
2. Language selector options must be kept in sync with supported locale keys
3. Fallback locale is `[default-locale]` when key is unsupported
4. Canonical page slugs remain English (`about`, `contact`) for route stability

## Theme Contract

1. Theme switch must be visible in the header, next to the language selector.
2. Theme must use class-based dark mode (`html.dark`), default to light when no preference is stored, and persist preference in `localStorage` under `[project-slug]-theme` (e.g. `deb-lima-theme`).
3. Theme labels are localized in `header.theme` for each locale file.
4. Light and dark styles must render correctly on every localized route, including under-construction fallback pages.

## Change Workflow

For content or navigation changes:

1. Update `[default-locale]` first
2. Apply equivalent key changes to all locale JSON files
3. Validate route, language switching, and theme switching manually
4. Run: `npm run lint`, `npm run build`

## Quality Gates

- No missing locale keys
- No broken links in contact/quote/lead channels
- No route regressions for localized alias redirects
- No page-level regressions when switching between light and dark themes
- Metadata remains accurate for [business positioning and discovery]
