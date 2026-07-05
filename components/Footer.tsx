import { siteConfig, socialLinks } from '@/config';
import SocialIcon from './SocialIcon';

/**
 * Big footer with social links (from /config.ts) and a copyright line.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-bg-raised">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <p className="font-display text-3xl font-bold italic tracking-tight text-fg sm:text-4xl">
          Find the root cause.
        </p>
        <p className="mt-3 max-w-md text-sm text-muted">{siteConfig.description}</p>

        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          {socialLinks.map((social) => (
            <li key={social.platform}>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted transition-colors hover:text-accent"
              >
                <SocialIcon platform={social.platform} />
                {social.platform}
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-12 text-xs uppercase tracking-wide text-muted">
          © {year} {siteConfig.author}. All incidents recreated without warranty.
        </p>
      </div>
    </footer>
  );
}
