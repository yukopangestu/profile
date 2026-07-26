import { isPlatformBrowser } from '@angular/common';
import { Component, computed, effect, HostListener, inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  PORTFOLIO_CATEGORIES,
  PORTFOLIO_COPY,
  PORTFOLIO_EMAIL,
  PORTFOLIO_METRICS,
  PORTFOLIO_PROJECTS,
  type PortfolioCategory,
  type PortfolioLang,
} from '../../data/portfolio.data';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';

type FilterKey = 'all' | PortfolioCategory;

const NAV = [
  { label: './home', href: '/#home', active: false },
  { label: './skills', href: '/#skills', active: false },
  { label: './portfolio', href: '/portfolio', active: true },
  { label: './experience', href: '/#experience', active: false },
  { label: './blog', href: '/blog', active: false },
];

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [RouterLink, ProjectCardComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css',
})
export class PortfolioComponent {
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  nav = NAV;
  categories = PORTFOLIO_CATEGORIES;
  projects = PORTFOLIO_PROJECTS;
  metrics = PORTFOLIO_METRICS;
  email = PORTFOLIO_EMAIL;
  mailto = `mailto:${PORTFOLIO_EMAIL}`;
  dialogTitleId = 'portfolio-dialog-title';

  lang = signal<PortfolioLang>('en');
  filter = signal<FilterKey>('all');
  openSlug = signal<string | null>(null);
  menuOpen = signal(false);

  copy = computed(() => PORTFOLIO_COPY[this.lang()]);
  metricsForLang = computed(() => this.metrics[this.lang()]);

  list = computed(() => {
    const f = this.filter();
    return this.projects.filter(p => f === 'all' || p.cat === f);
  });

  openProject = computed(() => this.projects.find(p => p.slug === this.openSlug()) ?? null);

  filterOptions = computed(() => [
    { key: 'all' as FilterKey, label: this.copy().all },
    ...this.categories.map(c => ({ key: c as FilterKey, label: c })),
  ]);

  constructor() {
    effect(onCleanup => {
      if (!this.isBrowser) return;

      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') this.openSlug.set(null);
      };
      window.addEventListener('keydown', onKey);
      onCleanup(() => window.removeEventListener('keydown', onKey));
    });

    effect(onCleanup => {
      if (!this.isBrowser || !this.openProject()) return;

      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      onCleanup(() => {
        document.body.style.overflow = prev;
      });
    });
  }

  @HostListener('window:resize')
  onResize(): void {
    if (this.isBrowser && window.innerWidth > 720) this.menuOpen.set(false);
  }

  setLang(lang: PortfolioLang): void {
    this.lang.set(lang);
  }

  setFilter(key: FilterKey): void {
    this.filter.set(key);
    this.openSlug.set(null);
  }

  toggleMenu(): void {
    this.menuOpen.set(!this.menuOpen());
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  openDialog(slug: string): void {
    this.openSlug.set(slug);
  }

  closeDialog(): void {
    this.openSlug.set(null);
  }

  askAboutHref(name: string): string {
    return `${this.mailto}?subject=${encodeURIComponent(`Re: ${name}`)}`;
  }
}
