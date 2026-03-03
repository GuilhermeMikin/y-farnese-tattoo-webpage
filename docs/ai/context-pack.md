> Token-efficient context guide for Yolanda Farnese site work.

# AI Context Pack

Purpose: help AI assistants complete tasks with minimal tokens and minimal regressions.

## Start Here

For most tasks, load in this order:

1. `docs/business-specs/site-spec.md`
2. `docs/tech-specs/content-routing-spec.md`
3. `docs/architecture/overview.md`
4. `docs/business-specs/basic-business-info.json`
5. Only then load code files directly related to the task

If the task is content-heavy, also inspect `docs/business-specs/references/` before touching copy or taxonomy.

## Task-Specific Context

Copy/content edits:

- Load `docs/business-specs/basic-business-info.json`
- Load `docs/business-specs/references/`
- Load `src/shared/lang/pt-br.json`
- Load `src/shared/lang/en-us.json` only if key parity or translation is affected

Routing/navigation edits:

- Load `src/middleware.ts`
- Load `src/shared/config/locales.ts`
- Load `src/shared/utils/routing/index.ts`
- Load `src/shared/utils/transformLocaleData/index.ts`
- Load `src/shared/components/Sidebar/index.tsx`

Prismic/modeling edits:

- Load `customtypes/site_settings/index.json`
- Load `customtypes/portfolio/index.json`
- Load `src/shared/prismic/site-settings-adapter.ts`
- Load `src/shared/prismic/portfolio-adapter.ts`
- Load `src/shared/prismic/client.ts`

Page/layout edits:

- Load `src/app/layout.tsx`
- Load `src/app/[locale]/layout.tsx`
- Load the target route file
- Load `src/app/globals.css`

Metadata/SEO edits:

- Load `src/shared/config/site.ts`
- Load `src/app/sitemap.ts`
- Load `src/app/robots.ts`
- Load route-level metadata producers if present

## Guardrails

1. `docs/business-specs/basic-business-info.json` is the first source of truth for business facts.
2. `docs/business-specs/references/` can refine tone, style names, proof points, and visual direction, but must not override confirmed facts in the JSON.
3. Do not edit files in `docs/template-specs/`.
4. Keep canonical slugs stable unless an ADR changes the routing policy.
5. Preserve locale key parity across all `src/shared/lang/*.json` files.
6. Keep the WhatsApp-first conversion path intact across pages and locales.
7. Prefer small, reversible changes that do not widen scope beyond the active build plan.

## Definition of Done

1. Relevant active docs still match the implementation direction.
2. No locale key drift is introduced.
3. Default-locale hiding and alias redirects still behave as specified.
4. WhatsApp, Instagram, and location entry points remain coherent across the site.
5. `npm run lint` and `npm run build` pass, unless blocked by the current package baseline documented in `docs/plans/00-project-init.md`.
