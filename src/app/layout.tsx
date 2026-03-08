import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Yuko Pangestu – Technical Lead & Full Stack Developer',
  description:
    'Yuko Pangestu – Technical Lead specializing in backend architecture, microservices, and team leadership. Based in Jakarta, Indonesia.',
  keywords: ['Technical Lead', 'Full Stack Developer', 'Jakarta', 'Go', 'PHP', 'Vue.js'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-gray-800 bg-white`}>{children}</body>
    </html>
  );
}
