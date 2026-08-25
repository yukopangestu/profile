import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BlogIndexComponent } from './pages/blog-index/blog-index.component';
import { BlogPostComponent } from './pages/blog-post/blog-post.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { HobbyComponent } from './pages/hobby/hobby.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Yuko Pangestu — Senior Full Stack Developer' },
  { path: 'portfolio', component: PortfolioComponent, title: 'Portfolio — Yuko Pangestu' },
  { path: 'blog', component: BlogIndexComponent, title: 'Blog — Yuko Pangestu' },
  { path: 'blog/:slug', component: BlogPostComponent },
  { path: 'hobby', component: HobbyComponent, title: 'Game Library — Yuko Pangestu' },
];
