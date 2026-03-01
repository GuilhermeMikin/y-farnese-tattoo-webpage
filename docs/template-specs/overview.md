> Template - copy to create a new site spec. DO NOT EDIT for the Debora Lima site.

# Architecture Overview

*Copy this file to `overview.md` and fill placeholders. Describes the standard app structure for similar sites.*

This architecture serves a multilingual [business type] site focused on [primary goal: e.g. lead generation, trust building, conversion].

## Stack

- Next.js 15 (App Router)
- React 19 + TypeScript
- Tailwind CSS for styling

## Application Shape

- Global wrapper: `src/app/layout.tsx`
- Locale-scoped shell: `src/app/[locale]/layout.tsx`
- Home page: `src/app/[locale]/page.tsx`
- About page: `src/app/[locale]/about/page.tsx`
- Contact page: `src/app/[locale]/contact/page.tsx`
- Catch-all localized slug handler: `src/app/[locale]/[slug]/page.tsx` (aliases, dynamic categories, fallback)

Root redirect: `src/app/page.tsx` or middleware rewrites/redirects to `/[default-locale]` (optional: hide default locale from URL).

## Rendering Boundaries

- Server components: route pages and locale layout
- Client components:
  - `src/shared/components/Sidebar/index.tsx` (navigation, language switch, theme switch host)
  - `src/shared/components/ThemeSwitch/index.tsx` (theme toggle + persistence)
  - [Add project-specific client components: e.g. PortfolioCardCarousel, ContactQuickForm]

## Localization Model

- Locale JSON files live in `src/shared/lang/*.json`
- `src/shared/utils/transformLocaleData/index.ts` dynamically loads locale data
- Locale typing is defined in `src/shared/types/*.ts`
- Fallback locale is `[default-locale]` for unsupported locale keys

## Navigation and URL Behavior

- Sidebar builds routes from locale + menu URLs (use `getLocalePath()` if default locale is hidden from URL)
- Canonical route targets are `/about` and `/contact`
- `src/app/[locale]/[slug]/page.tsx` maps localized aliases to canonical slugs and redirects; optionally renders dynamic category pages

## Responsive Navigation

- **Mobile (default):** The main navigation uses a hamburger menu (slide-out drawer). Brand and tagline stay visible in the header. This is the default unless the business spec states otherwise.

## Theme Behavior

- Theme is controlled by class-based dark mode on the root HTML element (`html.dark`)
- Header toggle writes user preference to `localStorage` (`[project-slug]-theme`)
- Initial theme is applied early in `src/app/layout.tsx` to reduce flash during hydration

## CSS Compatibility Note (Mobile Safari)

- Some iPhone/iOS Safari and embedded WebView versions fail or render inconsistently with advanced CSS color composition.
- Use stable color fallbacks (hex/rgba and CSS variables) instead of `color-mix(...)` for critical surfaces and borders.
- Touch devices: use `background-attachment: scroll` (not `fixed`) to avoid repaint artifacts.

## Content Sources

- Locale JSON for page copy; portfolio/gallery may come from a CMS (e.g. Prismic) or repository files

## Known Constraints

- Supported locales are duplicated in `transformLocaleData` and `Sidebar`—keep in sync
- Metadata is mostly static in `src/app/[locale]/layout.tsx`
- [Add project-specific constraints]
