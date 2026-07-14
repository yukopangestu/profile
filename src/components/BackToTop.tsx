'use client';

import { useEffect, useState } from 'react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const pastThreshold = window.scrollY > 400;
      const nearBottom =
        window.scrollY + window.innerHeight > document.documentElement.scrollHeight - 200;
      setVisible(pastThreshold && !nearBottom);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`fixed bottom-6 right-5 sm:bottom-8 sm:right-8 z-50 flex items-center justify-center w-11 h-11 rounded-full border border-term-mid bg-terminal-surface/90 backdrop-blur-md text-terminal-blue font-mono hover:border-terminal-blue hover:text-white hover:bg-terminal-primary transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'
      }`}
    >
      ↑
    </button>
  );
}
