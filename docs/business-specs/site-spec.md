> Active business spec derived from `docs/business-specs/basic-business-info.json` and `docs/business-specs/references/`. Templates remain unchanged in `docs/template-specs/`.

# Yolanda Farnese Business Spec

**Status:** Draft  
**Last updated:** 2026-03-01

---

## Mission

Create a multilingual marketing and portfolio website for **Yolanda Farnese**, a **Tattoo Artist** based in **Uberlandia - MG**, focused on **Fine Line** and **Blackwork** tattoos. The site should present Yolanda's visual style clearly, turn Instagram and search visitors into WhatsApp conversations quickly, and provide a Prismic-backed structure for portfolio entries and style/service detail pages.

---

## Primary Goals

1. **Drive bookings:** Convert visitors into WhatsApp quote and booking conversations with minimal friction.
2. **Showcase portfolio quality:** Present real tattoo work prominently so visitors can evaluate line quality, style fit, and artistic range.
3. **Build trust fast:** Reinforce Yolanda's positioning, location, and active Instagram presence without relying on unsupported claims.

---

## Target Audiences

1. **Local tattoo clients:** People in Uberlandia and nearby areas looking for a tattoo artist with a fine line or blackwork aesthetic.
2. **Style-led visitors:** Visitors who already know they want Fine Line, Blackwork, lettering, or illustrated tattoo references and want to evaluate the portfolio quickly.
3. **Instagram return visitors:** People who discover Yolanda on Instagram, then open the site to confirm trust signals, see more work, and start a WhatsApp conversation.

---

## Core User Journeys

1. **The Instagram Visitor:** Lands on Home from Instagram, scans the hero and selected portfolio pieces, then taps WhatsApp for a quote.
2. **The Style-Led Visitor:** Arrives on the portfolio/styles listing or a style detail page, compares Fine Line vs Blackwork references, then asks about availability.
3. **The Trust Builder:** Opens About or Contact to confirm who Yolanda is, where she works, and how to reach her before starting a booking message.

---

## Site Pages

| Page | Route (default locale) | Route (other locales) | Description |
|------|------------------------|------------------------|-------------|
| **Home** | `/` | `/en-us` | Brand positioning, featured work, style focus, trust signals, and primary booking CTA |
| **About** | `/about` | `/en-us/about` | Yolanda's short bio, artistic approach, and tattoo style philosophy |
| **Portfolio / Styles** | `/portfolio` | `/en-us/portfolio` | Listing page for tattoo styles/services and selected portfolio highlights managed via Prismic |
| **Style detail** | `/portfolio/[slug]` | `/en-us/portfolio/[slug]` | Detail page for a tattoo style or service with summary, inspiration, gallery, and CTA |
| **Contact / Booking** | `/contact` | `/en-us/contact` | WhatsApp-first contact page with Instagram and location context |
| **Privacy Policy** | `/privacy-policy` | `/en-us/privacy-policy` | Legal/compliance page |

The public root (`/`) serves `pt-br` content without showing the locale prefix. Internal route handling remains locale-aware, and `/pt-br/*` should redirect to the locale-hidden equivalent.

### URL Aliases (redirects)

- **About:** `sobre`, `quem-e-yolanda`
- **Portfolio / Styles:** `portfolio`, `tatuagens`, `estilos`
- **Contact:** `contato`, `orcamento`, `agendar`
- **Privacy policy:** `politica-de-privacidade`

---

## Home Page Sections

1. **Hero:** Use the supported headline `A sua imaginacao e a minha inspiracao.`, reinforce Fine Line / Blackwork positioning, and expose WhatsApp plus portfolio CTAs.
2. **Style focus strip:** Quick statements around Fine Line, Blackwork, and custom artistic interpretation derived from the portfolio references.
3. **Featured portfolio:** Grid or carousel with selected tattoo works from Prismic and a path to the full portfolio/styles listing.
4. **About Yolanda:** Short bio, artistic approach, and location in Uberlandia - MG.
5. **Trust and contact:** Instagram proof points from the captured reference, plus direct booking/contact actions.
6. **Floating action button:** Persistent WhatsApp CTA on mobile and desktop.

---

## Portfolio / Styles

The references currently support these initial content buckets:

| Category/Item | Description |
|---------------|-------------|
| Fine Line | Delicate linework and lighter compositions, explicitly named in the Instagram bio |
| Blackwork | Higher-contrast tattoo direction, explicitly named in the Instagram bio |
| Lettering and symbols | Visible in the portfolio screenshot; useful as a portfolio tag/filter, not a separate claim-heavy service page by default |
| Illustrated pieces | Visible in the portfolio screenshot; use as gallery grouping or editorial filter if helpful |

Portfolio references are currently screenshot-based only. Final category names, detail copy, and any additional style taxonomy should be confirmed before content entry.

---

## Contact Form

The contact page form should collect only the minimum needed for conversion:

- **Nome** (required)
- **Ideia, estilo ou referencia** (required)
- **Local do corpo / tamanho aproximado** (optional)
- **Mensagem** (optional)

On submit: open **WhatsApp** with a pre-filled message.

The visitor can also use:

- Direct WhatsApp link from `basic-business-info.json`
- Direct Instagram profile link
- Location label for Uberlandia - MG
- Maps link once confirmed

---

## Color Palette

Initial palette direction is based on the references note (`black, grey, white and red`) plus the dark Instagram/portfolio capture. Treat these as implementation-start tokens pending brand approval.

### Light mode (default theme)

