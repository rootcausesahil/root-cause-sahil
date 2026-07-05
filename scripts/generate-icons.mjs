// One-off script: renders the brand mark to real .png files using the same
// ImageResponse engine Next.js uses for code-generated icons, but writes
// them as static files (app/icon.png, app/apple-icon.png) instead of using
// the app/icon.tsx route convention. Static export serves code-generated
// icon routes without a file extension, which breaks MIME-type detection
// on static hosts like Cloudflare Pages — plain .png files sidestep that.
//
// Re-run with `node scripts/generate-icons.mjs` if you want to tweak the
// design (colors are duplicated here rather than imported from
// app/globals.css since this runs outside the Next.js/PostCSS pipeline).
import { writeFile } from 'node:fs/promises';
import { createElement } from 'react';
import { ImageResponse } from 'next/dist/server/og/image-response.js';

const ACCENT = '#ff5a3c';
const DARK = '#0b0b0d';

function mark(ringSize, ringBorder) {
  return createElement(
    'div',
    {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: ACCENT,
      },
    },
    createElement('div', {
      style: {
        display: 'flex',
        width: ringSize,
        height: ringSize,
        border: `${ringBorder}px solid ${DARK}`,
        borderRadius: '50%',
        borderRightColor: 'transparent',
        transform: 'rotate(45deg)',
      },
    }),
  );
}

async function renderPng(node, width, height) {
  const response = new ImageResponse(node, { width, height });
  const buffer = Buffer.from(await response.arrayBuffer());
  return buffer;
}

const icon = await renderPng(mark(26, 7), 64, 64);
await writeFile(new URL('../app/icon.png', import.meta.url), icon);

const appleIcon = await renderPng(mark(74, 20), 180, 180);
await writeFile(new URL('../app/apple-icon.png', import.meta.url), appleIcon);

console.log('Wrote app/icon.png and app/apple-icon.png');
