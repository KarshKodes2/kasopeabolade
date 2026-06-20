import type { Metadata } from 'next'
import { DM_Sans, DM_Serif_Display } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { LoadingScreen } from '@/components/sections/LoadingScreen'
import { ThemeProvider } from '@/components/providers/ThemeProvider'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-dm-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default:  'Kasope Abolade — Senior Frontend Engineer',
    template: '%s | Kasope Abolade',
  },
  description: 'Senior Frontend & AI-Enabled Software Engineer. Building scalable SaaS platforms, fintech systems, and AI-powered digital experiences. Lagos, Nigeria.',
  keywords:    ['React', 'Next.js', 'TypeScript', 'Flutter', 'React Native', 'Fintech', 'SaaS', 'Frontend Engineer', 'Lagos Nigeria', 'AI Engineering'],
  authors:     [{ name: 'Kasope Abolade', url: 'https://linkedin.com/in/kasopeabolade' }],
  openGraph: {
    type:        'website',
    locale:      'en_US',
    title:       'Kasope Abolade — Senior Frontend Engineer',
    description: 'Building scalable SaaS platforms, fintech systems, and AI-powered digital experiences.',
    siteName:    'Kasope Abolade Portfolio',
    images:      [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Kasope Abolade' }],
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Kasope Abolade — Senior Frontend Engineer',
    description: 'Building scalable SaaS platforms, fintech systems, and AI-powered digital experiences.',
  },
  robots: {
    index:  true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmSerifDisplay.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <LoadingScreen />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-dm-sans), sans-serif',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
