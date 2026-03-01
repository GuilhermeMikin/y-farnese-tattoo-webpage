> Template - copy to create a new site spec. DO NOT EDIT for the Debora Lima site.

# [project-name]

[One-line tagline: e.g. Personal website | Bar website | Bakery site]

A multilingual lead-generation website for **[Client/Business Name]**. [One sentence: what the site does, who visits, primary conversion—e.g. Visitors can browse the portfolio, build trust, and request a quote or contact quickly, including WhatsApp-first flow.]

## Tech Stack

- **Next.js 15** (App Router)
- **React 19** + TypeScript
- **Tailwind CSS** for styling
- Static, server-rendered pages with client-side navigation and theme switching

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The root `/` redirects to `/[default-locale]` (e.g. `/pt-br` or `/en-us`).

### Scripts

| Command       | Description                    |
|---------------|--------------------------------|
| `npm run dev` | Start development server       |
| `npm run build` | Build for production         |
| `npm run start` | Start production server      |
| `npm run lint` | Run ESLint                    |

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Global layout, theme init
│   ├── page.tsx                # Root redirect → /[default-locale]
│   └── [locale]/
│       ├── layout.tsx          # Locale-scoped shell
│       ├── page.tsx            # Home
│       ├── about/page.tsx      # About
│       ├── contact/page.tsx    # Contact / quote
│       └── [slug]/page.tsx    # Catch-all (aliases, dynamic pages, fallback)
├── shared/
│   ├── components/            # Sidebar, Footer, ThemeSwitch, [project components]
│   ├── lang/                  # Locale JSON files
│   ├── types/                 # Locale typing
│   └── utils/                 # transformLocaleData, routing, [project utils]
docs/                          # Specs and guidelines
```

## Features

- **Multilingual:** [e.g. English (en-us) and Portuguese (pt-br)] via locale JSON files; portfolio/gallery may use a CMS
- **Theme switching:** Light/dark mode (default: light) with `localStorage` persistence
- **[Primary CTA]:** [e.g. Short form + direct WhatsApp integration]
- **Localized routing:** `/{locale}/about`, `/{locale}/contact`, plus slug aliases
- **[Optional feature]:** [e.g. Portfolio lightbox, menu gallery—describe if present]

## Supported Locales

- `[default-locale]` (default, fallback)
- `[other-locale]`

## Documentation

| Document | Purpose |
|----------|---------|
| [docs/business-specs/[client]-site-spec.md](docs/business-specs/) | Business intent, audience, scope, success signals |
| [docs/tech-specs/content-routing-spec.md](docs/tech-specs/content-routing-spec.md) | Route, locale, and content-shape technical contract |
| [docs/plans/prismic-slice-machine-setup-guide.md](docs/plans/prismic-slice-machine-setup-guide.md) | Prismic/Slice Machine setup (when using Prismic CMS) |
| [docs/architecture/overview.md](docs/architecture/overview.md) | Application structure and constraints |
| [docs/guidelines/content-and-contribution-guidelines.md](docs/guidelines/content-and-contribution-guidelines.md) | Content and maintenance guardrails |
| [docs/ai/context-pack.md](docs/ai/context-pack.md) | Efficient context loading for AI-assisted edits |
| [docs/ai/fullstack-persona-for-gpt.md](docs/ai/fullstack-persona-for-gpt.md) | Fullstack persona for GPT (reviews, plans, prompts) |
| [docs/README.md](docs/README.md) | Documentation system overview |

## Quality Gates

Before merging changes:

1. Run `npm run lint`
2. Run `npm run build`
3. Confirm no broken links in contact, [portfolio/menu/etc.], and primary CTA sections
4. Verify theme and language switching on all pages
5. For CSS visual changes, validate rendering on iPhone Safari and one Android browser
