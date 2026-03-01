# Yolanda Farnese Website Build Plan

- Status: Draft
- Date: 2026-03-01

## Objective

Build a multilingual marketing and portfolio website for **Yolanda Farnese** using the existing Next.js App Router baseline, with **`pt-br` hidden in public URLs**, **`en-us` locale-prefixed**, and **WhatsApp as the primary conversion CTA**. Content decisions should stay anchored to `docs/business-specs/basic-business-info.json` first, then the screenshot references, with Prismic powering the tattoo styles/services and portfolio content rather than hard-coded repository-only data.

## 5.1 Information Architecture

Baseline page set for the initial delivery:

- Home
- About
- Portfolio / Styles listing
- Style / service detail
- Contact / Booking
- Privacy Policy

Adjusted labels for this brand:

- Navigation label in `pt-br`: `Portfolio` or `Estilos`
- Canonical route slug remains `procedures`
- Detail pages represent tattoo styles/services and can embed related portfolio imagery

Supporting structure:

- Hero and booking path on Home
- Featured work on Home
- About section with artistic approach and location context
- Listing page for Fine Line, Blackwork, and future supported tags
- Detail pages for style/service narratives
- Contact page with WhatsApp, Instagram, and location context

Not included in the initial IA:

- Course page
- Blog
- Campaign landing pages

These remain out of scope unless future references justify them.

## 5.2 Content Model (Prismic)

Use the following active content model:

- `site_settings`
  - Brand name
  - Tagline
  - CTA labels
  - WhatsApp link
  - Instagram link
  - Maps link
  - Address label/full address
  - SEO defaults if moved from code later

- `procedure` or renamed `service`
  - UID
  - Title
  - Style/category
  - Summary
  - Full body content
  - CTA label
  - Gallery
  - Optional related portfolio references

- `work`
  - UID
  - Title
  - Primary style tag
  - Cover image
  - Gallery images
  - Short description
  - Optional relationship to a `procedure/service`
  - Display order / featured flag

Optional types:

- Do **not** activate `course` for the Yolanda build with the current references.
- Do **not** add `landing_page` unless future campaign material requires it.

## 5.3 Slice Strategy

Keep the initial build conservative.

- Use fixed route layouts for Home, About, Contact, and Privacy.
- Use structured fields, groups, and content relationships for `procedure/service` and `work`.
- Avoid a slice-heavy architecture for the first delivery because the current content needs are mostly stable and taxonomy-driven.
- Reserve Slice Machine slices for future marketing experiments only if the project later needs campaign-specific landing pages.

This keeps the portfolio and style system easy to model while avoiding unnecessary CMS complexity.

## 5.4 Locale Strategy

- Supported locales: `pt-br`, `en-us`
- Default locale: `pt-br`
- Public URL policy:
  - Hide `pt-br` from public URLs
  - Keep `en-us` locale-prefixed
  - Redirect `/pt-br/*` to the locale-hidden equivalent
- Canonical slugs remain English:
  - `about`
  - `procedures`
  - `contact`
  - `privacy-policy`
- Localized aliases redirect to canonical slugs
- `pt-br` content should be authored first, then adapted into `en-us`

## 5.5 Routing + SEO

Routing:

- `/` => localized Home for `pt-br`
- `/about`, `/procedures`, `/procedures/[slug]`, `/contact`, `/privacy-policy`
- `/en-us`, `/en-us/about`, `/en-us/procedures`, `/en-us/procedures/[slug]`, `/en-us/contact`, `/en-us/privacy-policy`

SEO rules:

- Use metadata defaults derived from `basic-business-info.json`
- Home title pattern:
  - `Yolanda Farnese | Tattoo Artist`
- Home description pattern:
  - Tattoo positioning + `Fine Line`, `Blackwork`, and `Uberlandia - MG`
- Detail title pattern:
  - `<Title> | Yolanda Farnese`
- Detail description pattern:
  - style/service summary plus location context
- Canonical URLs must use locale-hidden `pt-br` paths and locale-prefixed `en-us` paths
- Redirect alias routes before indexing
- Sitemap must include both locales plus all published detail pages
- `robots.ts` should allow production pages and exclude preview/simulator endpoints

## 5.6 Delivery Milestones

1. Normalize repository configuration and package manifest so the project can lint and build reliably.
2. Replace previous-brand business data, metadata, and locale copy with Yolanda-specific content.
3. Normalize Prismic schemas and adapters around `site_settings`, `procedure/service`, and `work`.
4. Implement core pages and routing with the hidden-default-locale policy intact.
5. Populate initial Prismic content and verify SEO, accessibility, and mobile behavior.

## 5.7 Acceptance Criteria

- Mobile navigation remains usable with clear booking access on small screens.
- Primary interactive controls meet a minimum `44px` target size on touch devices.
- Light and dark themes work consistently across all shipped pages.
- Keyboard navigation works for header controls, menus, locale switching, and primary CTA paths.
- WhatsApp remains reachable within two interactions from every primary page.
- Default locale URLs stay hidden publicly while `en-us` remains prefixed.
- No missing locale keys between `pt-br` and `en-us`.
- Lighthouse targets for production pages:
  - Performance: `>= 80`
  - Accessibility: `>= 90`
  - Best Practices: `>= 90`
  - SEO: `>= 90`

## 5.8 Rollback Plan

Rollback track A: disable Prismic-driven content

- Freeze or bypass Prismic reads
- Fall back to repository-managed static content for critical pages
- Preserve the same public routes so marketing links do not break

Rollback track B: revert locale URL policy

- Remove middleware rewriting/redirect logic that hides `pt-br`
- Expose locale-prefixed routes for both locales consistently
- Regenerate canonicals, sitemap entries, and internal links to match the explicit locale format

## Recommended Build Sequence

1. Repair package management baseline (`package.json`, lockfile, scripts).
2. Update site-level config and locale JSON to Yolanda's business facts.
3. Normalize `slicemachine.config.json`, Prismic adapters, and custom types.
4. Implement shared layout, metadata, navigation, and contact CTA behavior.
5. Build Home, About, Portfolio/Styles listing, detail, Contact, and Privacy pages.
6. Load initial Prismic content and test locale, theme, SEO, and accessibility behavior.
