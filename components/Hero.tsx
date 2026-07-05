import { siteConfig } from '@/config';
import Eyebrow from './Eyebrow';

/**
 * Renders the tagline from config.ts with "Live." italicized for the
 * magazine-poster emphasis look. If you edit `siteConfig.tagline` and
 * remove the word "Live.", this just renders the plain string — update
 * the marker below to match whatever word you want emphasized instead.
 */
function TaglineWithEmphasis({ tagline }: { tagline: string }) {
  const marker = 'Live.';
  const markerIndex = tagline.indexOf(marker);

  if (markerIndex === -1) {
    return <>{tagline}</>;
  }

  return (
    <>
      {tagline.slice(0, markerIndex)}
      <em className="italic text-accent">{marker}</em>
      {tagline.slice(markerIndex + marker.length)}
    </>
  );
}

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-14 pt-16 sm:px-8 sm:pb-20 sm:pt-24">
      <Eyebrow>Software Engineer &middot; YouTuber</Eyebrow>
      <h1 className="mt-6 max-w-4xl font-display text-5xl font-black leading-[1.05] tracking-tight text-fg sm:text-7xl">
        {siteConfig.name}
      </h1>
      <p className="mt-8 max-w-2xl font-display text-2xl leading-snug text-fg sm:text-3xl">
        <TaglineWithEmphasis tagline={siteConfig.tagline} />
      </p>
    </section>
  );
}
