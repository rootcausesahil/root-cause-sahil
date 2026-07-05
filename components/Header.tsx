import Link from 'next/link';
import { siteConfig, navLinks } from '@/config';
import ThemeToggle from './ThemeToggle';

/**
 * Site header: channel name/logo, primary nav, and the theme toggle.
 * Nav links come from `navLinks` in /config.ts.
 */
export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur">
      <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link
          href="/"
          className="font-display text-lg font-bold tracking-tight text-fg sm:text-xl"
        >
          <span className="hidden sm:inline">{siteConfig.name}</span>
          <span className="sm:hidden">{siteConfig.shortName}</span>
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          <nav aria-label="Primary" className="flex items-center gap-4 sm:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium uppercase tracking-wide text-muted transition-colors hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="text-sm font-medium uppercase tracking-wide text-muted transition-colors hover:text-accent"
            >
              Contact
            </a>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
