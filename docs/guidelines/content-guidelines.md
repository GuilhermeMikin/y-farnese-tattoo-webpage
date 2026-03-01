> Active contribution guide for the Yolanda Farnese project.

# Content and Contribution Guidelines

## Writing Style

- Use direct, grounded language with a strong visual/artistic tone
- Prefer short sentences and specific wording over abstract lifestyle language
- Avoid hype wording, medicalized claims, or promises about pain, healing, permanence, or results without support
- Use Portuguese (`pt-br`) as the base writing voice, then adapt to English naturally instead of translating word-for-word

## Yolanda Farnese Brand Consistency

- Emphasize tattoo discovery, visual confidence, and fast contact conversion
- Keep **Fine Line** and **Blackwork** naming exact and consistent with the source materials
- Distinguish clearly between:
  - confirmed business facts from `basic-business-info.json`
  - observed portfolio traits from screenshot references
  - future claims that still need confirmation
- Keep CTAs explicit and quick: WhatsApp first, Instagram second, location context third
- When describing work, prefer wording around style, composition, line quality, contrast, and artistic interpretation

## Proof and Claims Rules

1. Do not invent client counts, years of experience, awards, certifications, or studio policies.
2. If a proof point comes from a screenshot, attribute it carefully in working docs and treat it as capture-time evidence, not permanent truth.
3. Use placeholders or `Pending confirmations` when a detail is commercially important but not yet verified.

## Localization Rules

1. Keep the same semantic meaning across locales.
2. Keep JSON key structure identical in all locale files.
3. Use `pt-br` as the source of truth for structure changes unless implementation requires otherwise.
4. Keep visible navigation labels localized while canonical route slugs stay in English.

## Technical Hygiene

1. Keep canonical route slugs as `about`, `procedures`, `contact`, and `privacy-policy`.
2. Keep supported locales synchronized between:
   - `src/shared/config/locales.ts`
   - `src/shared/utils/transformLocaleData/index.ts`
   - any locale-switch UI components
3. Keep `header.theme` labels synchronized across locale files.
4. Avoid adding dependencies unless they solve a recurring need.
5. For critical panel, background, and border styles, prefer broadly supported CSS values and add explicit fallbacks before advanced functions.

## Update Checklist

Before finishing a change:

1. Confirm relevant docs still match code.
2. Confirm no broken links in WhatsApp, Instagram, and location-related CTAs.
3. Confirm no unsupported claims were introduced into copy.
4. Run `npm run lint` once the repository scripts exist.
5. Run `npm run build` for structural changes once the package manifest is corrected.
6. For visual/style changes, test at least one iPhone Safari device or emulator and one Android browser.
