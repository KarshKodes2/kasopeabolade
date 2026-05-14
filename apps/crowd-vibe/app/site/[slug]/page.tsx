import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '../../../lib/prisma';
import { SiteNav } from '../../../components/layout/SiteNav';
import { SiteFooter } from '../../../components/layout/SiteFooter';
import { HeroSection } from '../../../components/site/HeroSection';
import { ServicesSection } from '../../../components/site/ServicesSection';
import { FeaturedMixes } from '../../../components/site/FeaturedMixes';
import { GallerySection } from '../../../components/site/GallerySection';
import { BookingCTASection } from '../../../components/site/BookingCTASection';
import { SocialLinksSection } from '../../../components/site/SocialLinksSection';

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

      <SocialLinksSection socials={socials} />

      <SiteFooter tenant={{ name: tenant.name, slug: tenant.slug }} />
    </>
  );
}
