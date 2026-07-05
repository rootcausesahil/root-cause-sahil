import type { socialLinks } from '@/config';

type Platform = (typeof socialLinks)[number]['platform'];

const sharedProps = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

/**
 * Small line-icon per social platform, drawn by hand rather than pulled
 * from an icon library — keeps the bundle dependency-free and matches the
 * site's minimalist stroke style. Not meant to be pixel-perfect brand
 * logos, just a recognizable glyph next to each handle in the footer.
 */
export default function SocialIcon({ platform }: { platform: Platform }) {
  switch (platform) {
    case 'YouTube':
      return (
        <svg {...sharedProps}>
          <rect x="2.5" y="6" width="19" height="12" rx="3.5" />
          <path d="M10.5 9.3v5.4l4.7-2.7z" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'X':
      return (
        <svg {...sharedProps}>
          <path d="M5 5l14 14M19 5L5 19" />
        </svg>
      );
    case 'Instagram':
      return (
        <svg {...sharedProps}>
          <rect x="4" y="4" width="16" height="16" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="16.8" cy="7.2" r="0.6" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'GitHub':
      return (
        <svg {...sharedProps}>
          <path d="M8 9l-3 3 3 3M16 9l3 3-3 3M13.5 6l-3 12" />
        </svg>
      );
    case 'Twitch':
      return (
        <svg {...sharedProps}>
          <rect x="4" y="4.5" width="16" height="12" rx="2" />
          <path d="M9 20l3-3 3 3" />
        </svg>
      );
    default:
      return null;
  }
}
