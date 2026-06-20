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
    const { status, adminNotes } = body;

    const booking = await prisma.booking.update({
      where: { id },
      data: {
        ...(status ? { status } : {}),
        ...(adminNotes !== undefined ? { adminNotes } : {}),
      },
    });
    return NextResponse.json(booking);
  } catch {
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
  }
}
