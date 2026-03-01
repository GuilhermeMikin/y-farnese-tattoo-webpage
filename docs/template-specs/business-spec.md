> Template - copy to create a new site spec. DO NOT EDIT for the Debora Lima site.

# [Client/Business Name] Business Spec

**Status:** [Draft | Active | Archived]  
**Last updated:** [YYYY-MM-DD]

---

## Mission

[One paragraph: What does this site exist to do? Who is it for? What is the core value?]

*Example (artist):* Share the art and painting work of [Name] with the world. Help people discover and commission [services/products].

*Example (bakery):* Showcase [Bakery Name]'s breads, pastries, and cakes. Help customers find the menu, location, and order or reserve.

*Example (bar):* Present [Bar Name]'s atmosphere, drinks, and events. Drive reservations and foot traffic.

*Example (blog):* Share [Author]'s writing, ideas, and projects. Build an audience and enable contact or newsletter signup.

---

## Primary Goals

1. **[Goal 1]:** [Description]
2. **[Goal 2]:** [Description]
3. **[Goal 3]:** [Description]

*Typical goals: showcase work/products, direct conversion (contact/quote/order), build trust, drive traffic, collect leads.*

---

## Target Audiences

1. **[Audience 1]:** [Description]
2. **[Audience 2]:** [Description]
3. **[Audience 3]:** [Description]

*Who visits this site? What do they want?*

---

## Core User Journeys

1. **The Curious:** [Visitor lands on Home, does X, then Y]
2. **The Decided:** [Visitor knows what they want, goes straight to Z]
3. **The Skeptic:** [Visitor reads About or similar before taking action]

*Describe 2–4 typical paths from landing to conversion.*

---

## Site Pages

| Page | Route (default locale) | Route (other locales) | Description |
|------|------------------------|------------------------|-------------|
| **Home** | `/[locale]` | `/[locale]` | [Landing page contents] |
| **About** | `/[locale]/about` | `/[locale]/about` | [About page contents] |
| **Contact** | `/[locale]/contact` | `/[locale]/contact` | [Contact page contents] |
| **[Optional page]** | `/[locale]/[slug]` | `/[locale]/[slug]` | [Description] |

The root page (`/`) redirects automatically to the default locale (e.g. `/pt-br` or `/en-us`).

### URL Aliases (redirects)

Alternative URLs that redirect to canonical pages. Add locale-specific aliases as needed.

- **About:** [e.g. `sobre`, `quem-somos` (PT-BR); `about-us`, `aboutus` (EN-US)]
- **Contact:** [e.g. `contato`, `orcamento` (PT-BR); `contact-us`, `quote` (EN-US)]
- **[Other page]:** [aliases]

---

## Home Page Sections

1. **Hero:** [Eyebrow text, main title, description, CTAs. Include image/photo if relevant]
2. **[Section 2]:** [e.g. Featured portfolio, menu highlights, latest posts]
3. **[Section 3]:** [e.g. How it works, services, testimonials]
4. **[Section 4]:** [e.g. Quick contact, CTA block]
5. **Floating button (optional):** [Fixed button for WhatsApp, phone, or primary CTA—describe placement and behavior]

*Adjust sections to fit the business. Portfolio sites need galleries; bars/bakeries may need menus or highlights; blogs need post previews.*

---

## [Gallery / Portfolio / Menu / Catalog] *(optional)*

*Use this section for visual showcases: portfolio categories, menu sections, product lines, blog categories, etc. Content may be sourced from a CMS (e.g. Prismic) or repository files.*

| [Category/Item] | Description |
|-----------------|-------------|
| [Name] | [Description] |
| [Name] | [Description] |
| ... | ... |

---

## Contact Form

The contact page form collects:

- **[Field 1]** (required/optional) — [e.g. Name]
- **[Field 2]** (required/optional) — [e.g. Email, phone]
- **[Field 3]** (required/optional) — [e.g. Project type, message, order details]

On submit: [WhatsApp opens with pre-filled message | Email sent | Other action].

The visitor can also use: [direct link, QR code, phone number].

---

## Color Palette

*Define light and dark mode colors. Use HEX codes. Keep structure consistent for implementation.*

### Light mode (default theme)

| Color name | HEX code | Use |
|------------|----------|-----|
| Page background | `#______` | Main background |
| Primary text | `#______` | Highlighted text |
| Surface | `#______` | Cards, elevated areas |
| Soft surface | `#______` | Secondary backgrounds |
| Soft border | `#______` | Subtle borders |
| Secondary text | `#______` | Supporting text |
| Muted text | `#______` | Lower-emphasis text |
| **Brand primary** | `#______` | Main brand color, primary buttons |
| Brand dark | `#______` | Hover, highlights |
| Brand light | `#______` | Soft highlight backgrounds |
| Accent 1 | `#______` | Accents, details |
| Accent 2 | `#______` | Optional accent |

### Dark mode

| Color name | HEX code | Use |
|------------|----------|-----|
| Page background | `#______` | Main background |
| Primary text | `#______` | Highlighted text |
| Surface | `#______` | Cards, elevated areas |
| Soft surface | `#______` | Secondary backgrounds |
| Soft border | `#______` | Subtle borders |
| Secondary text | `#______` | Supporting text |
| Muted text | `#______` | Lower-emphasis text |
| **Brand primary** | `#______` | Main brand color |
| Brand dark | `#______` | Hover, highlights |
| Brand light | `#______` | Highlight backgrounds |
| Accent 1 | `#______` | Accents, details |
| Accent 2 | `#______` | Optional accent |

---

## Languages and Themes

- **Languages:** [e.g. Portuguese (pt-BR), English (en-US)]. Selector in the header.
- **Themes:** Light and dark mode. Toggle next to the language selector. Works on all pages.

## Navigation and Responsive Behavior

- **Mobile menu:** On mobile viewports, the main navigation is a hamburger menu (slide-out drawer) unless specified otherwise. Brand and tagline remain visible in the header at all times.

---

## Contact Information (business)

- **[Primary channel]:** [e.g. WhatsApp: +55 XX XXXXX-XXXX]
- **[Social]:** [e.g. Instagram: @handle]
- **[Location]:** [City, State/Region]
- **[Other]:** [Email, phone, address as needed]

---

## Product Scope

**In scope:**
- [Feature 1]
- [Feature 2]
- [Feature 3]
- [Feature 4]
- Theme accessibility: light and dark modes, toggle next to language selection, works on all pages.

**Out of scope:**
- [e.g. Admin dashboards, e-commerce checkout, user auth, blog platform—unless explicitly in scope]

## Success Signals

- [e.g. Number of contact/quote/order requests initiated]
- [e.g. Average time on key pages]
- [e.g. Conversion rate to leads]

## Change Acceptance Criteria

A change is complete when:

1. [Criterion 1—e.g. Contact/quote takes fewer than 3 clicks]
2. [Criterion 2—e.g. Visual identity reflects quality offered]
3. [Criterion 3—e.g. Clear for non-technical visitors]
4. [Criterion 4—e.g. Theme and language work consistently across all pages]
