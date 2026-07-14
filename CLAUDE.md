# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Yuko Pangestu, Technical Lead at Paper.id. Built with Next.js 14 (App Router), TypeScript, and Tailwind CSS. Hosted on Vercel at yukopangestu.com.

## Development Commands

```bash
npm install       # Install dependencies
npm run dev       # Start local dev server (localhost:3000)
npm run build     # Production build
npm run start     # Start production server locally
```

## Architecture

### Key Files & Folders
- `src/app/page.tsx` — Root page, composes all sections
- `src/app/layout.tsx` — HTML shell, metadata, font
- `src/app/globals.css` — Tailwind base + custom keyframes (fadeInUp, blink)
- `src/lib/weather.ts` — Open-Meteo client fetch (browser-direct, no API key), WMO map, format helpers
- `src/components/` — One file per section:
  - `Header.tsx` — Sticky nav with scroll shadow, mobile menu (`use client`)
  - `HeroSection.tsx` — Hero with photo frame + live weather widget
  - `WeatherWidget.tsx` — Terminal-styled weather (`chip` | `panel`, client → Open-Meteo)

  - `AboutSection.tsx` — Stats grid + bio
  - `SkillsSection.tsx` — Animated skill bars via IntersectionObserver (`use client`)
  - `PortfolioSection.tsx` — Carousel with prev/next + dot indicators (`use client`)
  - `ExperienceSection.tsx` — Vertical timeline
  - `ContactSection.tsx` — Email, location, social links, footer
- `src/data/index.ts` — All content data (skills, portfolio items, experiences)
- `public/hero_img.jpg` — Profile photo used in hero ID card
- `next.config.js` — Allows remote images from i.imgur.com
- `src/lib/blog.ts` — Reads/parses Markdown posts from `content/blog/` (gray-matter frontmatter)
- `content/blog/*.md` — Blog posts (Markdown + frontmatter: `title`, `date`, `excerpt`). No database — add a file, commit, push to publish.
- `src/app/blog/page.tsx` — Blog index (lists posts)
- `src/app/blog/[slug]/page.tsx` — Blog post detail (renders Markdown via `react-markdown` + `remark-gfm`, statically generated via `generateStaticParams`)

### Design System — Midnight Terminal
- **Theme**: Dark terminal (`#060b16` bg, `#0b1322` surface, `#5b9dff` accent, `#2f6fe0` primary)
- **Fonts**: Space Grotesk (body), JetBrains Mono (labels, nav, terminal chrome)
- **Aesthetic**: CLI/terminal metaphor — `// comments`, `$ whoami`, terminal window chrome, monospace CTAs
- **Section labels**: `// what i bring`, `// selected works`, etc. via `.section-label`
- **Max width**: `max-w-content` (1240px)
- **Shared**: `TerminalChrome` component for window chrome dots + title bar

### Vercel Deployment
- Live URL: **https://www.yukopangestu.com** — use this to verify changes when localhost is unavailable
- Root directory: `/` (repo root)
- Framework: Next.js (auto-detected)
- No `vercel.json` needed
- Deployments trigger on push to `main` and may take a few minutes to propagate

## Backup (Original HTML Portfolio)

The original static HTML/CSS/jQuery portfolio is preserved in `original/` for revert purposes:
- `original/index.html` — Full single-page portfolio
- `original/styles.css` — All styles
- `original/script.js` — jQuery interactions (swipe deck, animations, parallax)
- `original/assets/` — Images and favicon

To revert: copy those files back to the repo root and remove the Next.js files.

## Workflow

- Always `git pull` before starting any work, to avoid conflicts with changes pushed elsewhere
- For any UI change or improvement, check the mobile viewport (e.g. 375x812) in addition to desktop before considering it done — this site has previously shipped fixed/floating elements that overlapped content only at mobile widths
- After every prompt, commit and push changes to `main`
