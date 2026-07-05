/**
 * Source for the inline pre-paint script injected into <head> by
 * app/layout.tsx. Runs synchronously before first paint (it's a plain
 * blocking <script>, not a Next.js chunk) so the correct theme is applied
 * before any pixels render — no flash of the wrong theme.
 *
 * Kept as a plain string (not imported JS) because it must be inlined
 * verbatim into the HTML; a static export has no server to run this on
 * every request, so it has to execute client-side, first thing.
 *
 * Defaults to 'dark' whenever nothing valid is in localStorage yet,
 * per this site's "default to dark" requirement — it deliberately does
 * NOT fall back to the OS `prefers-color-scheme`.
 */
export const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored === 'light' || stored === 'dark' ? stored : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`;
