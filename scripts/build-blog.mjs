// Prebuild step: reads content/blog/*.md and emits plain JSON under public/data/blog/
// so the app can fetch posts over HTTP instead of touching the filesystem at request time.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { marked } from 'marked';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.join(__dirname, '..', 'content/blog');
const OUT_DIR = path.join(__dirname, '..', 'public/data/blog');

fs.mkdirSync(OUT_DIR, { recursive: true });

const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'));

const posts = files.map(file => {
  const slug = file.replace(/\.md$/, '');
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8');
  const { data, content } = matter(raw);

  const post = {
    slug,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt,
    contentHtml: marked.parse(content),
  };

  fs.writeFileSync(path.join(OUT_DIR, `${slug}.json`), JSON.stringify(post));

  return { slug, title: post.title, date: post.date, excerpt: post.excerpt };
});

posts.sort((a, b) => (a.date < b.date ? 1 : -1));

fs.writeFileSync(path.join(OUT_DIR, 'posts.json'), JSON.stringify(posts));

console.log(`build-blog: wrote ${posts.length} post(s) to public/data/blog/`);
