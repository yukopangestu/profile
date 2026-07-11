'use client';

import { useEffect, useState } from 'react';

const navItems = [
  { label: './home', href: '#home', id: 'home' },
  { label: './skills', href: '#skills', id: 'skills' },
  { label: './portfolio', href: '#portfolio', id: 'portfolio' },
  { label: './experience', href: '#experience', id: 'experience' },
  { label: './contact', href: '#contact', id: 'contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('home');

  useEffect(() => {
    const sectionIds = navItems.map(item => item.id);
    const elements = sectionIds
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      entries => {
        // Prefer the most visible intersecting section near the top of the viewport
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        // Account for sticky header; activate when section enters the upper band
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleNav = (href: string, id: string) => {
    setActiveId(id);
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (!target) return;
    const top = (target as HTMLElement).getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const navClass = (id: string, base = '') =>
    `${base} transition-colors ${
      activeId === id
        ? 'text-terminal-text'
        : 'text-terminal-dim hover:text-terminal-text'
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-term-dim bg-[rgba(6,11,22,0.85)] backdrop-blur-md font-mono text-[13px]">
      <div className="flex justify-between items-center px-6 md:px-14 py-[18px] max-w-content mx-auto">
        <button
          onClick={() => handleNav('#home', 'home')}
          className="text-terminal-blue font-bold hover:text-terminal-blue-bright transition-colors"
        >
          ~/yuko-pangestu
        </button>

        <nav className="hidden md:flex items-center gap-[30px]" aria-label="Primary">
          {navItems.map(item => (
            <button
              key={item.href}
              onClick={() => handleNav(item.href, item.id)}
              className={navClass(item.id)}
              aria-current={activeId === item.id ? 'true' : undefined}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="mailto:yuko.pangestu@gmail.com"
            className="hidden md:inline-block border border-terminal-primary text-terminal-blue px-[18px] py-2 rounded hover:bg-terminal-primary hover:text-white transition-colors"
          >
            hire --me
          </a>
          <button
            className="md:hidden text-terminal-dim p-1 hover:text-terminal-text"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span className="font-mono text-sm">{menuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div id="mobile-menu" className="md:hidden flex flex-col px-6 pb-6 gap-1 border-t border-term-dim">
          {navItems.map(item => (
            <button
              key={item.href}
              onClick={() => handleNav(item.href, item.id)}
              className={navClass(
                item.id,
                'text-left py-3 border-b border-term-dim last:border-0'
              )}
              aria-current={activeId === item.id ? 'true' : undefined}
            >
              {item.label}
            </button>
          ))}
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
