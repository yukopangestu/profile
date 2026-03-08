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
- `src/components/` — One file per section:
  - `Header.tsx` — Sticky nav with scroll shadow, mobile menu (`use client`)
  - `HeroSection.tsx` — ID card hero with typing effect and barcode (`use client`)
  - `AboutSection.tsx` — Stats grid + bio
  - `SkillsSection.tsx` — Animated skill bars via IntersectionObserver (`use client`)
  - `PortfolioSection.tsx` — Carousel with prev/next + dot indicators (`use client`)
  - `ExperienceSection.tsx` — Vertical timeline
  - `ContactSection.tsx` — Email, location, social links, footer
- `src/data/index.ts` — All content data (skills, portfolio items, experiences)
- `public/hero_img.jpg` — Profile photo used in hero ID card
- `next.config.js` — Allows remote images from i.imgur.com

### Design System
- **Theme**: Blue-based (`blue-900`, `blue-700`, `blue-50`, `white`)
- **Section headings**: `text-4xl font-bold`
- **Body text**: `text-base`
- **Subtitles**: `text-lg text-gray-400`
- **Max widths**: `max-w-5xl` (wide sections), `max-w-3xl` (experience), `max-w-2xl` (hero/portfolio/contact)

### Vercel Deployment
- Root directory: `/` (repo root)
- Framework: Next.js (auto-detected)
- No `vercel.json` needed

## Backup (Original HTML Portfolio)

The original static HTML/CSS/jQuery portfolio is preserved in `original/` for revert purposes:
- `original/index.html` — Full single-page portfolio
- `original/styles.css` — All styles
- `original/script.js` — jQuery interactions (swipe deck, animations, parallax)
- `original/assets/` — Images and favicon

To revert: copy those files back to the repo root and remove the Next.js files.

## Workflow

- After every prompt, commit and push changes to `main`
