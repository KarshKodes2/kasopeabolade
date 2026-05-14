import { prisma } from 'db';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const tenants = await prisma.tenant.findMany({
    where: { status: 'ACTIVE' },
    select: { slug: true, updatedAt: true },
  });

  const base = process.env.NEXT_PUBLIC_APP_URL ?? 'https://crowdvibe.io';

  const platformPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/pricing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/auth/signin`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/auth/signup`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
  ];

  const tenantPages: MetadataRoute.Sitemap = tenants.flatMap((t) => [
    {
      url: `${base}/site/${t.slug}`,
      lastModified: t.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${base}/site/${t.slug}/book`,
      lastModified: t.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${base}/site/${t.slug}/gallery`,
      lastModified: t.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: `${base}/site/${t.slug}/press`,
      lastModified: t.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ]);

  return [...platformPages, ...tenantPages];
}
