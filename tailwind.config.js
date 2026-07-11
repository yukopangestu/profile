/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        terminal: {
          bg: '#060b16',
          surface: '#0b1322',
          alt: '#080f1d',
          border: 'rgba(88, 140, 255, 0.18)',
          'border-dim': 'rgba(88, 140, 255, 0.14)',
          'border-strong': 'rgba(88, 140, 255, 0.3)',
          blue: '#5b9dff',
          'blue-bright': '#8ebcff',
          primary: '#2f6fe0',
          'primary-hover': '#4d8dff',
          text: '#e6edf7',
          muted: '#a8b8d4',
          dim: '#8fa3c4',
          faint: '#6f83a6',
          soft: '#c9d6ee',
          green: '#3ddc84',
          dot: '#26365a',
        },
      },
      fontFamily: {
        sans: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        content: '1240px',
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        sm: '0.1875rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.625rem',
        full: '9999px',
      },
      keyframes: {
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
      },
      animation: {
        blink: 'blink 1.2s step-end infinite',
      },
    },
  },
  plugins: [],
};
