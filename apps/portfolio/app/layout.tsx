import type { Metadata } from 'next';
import { DM_Sans, DM_Serif_Display } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-dm-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Kasope Abolade — Full-Stack Engineer',
    template: '%s | Kasope Abolade',
  },
  description:
    'Full-Stack Engineer & Founder of Karsh Core Solutions. I architect SaaS platforms and ship production-grade web applications.',
  keywords: ['Next.js', 'TypeScript', 'Full-Stack', 'SaaS', 'Nigeria', 'Software Engineer'],
  authors: [{ name: 'Kasope Abolade', url: 'https://kasope.dev' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kasope.dev',
    siteName: 'Kasope Abolade',
    title: 'Kasope Abolade — Full-Stack Engineer',
    description:
      'Full-Stack Engineer & Founder of Karsh Core Solutions. I architect SaaS platforms and ship production-grade web applications.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kasope Abolade — Full-Stack Engineer',
    description:
      'Full-Stack Engineer & Founder of Karsh Core Solutions. I architect SaaS platforms and ship production-grade web applications.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dmSans.variable} ${dmSerifDisplay.variable}`}
    >
      <body>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
