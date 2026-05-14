import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'CrowdVibe', template: '%s | CrowdVibe' },
  description: 'Power the Crowd. Own the Vibe. The entertainment SaaS platform for DJs, MCs, and entertainers.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_PLATFORM_URL ?? 'https://crowdvibe.io'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
