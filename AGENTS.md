# Repository Guidelines

## Project Structure & Module Organization
`index.html` powers the entire single-page portfolio; keep new sections semantic, scoped by `data-i18n` keys, and place heavy layout changes near existing section wrappers. SASS follows the 7-1 pattern under `sass/` (abstracts, base, components, layout); add fresh partials in the correct folder and expose them through the nearest `_index.scss`. Interaction logic lives in `script.js`, so extend navigation, animation, or localization helpers there. Update `translations.js` whenever visible copy changes, mirroring both English and Indonesian objects.

## Build, Test, and Development Commands
- `sass sass/styles.scss styles.css` — one-off compile; run before committing.
- `sass --watch sass/styles.scss:styles.css` — watches for SASS edits during active work.
- `npx serve .` — lightweight static server for manual verification; any equivalent static host is fine.
- `open index.html` — quick smoke test without a server (use OS alternative if unavailable).

## Coding Style & Naming Conventions
Use two-space indentation across HTML, SCSS, and JavaScript. Stick to BEM-style selectors and SASS nesting via `&-` modifiers inside each block. Prefer `@use` with namespace imports and share tokens through `sass/abstracts/_variables.scss`. JavaScript utilities should be arrow functions grouped near the top of `script.js`, with descriptive names for observers, handlers, and animation helpers. Never edit `styles.css` or `styles.css.map` directly; regenerate instead.

## Testing Guidelines
No automated suite exists, so rely on manual checks. Validate layouts at 320px, 768px, 1024px, and 1200px, ensuring scroll-triggered animations stay smooth. Toggle the language selector to confirm every `data-i18n` string updates. Run a Lighthouse audit (Performance + Accessibility ≥ 90) before shipping, and sanity-check key interactions in the latest Chrome, Safari, and a mobile emulator.

## Commit & Pull Request Guidelines
Follow the `type(scope): message` format (example: `feat(layout): add timeline section`) and keep subjects under 72 characters. Squash experimental commits locally and cross-reference issues or TODO comments when appropriate. Pull requests should summarize the change, list touched SASS partials, attach screenshots or GIFs for UI updates, mention which browsers/viewports were tested, and flag any breaking UI or copy adjustments.

## Localization & Accessibility
Every new text node needs a `data-i18n` key plus translations in both locales; reuse existing keys whenever possible. Maintain semantic HTML, ensure focus states remain visible after style tweaks, and keep motion preferences in mind when adding animations.
