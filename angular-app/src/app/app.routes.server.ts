import fs from 'node:fs';
import path from 'node:path';
import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'blog', renderMode: RenderMode.Prerender },
  {
    path: 'blog/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const dir = path.join(process.cwd(), 'content/blog');
      const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
      return files.map(file => ({ slug: file.replace(/\.md$/, '') }));
    },
  },
  { path: '**', renderMode: RenderMode.Server },
];
