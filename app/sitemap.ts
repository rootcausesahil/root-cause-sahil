import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config';
import { getAllPosts } from '@/lib/posts';

// `output: 'export'` requires metadata routes to explicitly opt into static
// generation — without this, `next build` fails collecting page data for
// /sitemap.xml since it can't tell the route is safe to prerender once.
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: posts[0]?.date ? new Date(posts[0].date) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
