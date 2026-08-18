# AGENTS.md — The Stars Don't Wait Website Contributor Guide

This file governs agent work in the `SolProject-website` repository. Read it before making changes. If a user request conflicts with these rules, explain the conflict and ask before proceeding.

## 1. Project Purpose and Current State

This repository is the public showcase for **The Stars Don't Wait**, for both prospective players and developers interested in how the game and its engine are being built. Use **The Stars Don't Wait** as the public game and site name. **SolProject** remains the internal repository/project name and **Sol Engine** remains the engine's working name; use those internal names only when the distinction is useful.

The site should explain the player fantasy, show the technology and engineering work accurately, make the development roadmap understandable, and publish occasional project updates. It may link to source code, but it is not a contributor-recruitment site. Use neutral calls to action such as “View source” or “Source code”; do not ask visitors to contribute, join the team, submit pull requests, or apply for roles unless the user explicitly changes that direction.

**Current repository state:** the Astro application is scaffolded. The five primary routes, local MDX updates collection, GitHub Pages configuration, and verification scripts described below are present. Inspect the current checkout before assuming a particular page, post, asset, or check remains unchanged.

The initial site is static. It has no backend, analytics, CMS, forms, accounts, authentication, or generated concept art.

## 2. Sources of Truth and Repository Boundaries

The sibling `../SolProject` repository is the source of truth for all claims about the game, engine, current implementation, and roadmap. Before writing or changing such a claim, check the relevant documents in the current sibling checkout:

- `../SolProject/README.md` — concise project description, build summary, and current status
- `../SolProject/docs/gdd.md` — game vision, features, confidence markers, decisions, and non-goals
- `../SolProject/docs/engine-plan.md` — engine architecture, constraints, phase roadmap, and milestone status

Link readers to the canonical GitHub versions when offering the full documents:

