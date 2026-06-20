import { NextResponse } from 'next/server';
import { prisma } from 'db';
import { auth } from '../../../lib/auth';

async function requireSuperAdmin() {
  const session = await auth();
  // @ts-expect-error extended
  if (!session || session.user?.role !== 'SUPER_ADMIN') return null;
  return session;
}

export async function POST(req: Request) {
  const session = await requireSuperAdmin();
  if (!session) return NextResponse.json({ error: 'Unauthorized — SUPER_ADMIN only' }, { status: 403 });

  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { error: 'User not found. They must sign in with GitHub first.' },
        { status: 404 },
      );
    }

    const updated = await prisma.user.update({
      where: { email },
      data: { role: 'ADMIN' },
    });
    return NextResponse.json(updated, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to add admin' }, { status: 500 });
  }
}
