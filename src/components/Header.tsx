'use client';

import { useState } from 'react';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Skills', href: '#skills' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
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
    <header className="sticky top-0 w-full z-50 bg-[#fbf8ff]/70 backdrop-blur-xl">
      <div className="flex justify-between items-center px-8 md:px-12 py-4 max-w-screen-2xl mx-auto">
        {/* Logo */}
        <button
          onClick={() => handleNav('#home')}
          className="text-xl font-black tracking-tighter text-on-surface hover:text-primary transition-colors"
        >
          YP<span className="text-primary">.</span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center space-x-10">
          {navItems.map(item => (
            <button
              key={item.href}
              onClick={() => handleNav(item.href)}
              className="text-on-surface font-medium opacity-70 hover:opacity-100 hover:text-primary transition-all duration-300 text-sm"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="mailto:yuko.pangestu@gmail.com"
            className="hidden md:block hero-gradient text-on-primary px-6 py-2 rounded-xl font-bold text-sm active:scale-95 transition-transform duration-200"
          >
            Hire Me
          </a>
          <button
            className="md:hidden text-on-surface p-1"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined">{menuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col px-8 pb-6 gap-1">
          {navItems.map(item => (
            <button
              key={item.href}
              onClick={() => handleNav(item.href)}
              className="text-left text-on-surface font-medium py-3 border-b border-outline-variant/20 last:border-0 hover:text-primary transition-colors text-sm"
            >
              {item.label}
            </button>
          ))}
          <a
            href="mailto:yuko.pangestu@gmail.com"
            className="hero-gradient text-on-primary px-6 py-3 rounded-xl font-bold text-center text-sm mt-3"
          >
            Hire Me
          </a>
        </div>
      )}
    </header>
  );
}