| Color name | HEX code | Use |
|------------|----------|-----|
| Page background | `#F4F1EC` | Main background |
| Primary text | `#121212` | Headings and strong body text |
| Surface | `#FFFFFF` | Cards and elevated areas |
| Soft surface | `#EAE5DE` | Secondary sections |
| Soft border | `#CFC7BE` | Subtle borders |
| Secondary text | `#49433D` | Supporting text |
| Muted text | `#706860` | Lower-emphasis text |
| **Brand primary** | `#A63A37` | Main buttons and strong accents |
| Brand dark | `#7C2421` | Hover states and darker accents |
| Brand light | `#E4BBB8` | Soft highlight backgrounds |
| Accent 1 | `#8A8681` | Neutral accent |
| Accent 2 | `#D9D1C7` | Warm neutral accent |

### Dark mode

| Color name | HEX code | Use |
|------------|----------|-----|
| Page background | `#060606` | Main background |
| Primary text | `#F6F2EC` | Headings and strong body text |
| Surface | `#141414` | Cards and elevated areas |
| Soft surface | `#1E1E1E` | Secondary sections |
| Soft border | `#343434` | Subtle borders |
| Secondary text | `#D2CCC4` | Supporting text |
| Muted text | `#A59E96` | Lower-emphasis text |
| **Brand primary** | `#C74B47` | Main brand color |
| Brand dark | `#9F322F` | Hover and contrast accents |
| Brand light | `#E7B3B0` | Highlight surfaces |
| Accent 1 | `#8E8A84` | Neutral accent |
| Accent 2 | `#B7AEA4` | Warm neutral accent |

---

## Languages and Themes

- **Languages:** Portuguese (`pt-br`) default and English (`en-us`) secondary.
- **Public locale policy:** Hide `pt-br` in public URLs; keep `en-us` locale-prefixed.
- **Themes:** Light and dark mode. Toggle next to the language selector. Works on all pages.

## Navigation and Responsive Behavior

- **Mobile menu:** Hamburger menu with fast access to Home, About, Portfolio/Styles, and Contact/Booking.
- **Header priority:** Brand name, locale switcher, theme switch, and an always-visible booking action.

---

## Contact Information (business)

- **Primary channel:** WhatsApp `https://wa.me/5534998852526?text=Ol%C3%A1%2C%20Yolanda!%20Vim%20atrav%C3%A9s%20do%20site%20e%20gostaria%20de%20fazer%20um%20orcamento.`
- **Phone number:** `5534998852526`
- **Instagram:** `@y_farnese`
- **Location:** Uberlandia - MG
- **Maps link:** Pending confirmation

---

## Product Scope

**In scope:**
- Multilingual marketing site with `pt-br` and `en-us`
- WhatsApp-first booking flow
- Prismic-managed tattoo style/service pages and portfolio entries
- Dark mode and light mode support across all routes
- SEO and localized route alias handling

**Out of scope:**
- Ecommerce or online deposits
- Automated scheduling integrations
- User accounts or client portal
- Course sales pages
- Blog/editorial system in the initial delivery unless later approved

## Initial Copy Drafts

### Hero (Home)

**Headline:** A sua imaginacao e a minha inspiracao.  
**Subheadline:** Fine Line e Blackwork em Uberlandia - MG para quem procura tatuagens com identidade visual forte, traco preciso e leitura autoral.  
**Primary CTA:** Chamar no WhatsApp  
**Secondary CTA:** Ver portfolio

### Short bio (Home/About)

Sou **Yolanda Farnese**, **Tattoo Artist** em **Uberlandia - MG**. Meu trabalho parte do encontro entre a sua referencia e a minha leitura artistica, com foco em **Fine Line** e **Blackwork**.

### Trust bullets

- Fine Line e Blackwork como assinatura principal
- Atendimento em Uberlandia - MG
- Perfil de referencia com `5 mil+` seguidores e `239` publicacoes no Instagram no material capturado

### Services / portfolio intro

Explore estilos, referencias e trabalhos recentes para entender como o tracado da Yolanda se comporta em propostas delicadas, contrastadas e ilustradas.

### Optional landing page intros

No dedicated landing pages are supported by the current references. Keep this area empty until new campaign material exists.

### Contact / booking section

Fale diretamente com a Yolanda para pedir um orcamento, enviar referencias e tirar duvidas sobre disponibilidade.

- WhatsApp: `https://wa.me/5534998852526?text=Ol%C3%A1%2C%20Yolanda!%20Vim%20atrav%C3%A9s%20do%20site%20e%20gostaria%20de%20fazer%20um%20orcamento.`
- Instagram: `https://www.instagram.com/y_farnese/`
- Localizacao: `Uberlandia - MG`
- Maps: `[pending confirmation]`

## Pending Confirmations

- Exact studio address and Google Maps link
- Final English copy review and translated tone adjustments
- Whether Yolanda wants separate detail pages for Fine Line and Blackwork only, or a broader taxonomy with portfolio tags
- Exact palette approval, especially the primary red tone
- Site URL, OG image, and any formal privacy/legal copy requirements

## Success Signals

- Increase in WhatsApp conversations started from the site
- Meaningful visits to portfolio/style detail pages from Instagram and search traffic
- More visitors reaching contact actions after viewing featured work

## Change Acceptance Criteria

A change is complete when:

1. A visitor can reach the WhatsApp booking path in no more than two interactions from the key pages.
2. The site clearly communicates Yolanda's style focus, location, and booking channel without unsupported promises.
3. Portfolio and style content are structured so they can move into Prismic without route changes.
4. Theme and locale behavior remain consistent across Home, About, Portfolio/Styles, Contact, and Privacy pages.
