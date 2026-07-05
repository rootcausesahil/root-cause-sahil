'use client';

import { useState } from 'react';
import Link from 'next/link';
import { siteConfig, navLinks } from '@/config';

/**
 * Hamburger menu + dropdown panel, shown only below `sm`. Above `sm`,
 * Header renders `navLinks` (and Contact) inline instead — see Header.tsx.
 * Exists because cramming the logo, every nav link, and the theme toggle
 * onto one row wraps/crowds badly on narrow phone widths.
 */
export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? 'Close menu' : 'Open menu'}
        className="btn-press flex h-9 w-9 items-center justify-center border border-border bg-bg-raised text-fg hover:border-accent hover:text-accent"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          aria-hidden="true"
        >
          {open ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>

      {open && (
        <nav
          aria-label="Primary"
          className="absolute inset-x-0 top-full flex flex-col border-b border-border bg-bg px-5 py-4"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-3 text-sm font-medium uppercase tracking-wide text-muted transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            onClick={() => setOpen(false)}
            className="py-3 text-sm font-medium uppercase tracking-wide text-muted transition-colors hover:text-accent"
          >
            Contact
          </a>
        </nav>
      )}
    </div>
  );
}
