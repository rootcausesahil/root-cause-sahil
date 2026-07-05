import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/config';
import { themeInitScript } from '@/lib/theme-script';
import { suppressReactDevToolsNoticeScript } from '@/lib/dev-console-cleanup';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ConsoleEasterEgg from '@/components/ConsoleEasterEgg';

// Fraunces: a display serif with a dramatic italic, built for the
// large-headline / occasional-italic-word editorial look.
const displayFont = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600', '700', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
});

// Inter: a clean, highly readable body face to balance the display font.
const bodyFont = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s — ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // No `data-theme` here on the server — the inline script below sets it
    // on the client, synchronously, before first paint. suppressHydrationWarning
    // stops React from complaining that the attribute it didn't render is
    // now present (that's expected and intentional, not a bug).
    <html lang="en" suppressHydrationWarning className={`${displayFont.variable} ${bodyFont.variable}`}>
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {process.env.NODE_ENV !== 'production' && (
          // eslint-disable-next-line @next/next/no-sync-scripts
          <script dangerouslySetInnerHTML={{ __html: suppressReactDevToolsNoticeScript }} />
        )}
      </head>
      <body className="flex min-h-screen flex-col bg-bg font-body text-fg antialiased">
        <ConsoleEasterEgg />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
