import { NextResponse } from 'next/server';
import { prisma } from 'db';
import { auth } from '../../../../../lib/auth';

async function requireAdmin() {
  const session = await auth();
  // @ts-expect-error extended
  if (!session || !['SUPER_ADMIN', 'ADMIN'].includes(session.user?.role)) return null;
  return session;
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  try {
    const body = await req.json();
    const { plan, status, siteType, redirectUrl } = body;

    const tenant = await prisma.tenant.update({
      where: { id },
      data: {
        ...(plan ? { plan } : {}),
        ...(status ? { status } : {}),
        ...(siteType ? { siteType } : {}),
        ...(redirectUrl !== undefined ? { redirectUrl } : {}),
      },
    });
    return NextResponse.json(tenant);
  } catch {
    return NextResponse.json({ error: 'Failed to update tenant' }, { status: 500 });
  }
}
