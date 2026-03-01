> Template - copy to create a new site spec. DO NOT EDIT for the Debora Lima site.

# AI Context Pack

Purpose: help AI assistants complete tasks with minimal tokens and minimal regressions.

For fullstack persona (architecture reviews, implementation plans, Cursor prompts), see `docs/ai/fullstack-persona-for-gpt.md`.

## Start Here

For most tasks, load in this order:

1. `docs/business-specs/[client]-site-spec.md` (or `template-business-spec.md` if unfilled)
2. `docs/tech-specs/content-routing-spec.md`
3. `docs/architecture/overview.md`
4. Only then load code files directly related to the task

## Task-Specific Context

Copy/content edits:
- Load `src/shared/lang/[default-locale].json` (or `en-us.json` if structure source)
- Load corresponding locale JSON files only if keys change

Routing/navigation edits:
- Load `src/app/[locale]/[slug]/page.tsx`
- Load `src/shared/components/Sidebar/index.tsx`
- Load `src/shared/utils/transformLocaleData/index.ts`

Visual/layout edits:
- Load `src/app/[locale]/layout.tsx`
- Load target page files
- Load `src/app/globals.css` and `tailwind.config.ts`

[Gallery/portfolio/menu] edits:
- Content may come from a CMS (e.g. Prismic) or repository; load adapter/resolver if used
- Load relevant component (e.g. `PortfolioCardCarousel`, `ContactQuickForm`)
- Load page where it is rendered

## Guardrails

1. Do not introduce new docs unless current docs cannot express the decision
2. Keep canonical slugs stable unless a decision record is added
3. Preserve locale key parity across all `src/shared/lang/*.json` files
4. Keep quote and contact entry points consistent with the business spec
5. Prefer small, reversible changes

## Definition of Done

1. Relevant spec docs still match the implementation
2. No locale key drift introduced
3. Lead-generation flows (quote/contact/WhatsApp paths) remain coherent across locales
4. `npm run lint` and `npm run build` pass (unless blocked by unrelated issues)
