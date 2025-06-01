# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Yuko Pangestu, a Technical Lead at Paper.id. It's a single-page application showcasing professional experience, technical skills, and projects with modern web technologies.

## Development Commands

### SASS Compilation
```bash
# Compile SASS to CSS (required after any SASS changes)
sass sass/styles.scss styles.css

# Development with watch mode
sass --watch sass/styles.scss:styles.css
```

### Testing Changes
```bash
# Open in browser to test changes
open index.html
# or serve locally with any static server
```

## Architecture

### SASS Structure (7-1 Pattern)
The project uses modular SASS architecture with `@use` and `@forward`:

- **Entry point:** `sass/styles.scss` → compiles to `styles.css`
- **abstracts/**: Variables, mixins, functions (color palette, breakpoints, reusable mixins)
- **base/**: CSS reset and base styles
- **components/**: Reusable UI components (buttons, cards, timeline)
- **layout/**: Layout-specific styles (navigation, sections)
- **pages/**: Page-specific styles (currently empty)

### Key Files
- `index.html`: Single-page portfolio with all sections
- `script.js`: Interactive features (navigation, animations, mobile menu, parallax)
- `sass/styles.scss`: Main SASS entry point using `@use` imports
- `styles.css`: Compiled output (2000+ lines)

### Design System
- **Colors**: Purple-based theme with accent colors defined in `_variables.scss`
- **Breakpoints**: Mobile-first approach with `$breakpoint-mobile: 768px`
- **Container**: Max-width of 1200px
- **Components**: Consistent button variants, card styles, timeline visualization

## Development Workflow

1. **SASS Changes**: Always edit `.scss` files, never the compiled `styles.css`
2. **Compilation**: Run SASS compilation after any style changes
3. **File Organization**: Follow the 7-1 pattern when adding new styles
4. **Variables**: Use existing color variables and mixins from `abstracts/` folder
5. **Responsive Design**: Use the `@include mobile` mixin for mobile-first development

## Important Notes

- No package.json - relies on global SASS installation
- Uses modern SASS syntax (`@use` instead of `@import`)
- All components are organized by functionality in separate SCSS files
- Mobile menu and scroll animations are handled in `script.js`
- Project showcases professional experience with interactive timeline and project cards