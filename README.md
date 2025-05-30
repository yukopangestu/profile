# Profile Website - SASS Implementation

This project has been converted from CSS to SASS for better maintainability and organization.

## SASS Structure

The SASS files are organized in a modular structure:

```
sass/
├── abstracts/
│   ├── _variables.scss    # Variables for colors, breakpoints, etc.
│   ├── _mixins.scss       # Reusable mixins for common patterns
│   └── _index.scss        # Forwards all abstracts
├── base/
│   ├── _reset.scss        # Basic reset styles
│   └── _index.scss        # Forwards all base styles
├── components/
│   ├── _buttons.scss      # Button styles
│   ├── _cards.scss        # Card component styles
│   ├── _timeline.scss     # Timeline component styles
│   └── _index.scss        # Forwards all components
├── layout/
│   ├── _navigation.scss   # Navigation styles
│   ├── _sections.scss     # Section layouts
│   └── _index.scss        # Forwards all layouts
└── styles.scss            # Main file that imports all partials
```

## How to Compile SASS

To compile the SASS files to CSS, you'll need to:

1. Install SASS if you haven't already:
   ```
   npm install -g sass
   ```

2. Compile the SASS to CSS:
   ```
   sass sass/styles.scss styles.css
   ```

3. For development with auto-recompilation:
   ```
   sass --watch sass/styles.scss:styles.css
   ```

## Benefits of SASS

- **Variables**: Easy to maintain consistent colors and values
- **Nesting**: Cleaner, more readable code that mirrors HTML structure
- **Mixins**: Reusable code blocks for common patterns
- **Partials**: Better organization with modular files
- **Functions**: Advanced calculations and operations

## Original CSS

The original CSS file (`styles.css`) has been preserved, but all future styling changes should be made to the SASS files and then compiled to CSS.