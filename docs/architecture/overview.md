> Active architecture overview for the Yolanda Farnese site baseline. This reflects the current repository shape plus known cleanup needed from the previous project.

# Architecture Overview

This architecture serves a multilingual tattoo artist marketing site focused on lead generation, trust building, and portfolio discovery.

## Stack

- Next.js 15 (App Router)
- React 19 + TypeScript
- Tailwind CSS for styling
- Prismic client/adapters already present in `src/shared/prismic/`

## Application Shape

- Global wrapper: `src/app/layout.tsx`
- Root entry: `src/app/page.tsx`
- Locale-hiding and alias redirects: `src/middleware.ts`
- Locale-scoped shell: `src/app/[locale]/layout.tsx`
- Home page: `src/app/[locale]/page.tsx`
- About page: `src/app/[locale]/about/page.tsx`
- Contact page: `src/app/[locale]/contact/page.tsx`
- Procedures/styles listing: `src/app/[locale]/procedures/page.tsx`
- Procedure/style detail: `src/app/[locale]/procedures/[slug]/page.tsx`
- Privacy page: `src/app/[locale]/privacy-policy/page.tsx`
- Catch-all localized slug handler: `src/app/[locale]/[slug]/page.tsx`

Root handling is already middleware-based: the public `/` path rewrites internally to `/pt-br` and hides the default locale in public URLs.

## Rendering Boundaries

- Server components: route pages, metadata generation, and locale layout
- Client components:
  - `src/shared/components/Sidebar/index.tsx`
  - `src/shared/components/ThemeSwitch/index.tsx`
  - `src/shared/components/LocaleLangSync/index.tsx`
  - `src/shared/components/WhatsAppFab/index.tsx`
  - `src/shared/components/ContactQuickForm/index.tsx`

## Localization Model

- Supported locales are defined in `src/shared/config/locales.ts`
- Locale JSON files live in `src/shared/lang/*.json`
- `src/shared/utils/transformLocaleData/index.ts` loads and validates locale message parity
- Route aliases resolve through `src/shared/utils/routing/index.ts`
- Fallback locale is `pt-br`

## Navigation and URL Behavior

- Public default-locale URLs hide the locale prefix
- `getLocalePath()` in `src/shared/config/locales.ts` should be used wherever locale-aware links are generated
- Canonical route targets remain English (`about`, `procedures`, `contact`, `privacy-policy`)
- `src/middleware.ts` handles:
  - redirecting `/pt-br/*` to locale-hidden equivalents
  - rewriting locale-hidden default-locale routes internally
  - redirecting localized aliases to canonical slugs

## Responsive Navigation

- **Mobile:** Hamburger navigation remains the default pattern
- **Header behavior:** Brand, locale switch, theme switch, and booking action remain visible or quickly reachable
- **Primary conversion:** WhatsApp access should never be buried behind more than one extra tap on mobile

## Theme Behavior

- Theme is controlled by class-based dark mode on the root HTML element (`html.dark`)
- User preference persists in `localStorage`
- Initial theme is applied early in `src/app/layout.tsx` to reduce flash during hydration

## Content Sources

- Static business facts: `docs/business-specs/basic-business-info.json`
- Supporting brand references: `docs/business-specs/references/`
- Fixed UI strings: locale JSON files in `src/shared/lang/`
- CMS-managed content: Prismic adapters in `src/shared/prismic/`

## Prismic Surface Area

- Existing custom type schemas:
  - `customtypes/site_settings/index.json`
  - `customtypes/procedure/index.json`
- Existing adapters:
  - `src/shared/prismic/site-settings-adapter.ts`
  - `src/shared/prismic/procedure-adapter.ts`

For the Yolanda build, `site_settings` and `procedure` are the active adapter boundary. Portfolio/work modeling still needs normalization for the later content phase.

## CSS Compatibility Note (Mobile Safari)

- Prefer stable color fallbacks and CSS variables over advanced color functions for critical surfaces
- Avoid `background-attachment: fixed` on touch devices
- Keep tap targets at least `44px` high/wide on mobile

## Known Constraints

- `basic-business-info.json` does not yet include a confirmed Maps URL or full address, so the UI must keep safe non-click fallbacks for location.
- Portfolio/work modeling still needs a dedicated Prismic content type when the implementation moves beyond the current procedure/style scaffold.
- `package-lock.json` still needs to be generated and validated before `npm ci` can be considered stable.
