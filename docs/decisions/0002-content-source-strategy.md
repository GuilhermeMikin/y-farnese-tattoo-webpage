# 0002 Content Source Strategy

## Context

The site needs flexible portfolio and tattoo style content that can grow without code-only edits, while still keeping simple interface strings stable and versioned in the repository.

## Decision

Use **Prismic** for:

- `site_settings`
- tattoo style/service content
- portfolio/work entries
- optional blog or landing pages only if they are later approved

Keep small fixed UI strings, route labels, theme labels, and fallback copy in locale JSON files under `src/shared/lang/`.

## Alternatives

- Keep all content in locale JSON and repository files only
- Move all visible content into Prismic, including tiny UI strings
- Use another CMS or a headless spreadsheet-style workflow

## Consequences

- Editors can manage portfolio and service content without code deployments
- Static UI text stays simple, typed, and easy to diff in Git
- The project needs Prismic schema maintenance, preview/revalidation setup, and adapter discipline

## Rollback

If Prismic introduces too much complexity or instability, freeze CMS reads, move critical content back into repository-managed JSON/files, and keep the public routes unchanged while adapters are removed.
