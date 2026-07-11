'use client';

import { useState } from 'react';

const navItems = [
  { label: './home', href: '#home' },
  { label: './skills', href: '#skills' },
  { label: './portfolio', href: '#portfolio' },
  { label: './experience', href: '#experience' },
  { label: './contact', href: '#contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (!target) return;
    const top = (target as HTMLElement).getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-term-dim bg-[rgba(6,11,22,0.85)] backdrop-blur-md font-mono text-[13px]">
      <div className="flex justify-between items-center px-6 md:px-14 py-[18px] max-w-content mx-auto">
        <button
          onClick={() => handleNav('#home')}
          className="text-terminal-blue font-bold hover:text-terminal-blue-bright transition-colors"
        >
          ~/yuko-pangestu
        </button>

        <nav className="hidden md:flex items-center gap-[30px]">
          {navItems.map((item, i) => (
            <button
              key={item.href}
              onClick={() => handleNav(item.href)}
              className={`transition-colors ${
                i === 0
                  ? 'text-terminal-text'
                  : 'text-terminal-dim hover:text-terminal-text'
              }`}
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
              onClick={() => handleNav(item.href)}
              className="text-left text-terminal-dim hover:text-terminal-text py-3 border-b border-term-dim last:border-0 transition-colors"
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
