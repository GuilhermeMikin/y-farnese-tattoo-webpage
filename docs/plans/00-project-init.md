# Yolanda Farnese Website Project Init

- Status: Draft
- Date: 2026-03-01

## Reality Check

### Repo Root Scan

The repository is not empty. It already contains:

- Next.js application code under `src/`
- Prismic-related files under `customtypes/`, `src/shared/prismic/`, and `slicemachine.config.json`
- Existing docs under `docs/business-specs/` and `docs/template-specs/`
- Existing `node_modules/`

Important carry-over context from the previous project baseline:

- The repo initially shipped with previous-brand metadata, route assumptions, and Prismic placeholders that needed cleanup
- The route/content baseline was usable, but not yet aligned with the Yolanda specs

`docs/plans/00-project-init.md` and `docs/plans/01-build-plan.md` did not exist at the start of this task.

### Business Info JSON

`docs/business-specs/basic-business-info.json` exists and is valid JSON.

Confirmed values from the file:

- Brand name: `Yolanda Farnese`
- Person name: `Yolanda Farnese`
- Home headline: `A sua imaginação é a minha inspiração.`
- Tagline: `Tattoo Artist - Fine Line & Blackwork`
- Occupation: `Tattoo Artist`
- Instagram: `https://www.instagram.com/y_farnese/`
- Instagram handle: `@y_farnese`
- Primary CTA: WhatsApp link present
- Phone number: `5534998852526`
- Location label: `Uberlândia - MG`
- City/state/country: `Uberlândia`, `MG`, `BR`
- SEO title: `Yolanda Farnese | Tattoo Artist`
- SEO description: `Tatuadora em Uberlândia - MG. Fine Line e Blackwork. Sua imaginação é a minha inspiração.`

### References Inventory

`docs/business-specs/references/` exists and currently contains:

- `colors.md`
  - Note captured: `tons of black, grey, white and read for buttons, texts and cards`
- `image.png`
  - Portfolio screenshot with multiple tattoo examples across arms, back, neck, and shoulder
- `instagram.png`
  - Instagram profile screenshot showing:
    - handle `y_farnese`
    - name `Yolanda`
    - `239` publications
    - `5 097` followers in the captured image
    - bio lines for `Fine Line / Blackwork`, `Uberlândia MG`, and `A sua imaginação é a minha inspiração`
    - WhatsApp short link reference

### Template Gap Analysis

Compared against `docs/template-specs/business-basic-info-template.md`, the current JSON covers the basics but does not yet match the recommended structure.

Present or partially present:

- `brand_name`
- `person_name`
- `main_title_home`
- `tagline`
- `occupation` as a flat key instead of `occupation_or_area`
- `instagram_profile_url` and `instagram_handle`
- `whatsapp_link`
- `phone_number`
- `address_label`
- `city`, `state`, `country`
- `site_name`, `site_title`, `site_description`
- `links.instagram`
- `links.whatsapp`

Missing or structurally mismatched:

- `business_type`
- `occupation_or_area` key name
- `languages`
- `primary_locale`
- `contacts.primary_channel`
- `contacts.phone_e164`
- `contacts.phone_display`
- `contacts.email`
- nested `location` object
- `location.address_full`
- `location.zip_code`
- `location.maps_link`
- nested `social_profiles` object
- nested `site` object
- `site.site_url`
- `site.default_og_image`
- `home_content`
- `links.primary_cta`
- `links.maps`
- `service_area`
- `business_hours`
- `legal`
- `notes`

This is a documentation blocker only, not a reason to invent values. The active specs use placeholders or pending confirmations where the JSON is silent.

## Environment Versions

- Node: `v22.20.0`
- npm: `10.9.3`

## Dependency Installation

Baseline command run:

```bash
npm ci
```

Baseline result:

- Failed immediately with `EUSAGE`
- Root cause: no `package-lock.json` or `npm-shrinkwrap.json` exists in the repository

Observed npm message:

- `npm ci` can only install with an existing lockfile

Follow-up scaffold repair work:

```bash
npm install --package-lock-only --ignore-scripts
```

- Succeeded and generated `package-lock.json`

Revalidation command:

```bash
npm ci
```

Current result:

- Failed again, but no longer due to the missing lockfile
- npm exited with the internal error `Exit handler never called!`
- This appears to be an environment-level npm `10.9.3` failure rather than a missing script or missing manifest problem in the scaffold itself

Current dependency-installation status:

- Lockfile now exists
- A clean local `npm ci` run is still blocked in this environment by the npm internal failure above

## Validation Scripts

Initial `package.json` state before scaffold repair:

- Defined only the `test` script
- Did not define `lint`
- Did not define `build`
- Did not declare the app dependencies implied by the checked-in Next.js and Prismic code

Current `package.json` state after scaffold repair:

- Defines `dev`, `build`, `start`, `lint`, and `slicemachine`
- Declares the Next.js, React, Tailwind, TypeScript, ESLint, and Prismic dependencies needed by the scaffold

Validation outcomes from the repaired scaffold:

- `npm run lint`: passed
- `npm run build`: passed
- `npm run dev`: passed when run outside the sandbox; the default sandbox blocked local port binding with `listen EPERM`
- `npm run start`: passed when run outside the sandbox; the default sandbox blocked local port binding with `listen EPERM`

Routing and locale policy checks performed against the running app:

- `GET /` returned `200` and rewrote internally to the `pt-br` locale
- `GET /en-us/about` returned `200`
- `GET /pt-br/about` returned `307` redirecting to `/about`
- `GET /sobre` returned `307` redirecting to `/about`
- Rendered internal links did not emit `/pt-br/...` URLs in the default locale

## Notes

- `node_modules/` already existed at task start, but without a lockfile and complete package manifest it could not be treated as a reliable baseline.
- Validation for `lint`, `build`, `dev`, and `start` used a temporary `node_modules` symlink to a matching local baseline dependency tree after local npm installation became unstable in this environment.
- The application scaffold itself is now aligned to Yolanda's branding, locale policy, shell structure, and Prismic adapter boundary, but reproducible local installation still depends on resolving the npm `Exit handler never called!` failure.
- The build-plan formatting reference files mentioned in the task were not present in this repository at task start. This plan uses the requested Status/Date header block and named sections as the operative formatting baseline.
