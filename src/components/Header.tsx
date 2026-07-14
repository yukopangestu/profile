'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: './home', href: '#home', id: 'home' },
  { label: './skills', href: '#skills', id: 'skills' },
  { label: './portfolio', href: '#portfolio', id: 'portfolio' },
  { label: './experience', href: '#experience', id: 'experience' },
  { label: './blog', href: '/blog', id: 'blog' },
  { label: './contact', href: '#contact', id: 'contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('home');
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    if (!isHome) return;

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
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleAnchorNav = (href: string, id: string) => {
    setActiveId(id);
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (!target) return;
    const top = (target as HTMLElement).getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const navClass = (id: string, base = '') =>
    `${base} transition-colors ${
      isHome && activeId === id
        ? 'text-terminal-text'
        : 'text-terminal-dim hover:text-terminal-text'
    }`;

  const renderNavItem = (item: (typeof navItems)[number], base: string) => {
    const isPageLink = item.href.startsWith('/');

    if (isPageLink || !isHome) {
      const href = isPageLink ? item.href : `/${item.href}`;
      return (
        <Link
          key={item.href}
          href={href}
          onClick={() => setMenuOpen(false)}
          className={navClass(item.id, base)}
        >
          {item.label}
        </Link>
      );
    }

    return (
      <button
        key={item.href}
        onClick={() => handleAnchorNav(item.href, item.id)}
        className={navClass(item.id, base)}
        aria-current={activeId === item.id ? 'true' : undefined}
      >
        {item.label}
      </button>
    );
  };

  return (
    <header className="sticky top-0 z-50 border-b border-term-dim bg-[rgba(6,11,22,0.85)] backdrop-blur-md font-mono text-[13px]">
      <div className="flex justify-between items-center gap-4 px-5 sm:px-6 md:px-14 py-[18px] max-w-content mx-auto">
        {isHome ? (
          <button
            onClick={() => handleAnchorNav('#home', 'home')}
            className="text-terminal-blue font-bold hover:text-terminal-blue-bright transition-colors shrink-0 text-[12px] sm:text-[13px]"
          >
            ~/yuko-pangestu
          </button>
        ) : (
          <Link
            href="/"
            className="text-terminal-blue font-bold hover:text-terminal-blue-bright transition-colors shrink-0 text-[12px] sm:text-[13px]"
          >
            ~/yuko-pangestu
          </Link>
        )}

        {/* Desktop nav — lg+ so tablet doesn't crush 6 links + CTA */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-[30px]" aria-label="Primary">
          {navItems.map(item => renderNavItem(item, ''))}
        </nav>

        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <a
            href="mailto:yuko.pangestu@gmail.com"
            className="hidden lg:inline-block border border-terminal-primary text-terminal-blue px-[18px] py-2 rounded hover:bg-terminal-primary hover:text-white transition-colors"
          >
            hire --me
          </a>
          <button
            className="lg:hidden text-terminal-dim p-1 hover:text-terminal-text"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className="font-mono text-sm">{menuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden flex flex-col px-5 sm:px-6 pb-6 gap-1 border-t border-term-dim"
        >
          {navItems.map(item => renderNavItem(item, 'text-left py-3 border-b border-term-dim last:border-0'))}
          <a
            href="mailto:yuko.pangestu@gmail.com"
            className="border border-terminal-primary text-terminal-blue px-[18px] py-3 rounded text-center mt-3 hover:bg-terminal-primary hover:text-white transition-colors"
          >
            hire --me
          </a>
        </div>
      )}
    </header>
  );
}
