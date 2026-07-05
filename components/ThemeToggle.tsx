'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

/**
 * Dark/light toggle button for the header.
 *
 * The actual theme is already applied before this component ever mounts
 * (see lib/theme-script.ts, run inline in <head>), so this component's
 * job is just to reflect + change it, not decide it.
 *
 * State starts at 'dark' on both server and first client render (so
 * hydration always matches), then syncs to whatever the pre-paint script
 * actually set, in an effect that runs right after mount.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme');
    if (current === 'light' || current === 'dark') {
      setTheme(current);
    }
  }, []);

  function toggleTheme() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-fg transition-colors hover:border-accent hover:text-accent"
    >
      <span aria-hidden="true" className="text-base leading-none">
        {theme === 'dark' ? '☀' : '☾'}
      </span>
    </button>
  );
}
