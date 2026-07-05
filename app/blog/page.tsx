import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/posts';
import Eyebrow from '@/components/Eyebrow';
import PostCard from '@/components/PostCard';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Every post, newest first.',
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <Eyebrow>Blog</Eyebrow>
      <h1 className="mt-4 font-display text-4xl font-black tracking-tight text-fg sm:text-6xl">
        All <em className="italic text-accent">incidents</em>.
      </h1>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
