# 🚀 Yuko Pangestu - Portfolio Website

> A modern, responsive portfolio showcasing the journey of a Technical Lead passionate about web development and team leadership.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Portfolio-brightgreen?style=for-the-badge&logo=globe)](your-portfolio-url-here)
[![Built with SASS](https://img.shields.io/badge/Built%20with-SASS-ff69b4?style=for-the-badge&logo=sass)](https://sass-lang.com/)
[![Multilingual](https://img.shields.io/badge/Language-EN%20|%20ID-blue?style=for-the-badge&logo=google-translate)](translations.js)

## ✨ Features

- 🎨 **Modern Design** - Clean, professional interface with smooth animations
- 📱 **Fully Responsive** - Optimized for all devices and screen sizes
- 🌍 **Multilingual Support** - Available in English and Indonesian
- ⚡ **Fast Loading** - Optimized performance with efficient SASS architecture
- 🎯 **Interactive Elements** - Smooth scrolling, parallax effects, and hover animations
- 📊 **Professional Timeline** - Visual representation of career progression
- 🛠️ **Tech Stack Showcase** - Highlighting technical expertise and project portfolio

## 🏗️ Architecture

This portfolio is built with modern web technologies following best practices:

### 📁 Project Structure

```
portfolio/
├── 📄 index.html          # Single-page application
├── 🎨 sass/               # Modular SASS architecture (7-1 pattern)
│   ├── abstracts/         # Variables, mixins, functions
│   ├── base/             # Reset and base styles
│   ├── components/       # Reusable UI components
│   ├── layout/           # Layout-specific styles
│   └── styles.scss       # Main entry point
├── ⚡ script.js           # Interactive features & animations
├── 🌐 translations.js    # Multilingual content
├── 🎯 styles.css         # Compiled CSS output
└── 📚 CLAUDE.md          # Development guidelines
```

### 🎨 SASS Architecture (7-1 Pattern)

The stylesheet follows the industry-standard **7-1 SASS architecture** for maximum maintainability:

```scss
sass/
├── abstracts/
│   ├── _variables.scss    // 🎨 Colors, breakpoints, typography
│   ├── _mixins.scss      // 🔧 Reusable code patterns
│   └── _index.scss       // 📦 Module exports
├── base/
│   ├── _reset.scss       // 🔄 CSS normalization
│   └── _index.scss       // 📦 Module exports
├── components/
│   ├── _buttons.scss     // 🔘 Button variants
│   ├── _cards.scss      // 📇 Card components
│   ├── _timeline.scss   // ⏰ Career timeline
│   └── _index.scss      // 📦 Module exports
├── layout/
│   ├── _navigation.scss  // 🧭 Site navigation
│   ├── _sections.scss   // 📑 Page sections
│   └── _index.scss      // 📦 Module exports
└── styles.scss          // 🎯 Main compilation entry
```

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (for SASS compilation)
- Modern web browser

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd profile
   ```

2. **Install SASS globally** (if not already installed)
   ```bash
   npm install -g sass
   ```

3. **Compile SASS to CSS**
   ```bash
   sass sass/styles.scss styles.css
   ```

4. **Development with watch mode** (recommended)
   ```bash
   sass --watch sass/styles.scss:styles.css
   ```

5. **Open the portfolio**
   ```bash
   # Using a simple HTTP server
   npx serve .
   # Or open directly in browser
   open index.html
   ```

## 🛠️ Development Workflow

### Making Style Changes

1. **Edit SASS files** in the `sass/` directory (never edit `styles.css` directly)
2. **Run compilation** to generate updated CSS
3. **Test changes** in the browser
4. **Follow the 7-1 pattern** when adding new styles

### Adding New Components

```scss
// sass/components/_new-component.scss
.new-component {
  // Use existing variables and mixins
  color: var(--color-primary);
  
  @include mobile {
    // Mobile-first responsive design
    font-size: 0.9rem;
  }
}
```

Don't forget to add your new component to `sass/components/_index.scss`:
```scss
@forward 'new-component';
```

## 🎨 Design System

### Color Palette
- **Primary**: Deep purple theme with modern gradients
- **Accent**: Vibrant complementary colors for highlights
- **Neutral**: Professional grayscale for text and backgrounds

### Typography
- **Font Family**: Inter (Google Fonts) - modern, readable
- **Hierarchy**: Consistent sizing scale with proper contrast

### Breakpoints
```scss
$breakpoint-mobile: 768px;  // Mobile-first approach
```

## 🌍 Internationalization

The portfolio supports multiple languages through the `translations.js` system:

- **English** (EN) - Default language
- **Indonesian** (ID) - Localized content

Content is dynamically switched using `data-i18n` attributes and JavaScript.

## ⚡ Performance Features

- **Optimized Images** - Efficient loading and compression
- **Minimal Dependencies** - Only essential external resources
- **Clean Code** - Semantic HTML and organized CSS
- **Fast Compilation** - Efficient SASS build process

## 📱 Responsive Design

Built with a **mobile-first approach**:
- ✅ Mobile phones (320px+)
- ✅ Tablets (768px+)
- ✅ Desktops (1024px+)
- ✅ Large screens (1200px+)

## 🤝 Contributing

This is a personal portfolio project, but feedback and suggestions are welcome! 

### Development Guidelines

1. Follow the existing SASS architecture
2. Use semantic HTML and accessible markup
3. Test changes across different devices
4. Maintain consistent code style
5. Update documentation for significant changes

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📧 Contact

**Yuko Pangestu** - Technical Lead  
🏢 Paper.id  
📍 Jakarta, Indonesia  

Feel free to reach out for collaboration opportunities or technical discussions!

---

<p align="center">
  <strong>🔥 Built with passion and modern web technologies 🔥</strong><br>
  <em>Showcasing the journey of continuous learning and technical leadership</em>
</p>