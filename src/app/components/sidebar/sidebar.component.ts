import { isPlatformBrowser, NgTemplateOutlet } from '@angular/common';
import { Component, effect, HostListener, inject, PLATFORM_ID, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { TerminalChromeComponent } from '../terminal-chrome/terminal-chrome.component';

interface NavItem {
  label: string;
  href: string;
  id: string;
  modal?: boolean;
}

const navItems: NavItem[] = [
  { label: './home', href: '#home', id: 'home' },
  { label: './portfolio', href: '/portfolio', id: 'portfolio' },
  { label: './blog', href: '/blog', id: 'blog' },
  { label: './contact', href: '#contact', id: 'contact', modal: true },
];

const contactInfo = {
  name: 'Yuko Pangestu',
  role: 'Senior Full Stack Developer',
  location: 'Jakarta, Indonesia',
  email: 'yuko.pangestu@gmail.com',
};

const contactSocials = [
  { href: 'https://github.com/yukopangestu', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/yukopangestu/', label: 'LinkedIn' },
  { href: 'mailto:yuko.pangestu@gmail.com', label: 'email me' },
];

/** router.url and NavigationEnd.urlAfterRedirects can include a #fragment or ?query — strip both so path comparisons (e.g. isHome) aren't thrown off by a URL like "/#experience". */
function stripFragmentAndQuery(url: string): string {
  return url.split('#')[0].split('?')[0] || '/';
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, NgTemplateOutlet, TerminalChromeComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  private router = inject(Router);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  navItems = navItems;
  contactInfo = contactInfo;
  contactSocials = contactSocials;
  menuOpen = signal(false);
  activeId = signal('home');
  contactCardOpen = signal(false);

  pathname = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(e => stripFragmentAndQuery(e.urlAfterRedirects)),
      startWith(stripFragmentAndQuery(this.router.url))
    ),
    { initialValue: stripFragmentAndQuery(this.router.url) }
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

    effect(() => {
      if (!this.isBrowser) return;
      document.body.classList.toggle('overflow-hidden', this.contactCardOpen());
    });
  }

  @HostListener('window:resize')
  onResize(): void {
    if (this.isBrowser && window.innerWidth >= 1024) this.menuOpen.set(false);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.contactCardOpen()) this.closeContactCard();
  }

  openContactCard(): void {
    this.contactCardOpen.set(true);
    this.menuOpen.set(false);
  }

  closeContactCard(): void {
    this.contactCardOpen.set(false);
  }

  handleAnchorNav(href: string, id: string): void {
    this.activeId.set(id);
    this.menuOpen.set(false);
    if (!this.isBrowser) return;
    const target = document.querySelector(href);
    if (!target) return;
    const offset = window.innerWidth >= 1024 ? 24 : 72;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  toggleMenu(): void {
    this.menuOpen.set(!this.menuOpen());
  }

  isPageLink(item: NavItem): boolean {
    return item.href.startsWith('/');
  }

  isItemActive(item: NavItem): boolean {
    if (item.modal) {
      return this.contactCardOpen();
    }
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

  sidebarItemClass(item: NavItem): string {
    const active = this.isItemActive(item);
    const state = active
      ? 'text-terminal-text border-l-terminal-blue bg-terminal-surface'
      : 'text-terminal-dim border-l-transparent hover:text-terminal-text hover:bg-terminal-surface';
    return `grid grid-cols-[26px_1fr] items-center gap-2 px-6 py-3 border-l-2 border-b border-term-dim text-left w-full transition-colors ${state}`;
  }

  offHomeAnchorHref(item: NavItem): string {
    return `/${item.href}`;
  }
}
