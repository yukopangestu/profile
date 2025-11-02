# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Yuko Pangestu, a Technical Lead at Paper.id. It's a single-page application showcasing professional experience, technical skills, and projects with modern web technologies.

## Development Commands

### Testing Changes
```bash
# Open in browser to test changes
open index.html
# or serve locally with any static server
```

## Architecture

### Key Files
- `index.html`: Single-page portfolio with all sections
- `script.js`: Interactive features using jQuery (navigation, animations, mobile menu, parallax, swipe deck)
- `styles.css`: All styling for the site (direct editing)

### Design System
- **Colors**: Blue-based theme with vibrant accent colors
  - Primary Blue: #1E40AF
  - Secondary Blue: #3B82F6
  - Dark Blue: #1E3A8A
  - Light Blue: #DBEAFE, #EFF6FF
  - Accent: #60A5FA
- **Breakpoints**: Mobile-first approach with breakpoint at 768px
- **Container**: Max-width of 1200px
- **Components**: Consistent button variants, card styles, timeline visualization

### JavaScript Stack
- **jQuery 3.7.1**: Loaded via CDN for DOM manipulation and event handling
- **Features**:
  - Swipe deck functionality with pointer events
  - Loading animation with progress bar
  - Navigation scroll effects
  - Mobile menu toggle
  - Smooth scrolling
  - Intersection Observer for fade-in animations
  - Typing effect for hero title
  - Parallax scrolling
  - Skill bar animations

## Development Workflow

1. **Style Changes**: Edit `styles.css` directly for any styling updates
2. **JavaScript Changes**: Edit `script.js` using jQuery syntax
3. **Testing**: Open `index.html` in a browser to test changes
4. **Responsive Design**: Test on different screen sizes (mobile breakpoint: 768px)

## Important Notes

- No build process required - pure HTML, CSS, and jQuery
- jQuery is loaded from CDN (no local dependencies)
- Mobile menu and scroll animations use jQuery event handlers
- Swipe deck uses native pointer events for touch/mouse interactions
- Project showcases professional experience with interactive timeline and swipe cards
