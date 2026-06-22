export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/prisma';

export async function GET(req: NextRequest) {
  const domain = req.nextUrl.searchParams.get('domain');
  if (!domain) return NextResponse.json({ error: 'domain required' }, { status: 400 });

  const tenant = await prisma.tenant.findUnique({
    where: { customDomain: domain },
    select: { slug: true },
  });

  if (!tenant) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ slug: tenant.slug });
}
