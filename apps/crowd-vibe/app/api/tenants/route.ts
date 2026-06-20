import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/shared/lib/auth';
import { prisma } from '@/shared/lib/prisma';

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug');

  if (slug) {
    // Public slug lookup — returns minimal public info (used for slug availability checks)
    const tenant = await prisma.tenant.findUnique({
      where: { slug },
      select: { id: true, name: true, slug: true },
    });
    if (!tenant) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ tenant });
  }

  // Authenticated: return full settings for current user's tenant
  const session = await auth();
  if (!session?.user?.tenantId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const tenant = await prisma.tenant.findUnique({
    where: { id: session.user.tenantId },
    select: {
      id: true, name: true, slug: true, bio: true, location: true,
      brandColor: true, accentColor: true, logoUrl: true, heroImageUrl: true,
      instagramUrl: true, tiktokUrl: true, youtubeUrl: true,
      audiomackUrl: true, soundcloudUrl: true, spotifyUrl: true,
      customDomain: true, siteType: true,
    },
  });
  if (!tenant) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ tenant });
}

export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const tenantId = session.user?.tenantId as string | null;
  if (!tenantId) return NextResponse.json({ error: 'No tenant' }, { status: 403 });

  const body = await req.json() as Record<string, string>;
  const allowed = ['name', 'slug', 'bio', 'location', 'brandColor', 'accentColor', 'instagramUrl', 'tiktokUrl', 'youtubeUrl', 'audiomackUrl', 'soundcloudUrl', 'spotifyUrl', 'customDomain'];
  const data = Object.fromEntries(Object.entries(body).filter(([k]) => allowed.includes(k)));

  const tenant = await prisma.tenant.update({ where: { id: tenantId }, data });
  return NextResponse.json(tenant);
}
