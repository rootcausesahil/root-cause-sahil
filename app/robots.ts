import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config';

// See sitemap.ts for why this is required under `output: 'export'`.
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
