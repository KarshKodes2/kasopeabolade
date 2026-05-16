import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/shared/lib/prisma';
import { SiteNav } from '@/shared/components/layout/SiteNav';
import { SiteFooter } from '@/shared/components/layout/SiteFooter';
import { HeroSection, ServicesSection, FeaturedMixes, GallerySection, BookingCTASection, SocialLinksSection, NewsletterSection } from '@/features/tenants';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function TenantSitePage({ params }: Props) {
  const { slug } = await params;

  const [tenant, featuredMixes, galleryAssets] = await Promise.all([
    prisma.tenant.findUnique({ where: { slug } }),
    prisma.mediaAsset.findMany({
      where: { tenantId: undefined, tenant: { slug }, type: { in: ['MIX', 'PODCAST', 'LIVE_SET'] }, featured: true },
      orderBy: { publishedAt: 'desc' },
      take: 3,
    }),
    prisma.mediaAsset.findMany({
      where: { tenant: { slug }, type: { in: ['PHOTO', 'PROMO_VIDEO'] } },
      orderBy: { createdAt: 'desc' },
      take: 6,
    }),
  ]);

  if (!tenant) notFound();

  const socials = {
    instagram: tenant.instagramUrl,
    tiktok: tenant.tiktokUrl,
    youtube: tenant.youtubeUrl,
    audiomack: tenant.audiomackUrl,
    soundcloud: tenant.soundcloudUrl,
    spotify: tenant.spotifyUrl,
  };

  return (
    <>
      <SiteNav tenant={{ name: tenant.name, logoUrl: tenant.logoUrl, slug: tenant.slug }} />

      <HeroSection
        name={tenant.name}
        bio={tenant.bio}
        location={tenant.location}
        heroImageUrl={tenant.heroImageUrl}
        slug={tenant.slug}
      />

      <ServicesSection slug={tenant.slug} />

      {featuredMixes.length > 0 && (
        <FeaturedMixes mixes={featuredMixes} />
      )}

      {galleryAssets.length > 0 && (
        <GallerySection assets={galleryAssets} slug={tenant.slug} />
      )}

      <BookingCTASection name={tenant.name} slug={tenant.slug} />

      <NewsletterSection slug={tenant.slug} artistName={tenant.name} />

      <SocialLinksSection socials={socials} />

      <SiteFooter tenant={{ name: tenant.name, slug: tenant.slug }} />
    </>
  );
}
