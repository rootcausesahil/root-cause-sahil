import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { getAllSlugs, getPostBySlug } from '@/lib/posts';

// Static export needs to know every path up front — this enumerates every
// .mdx file in /content/posts at build time.
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

// Static export has no server to fall back on for params outside the list
// above, so don't try to render anything not returned by generateStaticParams.
export const dynamicParams = false;

type PageProps = {
  params: Promise<{ slug: string }>;
};

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
      <time dateTime={post.date} className="text-xs font-semibold uppercase tracking-wide text-muted">
        {formatDate(post.date)}
      </time>
      <h1 className="mt-3 font-display text-4xl font-black leading-tight tracking-tight text-fg sm:text-5xl">
        {post.title}
      </h1>
      <p className="mt-4 text-lg text-muted">{post.description}</p>

      <div className="prose prose-neutral mt-12 max-w-none dark:prose-invert prose-headings:font-display prose-headings:font-bold prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-blockquote:border-accent prose-blockquote:font-display prose-blockquote:italic prose-code:before:content-none prose-code:after:content-none prose-hr:border-border">
        <MDXRemote
          source={post.content}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>
    </article>
  );
}