- [SolProject source and README](https://github.com/axxessdenied/SolProject)
- [Game design document](https://github.com/axxessdenied/SolProject/blob/main/docs/gdd.md)
- [Engine development plan](https://github.com/axxessdenied/SolProject/blob/main/docs/engine-plan.md)

Apply these content rules:

- Curate website copy in this repository. Do not import from `../SolProject`, add it as a submodule, read it during a build, call the GitHub API during a build, or otherwise create build-time coupling.
- Preserve the source documents’ distinction between completed work, committed design, likely direction, open questions, and non-goals. Never present planned functionality as shipped functionality.
- Prefer durable summaries and links over copying large passages. Recheck milestone and status language immediately before publishing it because it changes frequently.
- When local copy and the sibling documents disagree, correct the website copy or flag the conflict. Do not “resolve” it by editing `../SolProject` unless the user explicitly asks for a sibling-repository change.
- Do not expose local sibling paths in visitor-facing copy. Those paths are contributor instructions only.

## 3. Initial Information Architecture

The first release has exactly five primary routes, relative to the configured Astro base path:

| Route | Navigation label | Purpose |
| --- | --- | --- |
| `/` | Home | Introduce The Stars Don't Wait, establish the player fantasy, and direct visitors to the main sections. |
| `/game/` | Game | Explain the game’s pillars, core loops, setting, and explicit scope without overstating unsettled features. |
| `/engine/` | Engine | Explain the from-scratch C++20 engine, its technical principles, and selected engineering highlights. |
| `/roadmap/` | Roadmap | Summarize completed, current, and future phases from the canonical engine plan, with a link to the full plan. |
| `/updates/` | Updates | List locally authored project update posts in reverse chronological order. |

Individual update pages live at `/updates/<slug>/`. They are detail pages under Updates, not additional primary-navigation items. Keep the five labels and their order consistent in desktop navigation, mobile navigation, and the footer. Add a new top-level route only with explicit approval.

## 4. Updates and MDX Content

Store update posts locally as MDX under `src/content/updates/` and define them through an Astro content collection with schema validation. Each post must have this frontmatter:

```yaml
---
title: "Readable update title"
description: "One-sentence summary used in listings and metadata."
slug: "stable-kebab-case-slug"
publishedAt: "YYYY-MM-DD"
updatedAt: "YYYY-MM-DD" # optional; omit when never revised
tags:
  - "project"
draft: false
---
```

Rules for posts:

- `title`, `description`, `slug`, `publishedAt`, `tags`, and `draft` are required. `updatedAt` is optional and must not precede `publishedAt`.
- Use an explicit lowercase kebab-case `slug`; the public URL must not be derived from a mutable title. Once published, do not change or reuse a slug. If a rename is unavoidable, preserve the old URL with a static redirect.
- Prefer filenames matching the slug, for example `src/content/updates/renderer-foundations.mdx`.
- Treat dates as ISO calendar dates, render them in a human-readable form, and keep ordering deterministic: newest `publishedAt` first, then slug ascending as the tie-breaker.
- Exclude drafts from production listings, generated pages, feeds, and metadata. Do not rely on CSS or client-side JavaScript to hide them.
- Use MDX components sparingly. Content must remain understandable without interactive widgets.
- Validate every factual project claim against the sibling sources described above.

## 5. Technical Baseline

When the site is scaffolded, use this baseline:

- **Framework:** Astro with strict TypeScript (`astro/tsconfigs/strict` or the current strict equivalent).
- **Package manager:** npm only. Commit `package-lock.json`; do not add another package-manager lockfile.
- **Rendering:** static output only. Do not introduce server rendering, on-demand rendering, or server endpoints.
- **Deployment:** GitHub Pages at `https://axxessdenied.github.io/SolProject-website/`. Configure Astro with `site: "https://axxessdenied.github.io"` and `base: "/SolProject-website/"`; use Astro/base-aware helpers rather than root-relative asset links that break below the repository subpath.
- **Components:** prefer `.astro` components and server-rendered HTML. Add client directives and browser JavaScript only for a clear interaction that HTML and CSS cannot provide.
- **Styles:** use modern native CSS, a small set of global design tokens as custom properties, and component-scoped styles. Do not introduce a CSS framework or component library without approval.

Astro, strict TypeScript support, and Astro’s official MDX integration are part of the approved baseline. Any additional production dependency requires explicit user approval before installation. Necessary development-only tooling may be added when its value is documented and it does not ship code to visitors.

Do not add external services or dynamic infrastructure—including analytics, telemetry, third-party fonts/CDNs, forms, authentication, databases, CMSs, or hosted search—without explicit approval. Never expose secrets through `PUBLIC_` variables, client bundles, committed files, or build logs.

## 6. Design Direction

The visual language combines a cinematic sense of space with restrained technical motifs:

- Use deep, high-contrast space tones, controlled light, generous scale, and deliberate focal imagery for the cinematic layer.
- Use grids, fine rules, compact labels, data-like details, and precise typography as secondary technical accents—not as a noisy cockpit overlay.
- Establish reusable tokens for color, type, spacing, radii, borders, shadows, content widths, and motion. Components must consume tokens instead of accumulating one-off values.
- Preserve a clear editorial hierarchy and readable prose. Atmosphere must never obscure navigation, body text, focus indicators, or calls to action.
- Prefer CSS effects and optimized project media to decorative JavaScript. Avoid scroll-jacking, pointer-following effects, autoplay audio, and gratuitous animation.

Only use media owned by the project or explicitly approved by the user. Record useful source/license information with imported assets. If approved media does not exist, use an obvious labeled placeholder or a restrained CSS treatment; do not scrape images, borrow third-party art, or generate concept art to fill the gap. Meaningful images require useful alternative text; purely decorative images use empty `alt` text.

## 7. Accessibility, Semantics, and Browser Support

WCAG 2.2 AA is the minimum target. Every change must preserve:

- Responsive layouts that work from narrow mobile viewports through large desktop screens without horizontal page scrolling.
- Semantic landmarks and heading order: one descriptive `h1`, logical subsequent levels, a skip link, and native elements before ARIA.
- Complete keyboard operation, visible focus indicators, sensible focus order, and no keyboard traps.
- Sufficient text, icon, focus, and interactive-state contrast. Do not convey meaning by color alone.
- Reduced-motion behavior through `prefers-reduced-motion`; essential information must not depend on animation.
- Accessible names and states for controls, descriptive link text, labeled inputs if any are ever approved, and meaningful image alternatives.
- Comfortable reading at browser zoom up to 200% and touch targets large enough for mobile use.

Support current evergreen releases of Chrome, Edge, Firefox, and Safari. Progressive enhancement is preferred: primary content and navigation must remain available when client-side JavaScript fails or is disabled.

## 8. Verification Contract

After the Astro project and its scripts exist, keep these npm commands stable and run all of them before declaring a change complete:

```sh
npm run format:check
npm run check
npm run build
npm run test:e2e
```

Their intended responsibilities are:

- `format:check` — verify formatting without rewriting files.
- `check` — run Astro diagnostics and strict TypeScript checks.
- `build` — produce the static GitHub Pages build using the configured base path.
- `test:e2e` — run Playwright smoke tests against the production build. Cover all five primary routes, representative update detail pages, navigation at desktop and mobile widths, broken base-path assets, keyboard access, and automated accessibility checks with no serious or critical violations.

Playwright and an accessibility test helper may be added as justified development tooling when the test suite is implemented. Keep route expectations data-driven so all primary routes use the same smoke-test contract.

For visual changes, also inspect the built site manually at representative desktop and mobile viewport sizes. Check hierarchy, wrapping, overflow, hover/focus/active states, reduced motion, image behavior, and both the empty and populated Updates states as applicable. Automated screenshots do not replace this review.

Before scaffolding exists, do not claim the npm commands passed. For documentation-only work in the current repository, validate readable Markdown, run `git diff --check`, inspect `git diff`, confirm referenced sibling paths, and report that application checks are not yet applicable.

## 9. Dependencies, Assets, and Scope Control

Ask for explicit approval before adding or enabling any of the following:

- A production/runtime dependency beyond the approved Astro/MDX baseline
- An external service, analytics, tracking, cookies, or third-party embedded content
- A form submission pipeline, backend, serverless function, authentication, account, database, or CMS
- A client-side framework or hydration introduced for nonessential effects
- New licensed media, generated media, or an asset whose ownership is unclear

Keep dependency counts and browser payloads small. If development tooling is necessary, explain what requirement it enforces, install it with npm, commit the lockfile change, and keep it out of the visitor bundle.

Never commit `dist/`, Playwright output, coverage output, caches, local environment files, credentials, tokens, or other generated artifacts. Add new generated paths to `.gitignore` as part of the same change that creates them.

## 10. Git and Agent Conduct

- Keep `main` deployable. Create work branches from it using `feat/<topic>`, `fix/<topic>`, or `chore/<topic>` as appropriate.
- Keep changes focused and preserve unrelated user work in a dirty tree.
- Never commit, push, merge, publish, or deploy unless the user explicitly requests that action.
- Never modify the sibling `../SolProject` repository as part of website work unless explicitly requested.
- Do not guess about current repository state or project status. Inspect the relevant files and distinguish observed facts from proposals.
- Update this guide when an accepted architectural or workflow decision makes it inaccurate; do not silently work around it.
- Leave the repository in a reviewable state and report exactly which checks were run, including any checks that could not yet apply.
