import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config';
import { getAllPosts } from '@/lib/posts';

// `output: 'export'` requires metadata routes to explicitly opt into static
// generation — without this, `next build` fails collecting page data for
// /sitemap.xml since it can't tell the route is safe to prerender once.
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  // Homepage shows the latest posts, so its most recent genuine change is
  // whenever the newest post was published — using build time instead would
  // mark it "modified" on every deploy even when nothing changed, which is
  // exactly what search engines advise against for lastmod.
  const latestPostDate = posts[0]?.date ? new Date(posts[0].date) : new Date();

  return [
    {
      url: siteConfig.url,
      lastModified: latestPostDate,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: latestPostDate,
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
