/**
 * SITE CONFIG
 * ───────────
 * Every piece of editable copy on the site lives in this one file:
 * channel name, tagline, bio, social links, and the marquee ticker phrases.
 *
 * If you want to change what the site *says*, this is almost always the
 * only file you need to touch. Component files under /components and /app
 * should just read from here — they shouldn't hardcode copy.
 *
 * NOTE on italics: the hero heading on the home page hand-places a couple
 * of italicized words for the magazine-poster look (e.g. "Live." in the
 * tagline). That's a typographic/design choice made in the component's JSX,
 * not content, so it isn't modeled here. If you change `tagline` below,
 * open components/Hero.tsx and re-check which word(s) are italicized.
 */

export const siteConfig = {
  /** Full channel name, used in the header, footer, and page titles. */
  name: 'Root Cause: Sahil',

  /** Shorter variant, used where space is tight (e.g. mobile header). */
  shortName: 'Root Cause',

  /** Hero tagline on the home page. */
  tagline: "Recreating the internet's worst outages. Live. On my laptop.",

  /**
   * Short summary used in <meta description>, social share previews, and
   * the footer blurb. Keep it to ~1-2 sentences — for the full multi-
   * paragraph bio shown in the home page's About section, see
   * `aboutParagraphs` below instead.
   */
  description:
    'I build backend systems on AWS by day, and rebuild infamous ' +
    'engineering failures — plus deliberately over-engineered, mostly ' +
    'useless software — by night.',

  /** Production domain — used to build absolute URLs (RSS, canonical, OG). */
  url: 'https://rootcausesahil.com',

  /** Used for footer copyright and default author metadata. */
  author: 'Sahil',
} as const;

/**
 * Full bio shown in the home page's About section, one paragraph per
 * array entry. Edit freely — add/remove paragraphs as needed, the About
 * section just maps over whatever's here.
 */
export const aboutParagraphs = [
  "By day, I build backend systems on AWS—microservices, APIs, observability, and the infrastructure that keeps applications running.",
  "By night, I reconstruct infamous engineering failures to uncover the real root cause, then build deliberately over-engineered (and mostly useless) software just to see what breaks.",
  "If you've ever wondered how billion-dollar outages happen—or why simple systems become beautifully complicated—you're in the right place.",
] as const;

/**
 * Top-level nav links shown in the header. `href` is site-relative.
 */
export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
] as const;

/**
 * Social links, in the order they should render in the footer.
 * `handle` is display-only; `href` is a placeholder — swap in your real
 * profile URLs whenever you have them.
 */
export const socialLinks = [
  {
    platform: 'YouTube',
    handle: '@rootcausesahil',
    href: 'https://www.youtube.com/@rootcausesahil',
  },
  {
    platform: 'X',
    handle: '@rootcausesahil',
    href: 'https://x.com/rootcausesahil',
  },
  {
    platform: 'Instagram',
    handle: '@rootcausesahil',
    href: 'https://www.instagram.com/rootcausesahil',
  },
  {
    platform: 'GitHub',
    handle: '@rootcausesahil',
    href: 'https://github.com/rootcausesahil',
  },
  {
    platform: 'Twitch',
    handle: '@rootcausesahil',
    href: 'https://www.twitch.tv/rootcausesahil',
  },
] as const;

/**
 * Phrases that scroll through the marquee ticker on the home page, in order.
 * The Marquee component repeats this whole list to fill the row, then
 * duplicates the row once more for a seamless CSS-animation loop — you
 * don't need to pad it out yourself, just list the phrases once.
 */
export const marqueePhrases = [
  'RECREATING THE DISASTERS',
  'ROOT CAUSE: SAHIL',
  'THINGS BREAK, I EXPLAIN WHY',
  'IT WAS DNS',
  'BUILT ON A LAPTOP, BROKEN ON PURPOSE',
] as const;
