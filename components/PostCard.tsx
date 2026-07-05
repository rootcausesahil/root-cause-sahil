import Link from 'next/link';
import type { PostFrontmatter } from '@/lib/posts';

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

/**
 * Card used in the blog grid (home "Latest Posts" and /blog index).
 * Accepts anything with post frontmatter — pass a full Post or just its
 * frontmatter fields. `index` (position in the grid) drives a staggered
 * fade-up entrance — see `.fade-up-in` in globals.css — so cards cascade
 * in left-to-right/row-by-row instead of popping in all at once.
 */
export default function PostCard({
  post,
  index = 0,
}: {
  post: PostFrontmatter;
  index?: number;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      style={{ '--stagger-index': index } as React.CSSProperties}
      className="fade-up-in group flex flex-col justify-between gap-6 border border-border bg-bg-raised p-6 transition-colors hover:border-accent sm:p-8"
    >
      <div>
        <time
          dateTime={post.date}
          className="text-xs font-semibold uppercase tracking-wide text-muted"
        >
          {formatDate(post.date)}
        </time>
        <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-fg sm:text-3xl">
          {post.title}
        </h3>
        <p className="mt-3 text-sm text-muted sm:text-base">{post.description}</p>
      </div>

      <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-accent">
        Read the post
        <span
          aria-hidden="true"
          className="inline-block transition-transform group-hover:translate-x-1"
        >
          &rarr;
        </span>
      </span>
    </Link>
  );
}
