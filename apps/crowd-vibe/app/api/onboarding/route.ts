import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/shared/lib/auth';
import { prisma } from '@/shared/lib/prisma';

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { name, slug, bio, location, brandColor, accentColor } = body;

  if (!name || !slug) return NextResponse.json({ error: 'Name and slug required' }, { status: 400 });

  const slugified = slug.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

  const existing = await prisma.tenant.findUnique({ where: { slug: slugified } });
  if (existing) return NextResponse.json({ error: 'That URL is already taken. Try another.' }, { status: 409 });

  const tenant = await prisma.tenant.create({
    data: {
      name,
      slug: slugified,
      bio,
      location,
      brandColor: brandColor ?? '#7C3AED',
      accentColor: accentColor ?? '#F59E0B',
      plan: 'FREE',
    },
  });

  await prisma.user.update({
    where: { id: session.user.id },
    data: { tenantId: tenant.id, role: 'ADMIN' },
  });

  return NextResponse.json({ tenant }, { status: 201 });
}
