# Documentation System

This project uses a lean, spec-driven docs set for the **Yolanda Farnese** marketing and portfolio website. The active docs below are the source for planning and implementation. Template docs in `docs/template-specs/` stay unchanged and exist only as reusable references.

## Reality Check

The repository already contains application code, Prismic-related files, and leftover configuration from a previous project. The active docs in this folder define the target Yolanda Farnese direction without deleting that legacy context yet.

## Active Docs

| Document | Purpose |
|----------|---------|
| `docs/business-specs/basic-business-info.json` | Primary source of truth for brand name, CTA links, location, and core SEO facts |
| `docs/business-specs/site-spec.md` | Product goals, audience, page inventory, initial copy drafts, and scope |
| `docs/tech-specs/content-routing-spec.md` | Locale policy, route contract, metadata rules, and content-source strategy |
| `docs/architecture/overview.md` | Current app structure, Prismic baseline, and known technical constraints |
| `docs/guidelines/content-guidelines.md` | Content guardrails, proof rules, and maintenance hygiene |
| `docs/ai/context-pack.md` | Token-efficient context loading order for AI-assisted work |
| `docs/plans/00-project-init.md` | Repo scan, environment baseline, dependency validation, and blockers |
| `docs/plans/01-build-plan.md` | Full build plan for the Yolanda Farnese website with Prismic |

## Decisions

| Document | Purpose |
|----------|---------|
| `docs/decisions/0001-locale-url-policy.md` | Records the hidden `pt-br` public URL policy |
| `docs/decisions/0002-content-source-strategy.md` | Records the Prismic vs locale JSON content split |
| `docs/decisions/0003-contact-conversion-strategy.md` | Records the WhatsApp-first conversion hierarchy |

## Reference Inputs

| Path | Notes |
|------|-------|
| `docs/business-specs/references/colors.md` | Short color direction note from the reference material |
| `docs/business-specs/references/image.png` | Portfolio screenshot used for style/tone and visual direction |
| `docs/business-specs/references/instagram.png` | Instagram profile screenshot used for proof points and profile framing |

## Template References

| Document | Purpose |
|----------|---------|
| `docs/template-specs/README.md` | Template project README reference |
| `docs/template-specs/docsREADME.md` | Template docs index/reference |
| `docs/template-specs/business-basic-info-template.md` | Contract for the desired business info structure |
| `docs/template-specs/business-spec.md` | Template business spec source |
| `docs/template-specs/content-routing-spec.md` | Template routing spec source |
| `docs/template-specs/overview.md` | Template architecture overview source |
| `docs/template-specs/context-pack.md` | Template AI context-pack source |
| `docs/template-specs/content-guidelines.md` | Template content-guidelines source |
| `docs/template-specs/prismic-slice-machine-setup-guide.md` | Reference guide for Slice Machine and Prismic setup |

## Working Order

1. Confirm business facts in `docs/business-specs/basic-business-info.json`.
2. Confirm product intent in `docs/business-specs/site-spec.md`.
3. Confirm routing and locale behavior in `docs/tech-specs/content-routing-spec.md`.
4. Confirm implementation constraints in `docs/architecture/overview.md`.
5. Implement changes and update impacted docs in the same change.
