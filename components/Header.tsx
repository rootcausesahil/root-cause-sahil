import Link from 'next/link';
import { siteConfig, navLinks } from '@/config';
import ThemeToggle from './ThemeToggle';
import MobileNav from './MobileNav';

/**
 * Site header: channel name/logo, primary nav, and the theme toggle.
 * Nav links come from `navLinks` in /config.ts.
 *
 * Below `sm`, the inline nav is replaced by `MobileNav`'s hamburger +
 * dropdown — logo, every nav link, Contact, and the theme toggle all on
 * one row wraps/crowds badly at phone widths.
 */
export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur">
      <div className="relative flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-display text-base font-bold tracking-tight text-fg sm:text-xl"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- static export, no next/image optimization anyway */}
          <img src="/logo.svg" alt="" width={36} height={36} className="h-9 w-9 rounded-full" />
          {siteConfig.name}
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          <nav aria-label="Primary" className="hidden items-center gap-4 sm:flex sm:gap-6">
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
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
