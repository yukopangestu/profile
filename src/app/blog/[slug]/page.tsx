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
      <main className="max-w-3xl mx-auto px-6 md:px-8 pt-32 pb-24">
        <Link href="/blog" className="text-sm text-primary font-medium hover:underline">
          &larr; Back to blog
        </Link>

        <article className="mt-6">
          <time className="text-sm text-on-surface-variant">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <h1 className="text-4xl font-bold text-on-surface mt-1 mb-8">{post.title}</h1>

          <div className="prose prose-lg max-w-none text-on-surface prose-headings:text-on-surface prose-a:text-primary prose-strong:text-on-surface">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
          </div>
        </article>
      </main>
      <ContactSection />
    </>
  );
}
