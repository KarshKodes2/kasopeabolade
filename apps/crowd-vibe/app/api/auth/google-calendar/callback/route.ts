import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/prisma';
import { exchangeCodeForTokens } from '@/features/calendar';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const tenantId = searchParams.get('state');

  if (!code || !tenantId) {
    return NextResponse.redirect(new URL('/settings?calendar=error', req.url));
  }

  try {
    const tokens = await exchangeCodeForTokens(code);

    await prisma.tenant.update({
      where: { id: tenantId },
      data: {
        googleAccessToken: tokens.access_token ?? null,
        googleRefreshToken: tokens.refresh_token ?? null,
        googleCalendarId: 'primary',
      },
    });

    return NextResponse.redirect(new URL('/settings?calendar=connected', req.url));
  } catch {
    return NextResponse.redirect(new URL('/settings?calendar=error', req.url));
  }
}
