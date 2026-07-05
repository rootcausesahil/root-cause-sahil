import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

/**
 * BLOG CONTENT PIPELINE
 * ─────────────────────
 * Posts are plain .mdx files in /content/posts. To publish a new one:
 *   1. Drop a .mdx file into /content/posts
 *   2. Give it frontmatter: title, date, description, slug
 *   3. Write the post body below the frontmatter in Markdown/MDX
 * No CMS, no database — everything below just reads the filesystem
 * at build time.
 */

const POSTS_DIRECTORY = path.join(process.cwd(), 'content/posts');

const REQUIRED_FRONTMATTER_FIELDS = ['title', 'date', 'description', 'slug'] as const;

export interface PostFrontmatter {
  title: string;
  /** ISO date string, e.g. '2024-03-14'. Used for sorting. */
  date: string;
  description: string;
  slug: string;
}

export interface Post extends PostFrontmatter {
  /** Raw MDX body (frontmatter stripped), ready for <MDXRemote source={...} />. */
  content: string;
}

function readPostFile(fileName: string): Post {
  const fullPath = path.join(POSTS_DIRECTORY, fileName);
  const raw = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(raw);

  for (const field of REQUIRED_FRONTMATTER_FIELDS) {
    if (!data[field]) {
      throw new Error(
        `Post "${fileName}" is missing required frontmatter field "${field}". ` +
          'Every post needs: title, date, description, slug.',
      );
    }
  }

  return {
    title: data.title,
    date: data.date,
    description: data.description,
    slug: data.slug,
    content,
  };
}

/** All posts, sorted newest first by frontmatter `date`. */
export function getAllPosts(): Post[] {
  const fileNames = fs
    .readdirSync(POSTS_DIRECTORY)
    .filter((name) => name.endsWith('.mdx'));

  return fileNames
    .map(readPostFile)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** All post slugs — used by generateStaticParams for /blog/[slug]. */
export function getAllSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}

/** A single post by slug, or undefined if no post has that slug. */
export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}
