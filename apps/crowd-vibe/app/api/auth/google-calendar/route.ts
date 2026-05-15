import { NextResponse } from 'next/server';
import { auth } from '@/shared/lib/auth';
import { prisma } from '@/shared/lib/prisma';
import { getAuthorizationUrl } from '@/features/calendar';

export async function GET() {
  const session = await auth();
  if (!session?.user?.tenantId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const url = getAuthorizationUrl(session.user.tenantId);
  return NextResponse.json({ url });
}

export async function DELETE() {
  const session = await auth();
  if (!session?.user?.tenantId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  await prisma.tenant.update({
    where: { id: session.user.tenantId },
    data: { googleAccessToken: null, googleRefreshToken: null, googleCalendarId: null },
  });
  return NextResponse.json({ ok: true });
}
