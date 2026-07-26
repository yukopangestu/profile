# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Yuko Pangestu, Senior Full Stack Developer. Built with Angular 19 (standalone components, SSR + prerendering), TypeScript, and Tailwind CSS. Hosted on Vercel at yukopangestu.com.

## Development Commands

```bash
npm install       # Install dependencies
npm start         # Start local dev server (localhost:4200)
npm run build     # Production build — prerenders /, /portfolio, /blog, and every post
npm test          # Jest + @testing-library/angular
```

## Architecture

### Key Files & Folders
- `src/app/app.routes.ts` — Client route table (`''`, `portfolio`, `blog`, `blog/:slug`)
- `src/app/app.routes.server.ts` — Server/prerender config (`RenderMode.Prerender`, `getPrerenderParams` for blog slugs — the Angular analog of `generateStaticParams`)
- `src/app/pages/` — One folder per route: `home/`, `portfolio/`, `blog-index/`, `blog-post/`
- `src/app/components/` — Shared standalone components: `header/`, `hero-section/`, `weather-widget/`, `skills-section/`, `about-section/`, `experience-section/`, `contact-section/`, `back-to-top/`, `terminal-chrome/`, `project-card/`
- `src/app/services/` — `WeatherService` (HttpClient → Open-Meteo), `BlogService` (HttpClient → generated JSON)
- `src/app/lib/weather.ts` — Pure Open-Meteo helpers (WMO code map, formatters), no HTTP itself
- `src/app/data/experience.data.ts` — Home page experience timeline
- `src/app/data/portfolio.data.ts` — Bilingual (en/id) portfolio project data for `/portfolio`
- `src/styles.css` — Tailwind base + terminal theme custom classes/keyframes
- `public/hero_img.jpg` — Profile photo used in hero ID card
- `content/blog/*.md` — Blog posts (Markdown + frontmatter: `title`, `date`, `excerpt`). No database — add a file, commit, push to publish.
- `scripts/build-blog.mjs` — Prebuild step (runs via npm's `prestart`/`prebuild` hooks) that converts `content/blog/*.md` into `public/data/blog/*.json` (gray-matter + marked). The app fetches this JSON at runtime instead of touching the filesystem directly — a plain, inspectable step in place of the old server-component `fs` reads.

### Design System — Midnight Terminal
- **Theme**: Dark terminal (`#060b16` bg, `#0b1322` surface, `#5b9dff` accent, `#2f6fe0` primary)
- **Fonts**: Space Grotesk (body), JetBrains Mono (labels, nav, terminal chrome), Inter (portfolio page only)
- **Aesthetic**: CLI/terminal metaphor — `// comments`, `$ whoami`, terminal window chrome, monospace CTAs
- **Section labels**: `// what i bring`, `// selected works`, etc. via `.section-label`
- **Max width**: `max-w-content` (1240px)
- **Shared**: `TerminalChromeComponent` for window chrome dots + title bar
- **Portfolio page**: separate "Nocturne" theme scoped under `.nocturne-portfolio` in `portfolio.component.css`, applied with `ViewEncapsulation.None` — the stylesheet self-scopes every selector, and `ProjectCardComponent` renders as a separate child component, so Angular's default per-component style scoping would otherwise never let these rules reach it

### Vercel Deployment
- Live URL: **https://www.yukopangestu.com** — use this to verify changes when localhost is unavailable
- Root directory: `/` (repo root)
- Framework: Angular (SSR) — if deployments start failing after this migration, check the Vercel dashboard's Framework Preset under Settings → General; it may still be pinned to the old Next.js setting and need switching to Angular manually
- No `vercel.json` needed
- Deployments trigger on push to `main` and may take a few minutes to propagate

## Windows dev environment gotchas

Two npm optional-dependency bugs (https://github.com/npm/cli/issues/4828) can silently break things on Windows after a fresh `npm install` — both show as a missing native `.node` binding:
- `ng serve` fails with `Cannot find module '@rollup/rollup-win32-x64-msvc'`
- Jest fails to resolve *any* module (even its own defaults) because `unrs-resolver` can't find `@unrs/resolver-binding-win32-x64-msvc`

Both packages are already pinned in `package.json` devDependencies specifically to work around this — if it recurs, reinstalling should be enough; no code change needed.

## Workflow

- Always `git pull` before starting any work, to avoid conflicts with changes pushed elsewhere
- For any UI change or improvement, check the mobile viewport (e.g. 375x812) in addition to desktop before considering it done — this site has previously shipped fixed/floating elements that overlapped content only at mobile widths
- After every prompt, commit and push changes to `main`
