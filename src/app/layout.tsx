import type { Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
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
  title: 'Yuko Pangestu — Technical Lead & Full-Stack Architect',
  description:
    'Yuko Pangestu — Technical Lead specializing in backend architecture, microservices, and engineering leadership. Based in Jakarta, Indonesia.',
  keywords: ['Technical Lead', 'Full Stack Developer', 'Jakarta', 'Go', 'PHP', 'Vue.js'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-terminal-bg">
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans bg-terminal-bg text-terminal-text antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
