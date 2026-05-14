import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '../../../lib/prisma';

interface Props {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tenant = await prisma.tenant.findUnique({ where: { slug } });
  if (!tenant) return {};

  return {
    title: { default: tenant.name, template: `%s — ${tenant.name}` },
    description: tenant.bio ?? `Book ${tenant.name} for your next event.`,
    openGraph: {
      title: tenant.name,
      description: tenant.bio ?? `Book ${tenant.name} for your next event.`,
      images: tenant.logoUrl ? [tenant.logoUrl] : [],
    },
  };
}

export default async function TenantSiteLayout({ params, children }: Props) {
  const { slug } = await params;
  const tenant = await prisma.tenant.findUnique({ where: { slug } });
  if (!tenant) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'MusicGroup'],
    name: tenant.name,
    description: tenant.bio ?? `Book ${tenant.name} for your next event.`,
    url: tenant.customDomain ? `https://${tenant.customDomain}` : `https://crowdvibe.io/site/${slug}`,
    ...(tenant.logoUrl && { image: tenant.logoUrl }),
    ...(tenant.location && { address: { '@type': 'PostalAddress', addressLocality: tenant.location } }),
    ...(tenant.instagramUrl && { sameAs: [`https://instagram.com/${tenant.instagramUrl}`] }),
  };

  return (
    <div
      style={{
        '--cv-brand': tenant.brandColor ?? '#7C3AED',
        '--cv-accent': tenant.accentColor ?? '#F59E0B',
        '--cv-glow': `${tenant.brandColor ?? '#7C3AED'}66`,
      } as React.CSSProperties}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </div>
  );
}
