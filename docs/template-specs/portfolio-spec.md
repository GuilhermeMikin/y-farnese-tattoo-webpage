# Portfolio Spec

*Template specification for the portfolio section: cards with image carousels, category pages with work galleries, and lightbox/expand behavior.*

## Overview

The portfolio displays work in two contexts:

1. **Home/Portfolio page cards** — Category cards with autoplay carousels linking to category detail pages.
2. **Category pages** — Individual works within a category, each with a non-autoplay gallery.

Both use the same underlying `PortfolioImageGallery` component, which provides:
- Carousel with previous/next navigation and dot indicators
- Click-to-expand lightbox
- Keyboard support (Escape to close, arrows to navigate)

## Architecture

### Components

| Component | Location | Purpose |
|-----------|----------|---------|
| `PortfolioImageGallery` | `src/shared/components/PortfolioImageGallery/index.tsx` | Core gallery: carousel + lightbox. Client component. |
| `PortfolioCardCarousel` | `src/shared/components/PortfolioCardCarousel/index.tsx` | Wrapper for home/portfolio cards. Uses `PortfolioImageGallery` with `autoplay=true`. |
| `PortfolioWorkGallery` | `src/shared/components/PortfolioWorkGallery/index.tsx` | Wrapper for category work cards. Uses `PortfolioImageGallery` with `autoplay=false`. |

### Pages

| Page | Route | Content |
|------|-------|---------|
| Home | `/[locale]` | Portfolio section with category cards |
| Portfolio | `/[locale]/portfolio` | Full grid of category cards |
| Category | `/[locale]/[slug]` | Category header + grid of works |

---

## Card Layout

### Grid

- **Container:** `grid gap-5 md:grid-cols-2 xl:grid-cols-3`
- **Card wrapper:** `section-card p-5` (see `globals.css` for `.section-card` styles)
- **Card structure:** Image carousel → Title → Description → Buttons

### Card Content Order

1. Image carousel (see Image Carousel section)
2. Title: `text-lg font-semibold text-slate-900 dark:text-slate-100`
3. Description: `text-sm text-slate-700 dark:text-slate-300`, `mb-4 mt-2`
4. Buttons: `flex flex-wrap gap-3`

### Primary vs Secondary Button

- **Primary (details):** `rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white` — links to category page
- **Secondary (contact):** `rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold` — links to contact

### Work Card Layout (category page)

Work cards appear on the category detail page (`/[locale]/portfolio/[slug]`). Each card displays a single work within that category.

**Card structure:** Image gallery → Title → Description

1. **Image gallery:** `PortfolioWorkGallery` with `autoplay=false` — carousel of work images with lightbox
2. **Title:** `text-lg font-semibold text-slate-900 dark:text-slate-100`, `mt-2`
3. **Description:** `text-sm text-slate-700 dark:text-slate-300`, `mt-2` — shown below the title when present; omit when empty

**Grid:** `grid gap-5 sm:grid-cols-2 lg:grid-cols-3`

---

## Image Carousel

### Image Container

- **Aspect ratio:** `aspect-video` (16:9)
- **Wrapper:** `relative mb-4 aspect-video overflow-hidden rounded-xl border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-900`
- **Object fit:** `object-cover`

### Image Sizes (Next.js `sizes`)

```
(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 95vw
```

- **XL (≥1280px):** ~30vw (3 columns)
- **MD (≥768px):** ~45vw (2 columns)
- **Mobile:** 95vw

### Carousel Controls (when `images.length > 1`)

| Control | Position | Size | Style |
|---------|----------|------|-------|
| Previous | `left-2 top-1/2 -translate-y-1/2` | `h-8 w-8` | `rounded-full bg-black/45 text-white hover:bg-black/65` |
| Next | `right-2 top-1/2 -translate-y-1/2` | `h-8 w-8` | Same as previous |
| Dot indicators | `bottom-2 left-1/2 -translate-x-1/2` | `h-2 w-2 rounded-full` | Active: `bg-white`, inactive: `bg-white/50 hover:bg-white/80` |

### Autoplay

- **Home/Portfolio cards:** `autoplay=true`, `intervalMs=3500` (default)
- **Category work cards:** `autoplay=false`
- Autoplay pauses when lightbox is open

---

## Expand / Lightbox

### Trigger

- Click anywhere on the visible image opens the lightbox
- Button uses `cursor-zoom-in` and `aria-label` for expand action

### Lightbox Overlay

- **Backdrop:** `fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4`
- **Role:** `role="dialog" aria-modal="true"`
- **Click outside:** Closes lightbox (backdrop click)
- **Body scroll:** `overflow: hidden` while open

