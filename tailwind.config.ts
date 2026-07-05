import type { Config } from 'tailwindcss';

// Colors resolve to CSS custom properties (defined per-theme in app/globals.css)
// so `bg-bg`, `text-fg`, `text-accent`, etc. automatically flip with the
// [data-theme] attribute on <html> — no duplicate light/dark class variants needed.
const config: Config = {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{mdx,md}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        'bg-raised': 'var(--color-bg-raised)',
        fg: 'var(--color-fg)',
        muted: 'var(--color-muted)',
        accent: 'var(--color-accent)',
        border: 'var(--color-border)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        // Duration is tuned per-instance with an inline style (see Marquee.tsx)
        // so the speed can vary by phrase count without editing Tailwind config.
        marquee: 'marquee 32s linear infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
