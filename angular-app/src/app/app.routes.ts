import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BlogIndexComponent } from './pages/blog-index/blog-index.component';
import { BlogPostComponent } from './pages/blog-post/blog-post.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'blog', component: BlogIndexComponent },
  { path: 'blog/:slug', component: BlogPostComponent },
];