### Lightbox Image Container

- **Size:** Image uses 70% of viewport height (`h-[70vh]`), maintaining aspect ratio.
- **Portal:** Lightbox must be rendered via `createPortal(..., document.body)` to escape the card DOM — parents with `transform` or `overflow` break `position: fixed`.
- **Backdrop:** `fixed inset-0 z-[9999]`.
- **Image:** `fill` with `object-contain` — scales to fill the container.
- **Container:** `h-[70vh] max-w-[90vw]` — 70% vertical, up to 90% horizontal.

### Lightbox Controls

| Control | Position | Size | Style |
|---------|----------|------|-------|
| Close (X) | `right-2 top-2` | `px-3 py-1 text-xl` | `rounded-full bg-black/55 text-white hover:bg-black/75` |
| Previous | `left-2 top-1/2 -translate-y-1/2` | `h-10 w-10` | `rounded-full bg-black/55 text-lg font-bold text-white` |
| Next | `right-2 top-1/2 -translate-x-1/2` | `h-10 w-10` | Same as previous |

### Keyboard

| Key | Action |
|-----|--------|
| `Escape` | Close lightbox |
| `ArrowLeft` | Previous image (when multiple) |
| `ArrowRight` | Next image (when multiple) |

---

## Empty State

When `images.length === 0`:

- **Container:** Same `aspect-video` wrapper with `border-dashed`
- **Content:** Localized `no_images` label or `alt` text
- **Style:** `text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400`

---

## Locale Keys

### Gallery Labels (`pages.home.portfolio.gallery_labels`)

All labels are used for accessibility (`aria-label`):

| Key | Purpose |
|-----|---------|
| `expand_image` | Expand button (e.g. "Expand image 1") |
| `previous_image` | Previous slide button |
| `next_image` | Next slide button |
| `show_image` | Dot indicator (e.g. "Show image 2") |
| `close_expanded_image` | Close lightbox button |
| `expanded_view` | Dialog label |
| `no_images` | Empty state message |

### Portfolio Section

| Key | Purpose |
|-----|---------|
| `title` | Section heading |
| `page_title` | Optional override for portfolio page |
| `description` | Section description |
| `details_cta` | Primary button label (e.g. "View details") |
| `placeholders.coming_soon` | Shown when category has no works |
| `placeholders.description_not_available` | Fallback for work description |

---

## Data Types

### PortfolioHomeCardData (card on home/portfolio)

```ts
{
  slug: string;
  categoryKey: string;
  locale: string;
  title: string;
  description: string;
  button: string;        // Contact CTA
  detailsButton: string; // Link to category page
  coverImages: string[]; // Image URLs for carousel
  imageAlt: string;
  order: number;
  source: "prismic" | "filesystem";
}
```

### PortfolioWorkData (work on category page)

```ts
{
  key: string;
  title: string;
  description: string;
  images: string[];
  imageAlt: string;
  externalLink?: string;
  order: number;
  source: "prismic" | "filesystem";
}
```

### PortfolioCategoryPageData

```ts
{
  slug: string;
  categoryKey: string;
  locale: string;
  title: string;
  description: string;
  button: string;
  detailsButton: string;
  coverImages: string[];
  heroImage?: { src: string; alt: string };
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: string;
  works: PortfolioWorkData[];
  source: "prismic" | "filesystem";
}
```

---

## Content Adapter

Portfolio content is loaded via `PortfolioContentAdapter`:

- **`listHomeCards(locale)`** — Returns cards for home/portfolio grid
- **`getCategoryPage(locale, slug)`** — Returns category page with works
- **`listCategoryRouteRefs()`** — For static params and sitemap

The adapter can be backed by Prismic, filesystem, or another source.

---

## Image Recommendations

- **Format:** WebP or JPEG for photos; PNG for graphics
- **Aspect:** 16:9 works best for `aspect-video` cards
- **Resolution:** At least 1200px width for lightbox quality
- **Placeholder:** Use `getPortfolioPlaceholderImagePath()` when no images exist

---

## Checklist for New Projects

1. [ ] Add `PortfolioImageGallery`, `PortfolioCardCarousel`, `PortfolioWorkGallery` components
2. [ ] Add `gallery_labels` to all locale JSON files under `pages.home.portfolio`
3. [ ] Implement `PortfolioContentAdapter` (Prismic, filesystem, or custom)
4. [ ] Use `section-card` for card styling (or equivalent)
5. [ ] Ensure `[slug]` dynamic route handles portfolio category slugs
6. [ ] Add placeholder image at `public/assets/images/portfolio-placeholder.png`
7. [ ] Keep `PortfolioImageGallery` as a client component (`"use client"`)
