'use client';

import { useEffect } from 'react';

/**
 * Renders nothing — just drops a styled console message for anyone
 * curious enough to open devtools. Purely cosmetic; safe no-op on the
 * server and during static export.
 */
export default function ConsoleEasterEgg() {
  useEffect(() => {
    console.log(
      '%c🔥 ROOT CAUSE ANALYSIS: INITIATED',
      'font-size: 18px; font-weight: 900; color: #3ecf8e;',
    );
    console.log(
      '%cIncident: you opened devtools.\nSeverity: SEV-4 (curiosity).\nRoot cause: probably just wanted to see how this was built.',
      'font-size: 13px; color: #9a9aa5; line-height: 1.6;',
    );
    console.log(
      '%cSource: https://github.com/rootcausesahil',
      'font-size: 12px; color: #3ecf8e;',
    );
  }, []);

  return null;
}
