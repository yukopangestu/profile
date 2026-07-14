import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Header from '@/components/Header';
import ContactSection from '@/components/ContactSection';
import { getAllPosts, getPostBySlug } from '@/lib/blog';

interface BlogPostPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllPosts().map(post => ({ slug: post.slug }));
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  try {
    const post = getPostBySlug(params.slug);
    return { title: `${post.title} — Yuko Pangestu`, description: post.excerpt };
  } catch {
    return { title: 'Post not found' };
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  let post;
  try {
    post = getPostBySlug(params.slug);
  } catch {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="max-w-content mx-auto px-5 sm:px-6 md:px-14 pt-14 sm:pt-16 md:pt-[88px] pb-14 sm:pb-16 md:pb-[88px]">
        <div className="max-w-[720px]">
          <Link
            href="/blog"
            className="font-mono text-xs text-terminal-blue hover:text-terminal-blue-bright transition-colors"
          >
            ← back to blog
          </Link>

          <article className="mt-6">
            <time className="font-mono text-xs text-terminal-faint">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <h1 className="m-0 mt-2 mb-8 sm:mb-10 text-[26px] sm:text-[32px] md:text-[40px] font-bold tracking-[-0.02em]">
              {post.title}
            </h1>

            <div className="prose prose-invert max-w-none prose-headings:tracking-[-0.01em] prose-headings:font-bold prose-a:text-terminal-blue prose-a:no-underline hover:prose-a:underline prose-strong:text-terminal-text prose-code:text-terminal-blue prose-code:before:content-none prose-code:after:content-none prose-blockquote:border-l-term-strong prose-blockquote:text-terminal-muted prose-p:text-terminal-muted prose-li:text-terminal-muted prose-hr:border-term-dim">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
            </div>
          </article>
        </div>
      </main>
      <ContactSection />
    </>
  );
}
