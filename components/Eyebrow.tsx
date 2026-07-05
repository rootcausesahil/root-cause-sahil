/**
 * Small uppercase label rendered above section headings
 * (e.g. "LATEST POSTS" above the "Latest Posts" heading).
 */
export default function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
      <span className="h-px w-6 bg-accent" aria-hidden="true" />
      {children}
    </span>
  );
}
