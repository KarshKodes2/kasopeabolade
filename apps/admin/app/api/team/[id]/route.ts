import { NextResponse } from 'next/server';
import { prisma } from 'db';
import { auth } from '../../../../lib/auth';

async function requireSuperAdmin() {
  const session = await auth();
  // @ts-expect-error extended
  if (!session || session.user?.role !== 'SUPER_ADMIN') return null;
  return session;
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireSuperAdmin();
  if (!session) return NextResponse.json({ error: 'Unauthorized — SUPER_ADMIN only' }, { status: 403 });

  const { id } = await params;
  try {
    const self = await prisma.user.findUnique({ where: { email: session.user?.email ?? '' } });
    if (self?.id === id) {
      return NextResponse.json({ error: 'Cannot remove your own admin access' }, { status: 400 });
    }

    await prisma.user.update({
      where: { id },
      data: { role: 'GUEST' },
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to remove access' }, { status: 500 });
  }
}
