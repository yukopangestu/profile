'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Skills', href: '#skills' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Experience', href: '#experience' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  const handleAnchorNav = (href: string) => {
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (!target) return;
    const top = (target as HTMLElement).getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const renderNavItem = (item: (typeof navItems)[number], className: string) => {
    if (item.href.startsWith('/')) {
      return (
        <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className={className}>
          {item.label}
        </Link>
      );
    }

    if (!isHome) {
      return (
        <Link key={item.href} href={`/${item.href}`} onClick={() => setMenuOpen(false)} className={className}>
          {item.label}
        </Link>
      );
    }

    return (
      <button key={item.href} onClick={() => handleAnchorNav(item.href)} className={className}>
        {item.label}
      </button>
    );
  };

  return (
    <header className="sticky top-0 w-full z-50 bg-[#fbf8ff]/70 backdrop-blur-xl">
      <div className="flex justify-between items-center px-8 md:px-12 py-4 max-w-screen-2xl mx-auto">
        {/* Logo */}
        {isHome ? (
          <button
            onClick={() => handleAnchorNav('#home')}
            className="text-xl font-black tracking-tighter text-on-surface hover:text-primary transition-colors"
          >
            YP<span className="text-primary">.</span>
          </button>
        ) : (
          <Link
            href="/"
            className="text-xl font-black tracking-tighter text-on-surface hover:text-primary transition-colors"
          >
            YP<span className="text-primary">.</span>
          </Link>
        )}

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center space-x-10">
          {navItems.map(item =>
            renderNavItem(
              item,
              'text-on-surface font-medium opacity-70 hover:opacity-100 hover:text-primary transition-all duration-300 text-sm'
            )
          )}
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
          {navItems.map(item =>
            renderNavItem(
              item,
              'text-left text-on-surface font-medium py-3 border-b border-outline-variant/20 last:border-0 hover:text-primary transition-colors text-sm'
            )
          )}
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
