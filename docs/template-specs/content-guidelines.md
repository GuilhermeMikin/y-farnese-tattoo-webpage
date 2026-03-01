> Template - copy to create a new site spec. DO NOT EDIT for the Debora Lima site.

# Content and Contribution Guidelines

*Copy this file to `content-and-contribution-guidelines.md` and fill placeholders. Adapt brand section to the client.*

## Writing Style

- Use direct, professional language
- Prefer short sentences and concrete claims
- Avoid hype wording without evidence

## [Client/Business] Brand Consistency

- Emphasize outcomes for [target audience]: [e.g. discovery, trust, conversion]
- Keep [service/product] descriptions clear and specific
- Keep calls to action explicit, fast, and welcoming (contact form, WhatsApp, etc.)

## Localization Rules

1. Keep the same semantic meaning across locales
2. Keep JSON key structure identical in all locale files
3. Use `[structure-source-locale]` (e.g. `en-us`) as source of truth for structure changes

## Technical Hygiene

1. Keep canonical route slugs as `about` and `contact`
2. Keep supported locales synchronized between:
   - `src/shared/utils/transformLocaleData/index.ts`
   - `src/shared/components/Sidebar/index.tsx`
3. Keep `header.theme` labels synchronized across locale files (`label`, `light_label`, `dark_label`)
4. Avoid adding dependencies unless they solve a clear recurring need
5. For critical panel/background/border styles, prefer broadly supported CSS values and add explicit fallbacks before advanced functions

## Update Checklist

Before finishing a change:

1. Confirm relevant docs still match code
2. Confirm no broken links in contact, [portfolio/menu/etc.], and primary CTA sections
3. Run `npm run lint`
4. Run `npm run build` for structural changes
5. For visual/style changes, test at least one iPhone Safari device/emulator and one Android browser
