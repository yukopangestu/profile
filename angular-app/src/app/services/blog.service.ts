import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

export interface BlogPost extends BlogPostMeta {
  contentHtml: string;
}

@Injectable({ providedIn: 'root' })
export class BlogService {
  private http = inject(HttpClient);

  getAllPosts(): Observable<BlogPostMeta[]> {
    return this.http.get<BlogPostMeta[]>('/data/blog/posts.json');
  }

  getPostBySlug(slug: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(`/data/blog/${slug}.json`);
  }
}
