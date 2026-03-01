# 0001 Locale URL Policy

## Context

The Yolanda Farnese site supports `pt-br` and `en-us`, but the primary audience and main acquisition flow are Portuguese-first. The baseline implementation already contains middleware intended to hide the default locale in public URLs.

## Decision

Hide `pt-br` in public URLs while keeping internal route handling locale-prefixed. Public examples:

- `/`
- `/about`
- `/procedures`
- `/contact`

English remains locale-prefixed:

- `/en-us`
- `/en-us/about`
- `/en-us/procedures`
- `/en-us/contact`

Requests to `/pt-br/*` redirect to the locale-hidden equivalent.

## Alternatives

- Expose locale prefixes for all locales, including `pt-br`
- Use fully separate domain or subdomain strategy per locale
- Make `en-us` the default locale

## Consequences

- Portuguese URLs stay shorter and cleaner for the primary market
- Middleware and link helpers must remain consistent
- Canonicals, sitemap generation, and locale switching need extra care to avoid duplicate URLs

## Rollback

If the hidden-default-locale policy causes routing or SEO issues, remove the middleware rewrite/redirect behavior and expose locale prefixes for all locales consistently.
