import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import ContactSection from '@/components/ContactSection';
import { getAllPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog — Yuko Pangestu',
  description: 'Writing on backend architecture, engineering leadership, and software craft.',
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-6 md:px-8 pt-32 pb-24">
        <h1 className="text-4xl font-bold text-on-surface mb-2">Blog</h1>
        <p className="text-lg text-gray-400 mb-12">Notes on engineering, leadership, and building things.</p>

        {posts.length === 0 ? (
          <p className="text-on-surface-variant">No posts yet — check back soon.</p>
        ) : (
          <ul className="flex flex-col gap-8">
            {posts.map(post => (
              <li key={post.slug} className="border-b border-outline-variant/30 pb-8 last:border-0">
                <Link href={`/blog/${post.slug}`} className="group block">
                  <time className="text-sm text-on-surface-variant">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <h2 className="text-2xl font-bold text-on-surface mt-1 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-base text-on-surface-variant mt-2">{post.excerpt}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
      <ContactSection />
    </>
  );
}
