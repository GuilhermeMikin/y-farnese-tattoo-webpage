> Template - copy to create a new site spec. DO NOT EDIT for the Debora Lima site.

# Documentation System (Lean)

*Copy this file to `docs/README.md` when creating a new project. This project uses a small, spec-driven documentation set for static marketing/portfolio sites.*

## Reality Check

The site is intentionally simple:
- Static business pages focused on lead generation
- Multi-language content
- No backend or complex product workflows

Because of that, documentation must stay small and decision-focused. If a document does not help us make or validate a change, we do not keep it.

## Folder Map

- `docs/architecture/overview.md`: How the app is structured today
- `docs/business-specs/[client]-site-spec.md`: Product goals, audience, and success criteria
- `docs/tech-specs/content-routing-spec.md`: Routing, locale schema, and technical constraints
- `docs/guidelines/content-and-contribution-guidelines.md`: Writing and maintenance rules
- `docs/ai/context-pack.md`: Token-efficient context loading for AI-assisted work

## Spec-Driven Workflow

Use this order for meaningful changes:

1. Confirm intent in `docs/business-specs/[client]-site-spec.md`
2. Confirm implementation shape in `docs/tech-specs/content-routing-spec.md`
3. Implement code/content changes
4. Update impacted docs in the same change
5. Add decision records only when a trade-off cannot be captured in existing specs

## Token-Sparse Rules

- Prefer checklists over long prose
- Link to real code paths
- Keep one concern per file
- Add new docs only when existing files cannot represent the decision
