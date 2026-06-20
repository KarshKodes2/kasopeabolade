import type { Metadata } from 'next'

export function buildMetadata(overrides?: Partial<Metadata>): Metadata {
  const base: Metadata = {
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
  return { ...base, ...overrides }
}
