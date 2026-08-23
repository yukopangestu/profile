import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BlogService, type BlogPostMeta } from '../../services/blog.service';

@Component({
  selector: 'app-blog-index',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './blog-index.component.html',
})
export class BlogIndexComponent {
  private blogService = inject(BlogService);

  posts = toSignal(this.blogService.getAllPosts().pipe(catchError(() => of([] as BlogPostMeta[]))), {
    initialValue: [] as BlogPostMeta[],
  });

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
