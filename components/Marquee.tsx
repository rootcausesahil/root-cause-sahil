import { marqueePhrases } from '@/config';

const SEPARATOR = '✦';

/**
 * One pass of the ticker content: every phrase from config, joined by a
 * separator glyph. Rendered twice by <Marquee> back-to-back so the CSS
 * animation can scroll exactly -50% and loop with no visible seam.
 */
function MarqueeTrack({ hidden }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={hidden}>
      {marqueePhrases.map((phrase, i) => (
        <span key={i} className="flex items-center">
          <span className="px-6 font-display text-sm font-semibold uppercase tracking-[0.15em] text-fg sm:text-base">
            {phrase}
          </span>
          <span className="select-none text-accent" aria-hidden="true">
            {SEPARATOR}
          </span>
        </span>
      ))}
    </div>
  );
}

/**
 * Animated horizontal ticker strip. Content comes from `marqueePhrases` in
 * /config.ts — add or edit phrases there, not here.
 *
 * The track is duplicated once so the infinite CSS animation (translateX
 * 0 -> -50%) loops seamlessly. The duplicate is aria-hidden so screen
 * readers only announce the phrases once.
 *
 * Respects prefers-reduced-motion by freezing the track in place
 * (motion-reduce:animate-none) instead of forcing continuous motion, and
 * pauses on hover/focus for anyone who wants to read a phrase mid-scroll.
 */
export default function Marquee() {
  return (
    <div className="group w-full overflow-hidden border-y border-border bg-bg-raised py-3">
      <div className="flex w-max animate-marquee motion-reduce:animate-none group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]">
        <MarqueeTrack />
        <MarqueeTrack hidden />
      </div>
    </div>
  );
}
