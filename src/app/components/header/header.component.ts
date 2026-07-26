import { isPlatformBrowser, NgTemplateOutlet } from '@angular/common';
import { Component, effect, HostListener, inject, PLATFORM_ID, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map, startWith } from 'rxjs';

interface NavItem {
  label: string;
  href: string;
  id: string;
}

const navItems: NavItem[] = [
  { label: './home', href: '#home', id: 'home' },
  { label: './skills', href: '#skills', id: 'skills' },
  { label: './portfolio', href: '/portfolio', id: 'portfolio' },
  { label: './experience', href: '#experience', id: 'experience' },
  { label: './blog', href: '/blog', id: 'blog' },
  { label: './contact', href: '#contact', id: 'contact' },
];

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgTemplateOutlet],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  private router = inject(Router);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  navItems = navItems;
  menuOpen = signal(false);
  activeId = signal('home');

  pathname = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(e => e.urlAfterRedirects),
      startWith(this.router.url)
    ),
    { initialValue: this.router.url }
  );

  isHome = () => this.pathname() === '/';

  constructor() {
    effect(onCleanup => {
      if (!this.isBrowser || !this.isHome()) return;

      const sectionIds = navItems.filter(item => item.href.startsWith('#')).map(item => item.id);
      const elements = sectionIds
        .map(id => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null);

      if (elements.length === 0) return;

      const observer = new IntersectionObserver(
        entries => {
          const visible = entries
            .filter(e => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

          if (visible.length > 0) {
            this.activeId.set(visible[0].target.id);
          }
        },
        {
          rootMargin: '-20% 0px -55% 0px',
          threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
        }
      );

      elements.forEach(el => observer.observe(el));
      onCleanup(() => observer.disconnect());
    });
  }

  @HostListener('window:resize')
  onResize(): void {
    if (this.isBrowser && window.innerWidth >= 1024) this.menuOpen.set(false);
  }

  handleAnchorNav(href: string, id: string): void {
    this.activeId.set(id);
    this.menuOpen.set(false);
    if (!this.isBrowser) return;
    const target = document.querySelector(href);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  toggleMenu(): void {
    this.menuOpen.set(!this.menuOpen());
  }

  isPageLink(item: NavItem): boolean {
    return item.href.startsWith('/');
  }

  isItemActive(item: NavItem): boolean {
    if (this.isPageLink(item)) {
      return this.pathname() === item.href || this.pathname().startsWith(`${item.href}/`);
    }
    return this.isHome() && this.activeId() === item.id;
  }

  navClass(item: NavItem, base = ''): string {
    const state = this.isItemActive(item)
      ? 'text-terminal-text'
      : 'text-terminal-dim hover:text-terminal-text';
    return `${base} transition-colors ${state}`;
  }

  offHomeAnchorHref(item: NavItem): string {
    return `/${item.href}`;
  }
}
