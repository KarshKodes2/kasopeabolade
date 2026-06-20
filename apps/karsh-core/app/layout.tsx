import type { Metadata } from 'next';
import './globals.css';
import { KCNav } from '@/components/layout/KCNav';
import { KCFooter } from '@/components/layout/KCFooter';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: {
    default: 'Karsh Core Solutions — Engineering Excellence',
    template: '%s | Karsh Core Solutions',
  },
  description: 'Karsh Core Solutions builds world-class SaaS platforms, fintech systems, and AI-powered digital experiences for startups and enterprises across Africa and beyond.',
  keywords: ['SaaS development', 'fintech engineering', 'AI integration', 'web development', 'Lagos Nigeria', 'mobile apps', 'software consulting'],
  authors: [{ name: 'Kasope Abolade' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Karsh Core Solutions — Engineering Excellence',
    description: 'Building world-class SaaS, fintech, and AI-powered products.',
    siteName: 'Karsh Core Solutions',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <KCNav />
        <main>{children}</main>
        <KCFooter />
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
