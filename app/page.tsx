import Link from 'next/link';
import { aboutParagraphs, consultingNote } from '@/config';
import { getAllPosts } from '@/lib/posts';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Eyebrow from '@/components/Eyebrow';
import PostCard from '@/components/PostCard';

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <>
      <Marquee />
      <Hero />

      {/* About */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <Eyebrow>About</Eyebrow>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold leading-tight text-fg sm:text-4xl">
          Backend by day, <em className="italic text-accent">blast radius</em> by night.
        </h2>
        <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-muted sm:text-lg">
          {aboutParagraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
        {consultingNote && (
          <p className="mt-6 max-w-2xl text-sm font-semibold uppercase tracking-wide text-accent">
            {consultingNote}
          </p>
        )}
      </section>

      {/* Latest posts */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>Latest Posts</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-bold text-fg sm:text-4xl">
              Fresh <em className="italic text-accent">incidents</em>.
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-sm font-semibold uppercase tracking-wide text-accent hover:underline"
          >
            View all posts &rarr;
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post, i) => (
            <PostCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
