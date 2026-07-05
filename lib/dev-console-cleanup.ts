/**
 * Suppresses React's "Download the React DevTools for a better development
 * experience" console notice by pre-defining a no-op devtools hook before
 * react-dom's bundle loads and checks for a real one.
 *
 * Only ever rendered in development (see the NODE_ENV check in
 * app/layout.tsx) — react-dom's production build doesn't print this
 * notice at all, so this script is dead weight outside `npm run dev` and
 * is stripped from the static-export build entirely.
 */
export const suppressReactDevToolsNoticeScript = `
(function () {
  if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined') {
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = {
      isDisabled: true,
      supportsFiber: true,
      inject: function () {},
      onCommitFiberRoot: function () {},
      onCommitFiberUnmount: function () {},
      onScheduleFiberRoot: function () {},
    };
  }
})();
`;
