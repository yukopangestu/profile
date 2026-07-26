import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import PortfolioPageClient from '@/components/PortfolioPageClient';
import './portfolio.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Portfolio — Yuko Pangestu',
  description:
    'Selected works: systems, platforms and sites shipped across eight years — from agency delivery to payments platforms handling millions of transactions.',
};

export default function PortfolioPage() {
  return (
    <div className={inter.variable}>
      <PortfolioPageClient />
    </div>
  );
}
