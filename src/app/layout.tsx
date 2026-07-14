import type { Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import BackToTop from '@/components/BackToTop';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['400', '500', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'Yuko Pangestu — Senior Full Stack Developer',
  description:
    'Yuko Pangestu — Senior Full Stack Developer specializing in Java, AngularJS, backend architecture, and engineering leadership. Based in Jakarta, Indonesia.',
  keywords: [
    'Senior Full Stack Developer',
    'Technical Lead',
    'Jakarta',
    'Java',
    'AngularJS',
    'Go',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-terminal-bg">
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans bg-terminal-bg text-terminal-text antialiased`}
      >
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
