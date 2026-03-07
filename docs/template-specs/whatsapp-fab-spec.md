> Template - copy to create a new site spec. DO NOT EDIT for the Debora Lima site.

# WhatsApp Floating Action Button (FAB) Spec

*Standard pattern for the persistent WhatsApp CTA across all pages.*

## Overview

The WhatsApp FAB is a fixed button in the bottom-right corner that appears on every page. It uses an **icon** (not text) for a compact, recognizable call-to-action.

## Asset

- **Path:** `public/whatsapp-icon.png`
- **Format:** PNG (transparent or solid background)
- **Recommended:** Icon with white elements on dark/transparent background for contrast on brand-colored button

## Component

- **Location:** `src/shared/components/WhatsAppFab/index.tsx`
- **Props:**
  - `href`: WhatsApp deep link (e.g. `https://wa.me/...`)
  - `label`: Accessible label for screen readers (`aria-label`); use localized text (e.g. "Chamar no WhatsApp", "Message on WhatsApp")

## Implementation Pattern

```tsx
import Image from "next/image";

type WhatsAppFabProps = {
  href: string;
  label: string;
};

export default function WhatsAppFab({ href, label }: WhatsAppFabProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="fixed bottom-5 right-5 z-40 inline-flex min-h-12 min-w-12 items-center justify-center rounded-full bg-brand p-3 shadow-lg hover:bg-brand-dark dark:bg-brand-dark dark:shadow-black/30 dark:hover:bg-brand"
    >
      <Image
        src="/whatsapp-icon.png"
        alt=""
        width={28}
        height={28}
        className="h-7 w-7"
      />
    </a>
  );
}
```

## Usage

The FAB is rendered in the locale layout (`src/app/[locale]/layout.tsx`):

```tsx
<WhatsAppFab
  href={siteSettings.whatsappHref}
  label={siteSettings.primaryCtaLabel}
/>
```

- `whatsappHref` comes from site settings (Prismic or `basic-business-info.json`)
- `primaryCtaLabel` comes from locale JSON (`header.primary_cta`) for accessibility

## Checklist for New Projects

1. Add `whatsapp-icon.png` to `public/`
2. Ensure `WhatsAppFab` uses the icon (not text) as implemented above
3. Keep `aria-label` with localized text for accessibility
4. Link is `target="_blank"` and `rel="noreferrer"`
