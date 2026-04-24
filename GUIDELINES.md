# RADIIA Portal — Build Guidelines

Each guideline is its own file under [docs/guidelines/](docs/guidelines/). Click through for the full rule, rationale, examples, counter-examples, edge cases, and revisit criteria.

## Index

| # | Guideline | One-line rule |
|---|-----------|---------------|
| 01 | [Folder structure](docs/guidelines/01-folder-structure.md) | Every file lives in exactly one bucket, picked by what it renders or does. |
| 02 | [Reusable-component doctrine](docs/guidelines/02-reusable-components.md) | One component, many variants via props — never three near-identical components. |
| 03 | [Data-fetching pattern](docs/guidelines/03-data-fetching.md) | React components never call `fetch` directly. Every read goes through a service returning a domain type. |
| 04 | [Auth & session pattern](docs/guidelines/04-auth-session.md) | Token storage mechanism deferred until Q10; header-injection chokepoint and 401 handling locked now. |
| 05 | [Forms & validation](docs/guidelines/05-forms-validation.md) | Stay lib-free. Every form uses `useState` + a colocated `validate()` + shared `<FieldError>`. |
| 06 | [Error / loading / empty states](docs/guidelines/06-error-loading-empty-states.md) | Every data-backed view ships all three states via the `StateCard` pattern. |
| 07 | [Styling rules](docs/guidelines/07-styling.md) | Use the UI primitives, token-based colors from `globals.css`, and `cn()` for conditionals. Don't extend the fragile dark mode. |
| 07a | [CSS implementation reference](docs/guidelines/07a-css-implementation.md) | Complete token catalog, typography, layout patterns, component recipes, current inconsistencies, cheat sheet. |
| 08 | [Domain-type discipline](docs/guidelines/08-domain-types.md) | One canonical type per concept in `src/types/`. Services map raw Fantasy fields at the boundary. |
| 09 | [Environment variables](docs/guidelines/09-env-vars.md) | Every required env var in `.env.example`. Never hardcode URLs or secrets. Default to server-only. |
| 10 | [Definition of Done](docs/guidelines/10-definition-of-done.md) | Seven-item checklist every PR must satisfy before merge. |

## How to use this

- **Before writing code:** skim the guideline that covers what you're about to build. Most answer 90% of the "where does this go / what shape should this take" questions.
- **During code review:** match PR content against the relevant guideline. Cite the rule's section in review comments.
- **When a rule starts to hurt:** edit the rule's file first. Don't route around it in silence. Each guideline has a "When to revisit" section at the bottom.

## Companion documents

- **[docs/decisions/2026-04-24-fantasy-api-pivot.md](docs/decisions/2026-04-24-fantasy-api-pivot.md)** — architectural decision record for the 2026-04-24 pivot away from the Fantasy API. Anchor document for every change dated after 2026-04-24.
- [docs/WORKPLAN.md](docs/WORKPLAN.md) — current phase-by-phase task plan with statuses.
- [docs/discovery/client-questions.md](docs/discovery/client-questions.md) — post-pivot question status + new open questions for Jennifer.
- [docs/discovery/mvp-scope.md](docs/discovery/mvp-scope.md) — v2 MVP scope (post-pivot).
- [docs/discovery/gap-analysis.md](docs/discovery/gap-analysis.md) — **superseded by pivot**; retained for reference.

### Playbooks (execution-grade, per phase)

- ✅ [docs/playbook/refactor-sprint.md](docs/playbook/refactor-sprint.md) — completed (PR #1).
- 🔵 [docs/playbook/infrastructure-foundation.md](docs/playbook/infrastructure-foundation.md) — Phase I: DB, Prisma, Auth.js, email.
- 🟡 [docs/playbook/ftp-ingestion.md](docs/playbook/ftp-ingestion.md) — Phase F: gemstone FTP feed (blocked on Fantasy-supplied credentials).
- 🔵 [docs/playbook/gem-inventory-v2-ftp.md](docs/playbook/gem-inventory-v2-ftp.md) — Phase W: wire UI to Prisma-backed inventory (replaces the retired Fantasy-API version).
- 🔵 [docs/playbook/admin-backend.md](docs/playbook/admin-backend.md) — Phase A: pending accounts, companies + markups, requests review.
- 🔵 [docs/playbook/memo-invoice-requests.md](docs/playbook/memo-invoice-requests.md) — Phase M: buyer-side request submission + lifecycle.
- 🚫 [docs/playbook/gem-inventory-sprint.md](docs/playbook/gem-inventory-sprint.md) — **retired**; see gem-inventory-v2-ftp.md.

## Change log

| Date | Change | Reason |
|------|--------|--------|
| 2026-04-21 | Initial version | Discovery sprint complete |
| 2026-04-22 | Split into 10 detailed files under `docs/guidelines/`; root GUIDELINES.md is now an index | Developer-friendly structure per client request |
| 2026-04-22 | Added [07a-css-implementation.md](docs/guidelines/07a-css-implementation.md) | Detailed CSS reference with actual token values, component recipes, and audit of current inconsistencies |
| 2026-04-24 | Major pivot: drop Fantasy API integration; project becomes a full-stack Next.js app (DB + Auth.js + FTP ingestion + admin). See [docs/decisions/2026-04-24-fantasy-api-pivot.md](docs/decisions/2026-04-24-fantasy-api-pivot.md). Workplan, MVP scope, playbooks, `.env.example` rewritten; `gap-analysis.md` and the original `gem-inventory-sprint.md` superseded. [Guideline 04 (auth)](docs/guidelines/04-auth-session.md) and [09 (env vars)](docs/guidelines/09-env-vars.md) due for rewrite as part of Phase I. | Client direction on the 2026-04-24 call: Fantasy's API is not scalable enough; build our own backend instead. |
