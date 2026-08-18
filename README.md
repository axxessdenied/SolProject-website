# The Stars Don't Wait website

The static public showcase for **The Stars Don't Wait**, developed in the [SolProject](https://github.com/axxessdenied/SolProject) repository and built here with Astro and MDX.

## Local development

Requires Node.js 22.19 or newer and npm 10 or newer. The minimum keeps the
Astro toolchain on currently patched releases; `.nvmrc` records a known-good
runtime.

```sh
npm install
npm run dev
```

Astro serves the site below its production base path at `/SolProject-website/`.

## Verification

```sh
npm run format:check
npm run check
npm run build
npm run test:e2e
```

Prettier keeps source formatting deterministic. Astro diagnostics enforce strict TypeScript and template correctness. Playwright exercises the production build, and axe checks representative pages for serious or critical accessibility violations. These tools are development-only and do not add code to the visitor bundle.

## Content

Project updates live in `src/content/updates/` as validated MDX. Game, engine, and roadmap copy is curated from the canonical documents in the sibling SolProject repository; the site does not read those documents at build time.
