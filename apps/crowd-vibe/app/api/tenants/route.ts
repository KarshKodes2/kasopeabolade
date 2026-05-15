import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/shared/lib/auth';
import { prisma } from '@/shared/lib/prisma';

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
