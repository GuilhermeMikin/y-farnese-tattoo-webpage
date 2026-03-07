# Footer Spec

*Standard pattern for the site footer, including the PiKiTo Pages developer credit.*

## Overview

The footer appears at the bottom of every page. It displays a short note about the business, contact links (WhatsApp, Instagram, location), copyright, and a developer credit line.

## Component

- **Location:** `src/shared/components/Footer/index.tsx`
- **Props:**
  - `messages`: Locale messages for the footer (`LocaleMessages["footer"]`)
  - `siteSettings`: Site settings (Prismic or `basic-business-info.json`) for contact links

## Locale Keys

Footer copy is localized via `src/shared/lang/*.json` under the `footer` key:

| Key | Purpose |
|-----|---------|
| `copyright` | Copyright notice (e.g. "©2026 [Business]. All rights reserved.") |
| `developed_by` | Developer credit line (e.g. "Desenvolvido por PiKiTo Pages" / "Developed by PiKiTo Pages") |
| `note` | Short business tagline or value proposition |
| `links.whatsapp` | Label for WhatsApp link |
| `links.instagram` | Label for Instagram link |
| `links.location` | Label for location/maps link |

## Developer Credit (PiKiTo Pages)

The footer must include a developer credit line using the `developed_by` locale key:

- **pt-BR:** "Desenvolvido por PiKiTo Pages"
- **en-US:** "Developed by PiKiTo Pages"

The credit appears below the copyright, in the same row on larger screens (`sm:flex-row sm:justify-between`) and stacked on smaller screens.

## Type Definition

Ensure `src/shared/types/locale.ts` includes `developed_by` in the footer interface:

```ts
footer: {
  copyright: string;
  developed_by: string;
  note: string;
  links: { instagram: string; location: string; whatsapp: string };
};
```

## Checklist for New Projects

1. Add `developed_by` to `footer` in all locale JSON files
2. Add `developed_by` to the `LocaleMessages["footer"]` type
3. Render `messages.developed_by` in the Footer component
4. Keep the credit line subtle (same `text-xs text-slate-500` styling as copyright)
