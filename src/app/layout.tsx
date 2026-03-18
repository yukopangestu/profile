import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Yuko Pangestu — Technical Lead & Full-Stack Architect',
  description:
    'Yuko Pangestu — Technical Lead at Paper.id specializing in backend architecture, microservices, and engineering leadership. Based in Jakarta, Indonesia.',
  keywords: ['Technical Lead', 'Full Stack Developer', 'Jakarta', 'Go', 'PHP', 'Vue.js'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} font-sans bg-background text-on-surface antialiased selection:bg-primary-fixed selection:text-on-primary-fixed`}>
        {children}
      </body>
    </html>
  );
}
