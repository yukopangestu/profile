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
      <main className="max-w-content mx-auto px-5 sm:px-6 md:px-14 pt-14 sm:pt-16 md:pt-[88px] pb-14 sm:pb-16 md:pb-[88px]">
        <div className="section-label">// blog</div>
        <h1 className="m-0 mb-3 text-[28px] sm:text-[32px] md:text-[44px] font-bold tracking-[-0.02em]">
          Writing<span className="text-terminal-primary">.</span>
        </h1>
        <p className="m-0 mb-10 sm:mb-12 max-w-[480px] text-[15px] sm:text-[15.5px] leading-[1.7] text-terminal-muted">
          Notes on engineering, leadership, and building things.
        </p>

        {posts.length === 0 ? (
          <p className="font-mono text-sm text-terminal-dim">// no posts yet — check back soon</p>
        ) : (
          <ul className="flex flex-col gap-0">
            {posts.map(post => (
              <li key={post.slug} className="border-t border-term-dim last:border-b">
                <Link href={`/blog/${post.slug}`} className="group block py-6 sm:py-7">
                  <time className="font-mono text-xs text-terminal-faint">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <h2 className="mt-1.5 mb-2 text-xl sm:text-2xl font-bold tracking-[-0.01em] text-terminal-text group-hover:text-terminal-blue transition-colors">
                    {post.title}
                  </h2>
                  <p className="m-0 text-[14.5px] sm:text-[15px] leading-[1.7] text-terminal-muted">
                    {post.excerpt}
                  </p>
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
