import { DomSanitizer } from '@angular/platform-browser';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { HeaderComponent } from '../../components/header/header.component';
import { ContactSectionComponent } from '../../components/contact-section/contact-section.component';
import { BlogService, type BlogPost } from '../../services/blog.service';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [RouterLink, HeaderComponent, ContactSectionComponent],
  templateUrl: './blog-post.component.html',
})
export class BlogPostComponent {
  private route = inject(ActivatedRoute);
  private blogService = inject(BlogService);
  private sanitizer = inject(DomSanitizer);

  post = toSignal(
    this.route.paramMap.pipe(
      switchMap(params => {
        const slug = params.get('slug')!;
        return this.blogService.getPostBySlug(slug).pipe(catchError(() => of(null as BlogPost | null)));
      })
    )
  );

  contentHtml = computed(() => {
    const post = this.post();
    return post ? this.sanitizer.bypassSecurityTrustHtml(post.contentHtml) : null;
  });

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
