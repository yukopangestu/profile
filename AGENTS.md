# Repository Guidelines

## Project Structure & Module Organization
- `index.html` delivers the entire single-page portfolio; keep new sections semantic and scoped with `data-i18n` keys when they need translation.
- `sass/` follows the 7-1 architecture (`abstracts`, `base`, `components`, `layout`, `styles.scss` entry). Add new partials under the correct folder and expose them through the nearest `_index.scss`.
- `script.js` handles navigation, animations, and language toggles; prefer modular helper functions when expanding interactions.
- `translations.js` stores English and Indonesian strings. Mirror the existing object shape and reuse keys across sections.
- `styles.css` is compiled output—never edit it directly; regenerate via SASS commands instead.

## Build, Test, and Development Commands
- `sass sass/styles.scss styles.css` — one-off SASS compile before committing.
- `sass --watch sass/styles.scss:styles.css` — watch mode during development; reruns compilation on save.
- `npx serve .` — launch a lightweight static server (any equivalent static server works if `npx` is unavailable).
- `open index.html` — quick manual check without a server; use your platform’s alternative if `open` is missing.

## Coding Style & Naming Conventions
- Use two-space indentation in HTML, SCSS, and JavaScript to match existing files.
- Prefer BEM-style modifiers (`.btn`, `.btn-primary`) and compose selectors with `&-` nesting inside component blocks.
- Rely on SASS `@use` with namespace (`@use '../abstracts' as *;`) instead of `@import`; keep shared tokens in `abstracts/_variables.scss`.
- Group JavaScript utilities near the top of `script.js`, favoring arrow functions and descriptive names for handlers and observers.

## Testing Guidelines
- No automated tests exist; perform manual checks in the latest Chrome, Safari, and mobile viewport emulators.
- Validate responsive breakpoints (320px, 768px, 1024px, 1200px) and ensure animations remain smooth.
- Toggle languages via the header selector and verify every `data-i18n` string updates correctly.
- Before shipping, run a quick Lighthouse audit to confirm performance and accessibility stay above 90.

## Commit & Pull Request Guidelines
- Follow the prevailing commit style: `type(scope): message` when possible (`feat(layout): add timeline section`); keep subjects imperative and under 72 characters.
- Squash experimental commits locally to keep history clean; reference issues or TODOs inline when relevant.
- Pull requests should outline the change, note any SASS partials touched, include screenshots or GIFs for visible updates, and mention manual browsers tested.
- Flag breaking UI or copy changes prominently and coordinate translation updates with any new keys.
