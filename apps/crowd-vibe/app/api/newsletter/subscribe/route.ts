export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/prisma';
import { resend } from '@/shared/lib/resend';

export async function POST(req: NextRequest) {
  const { email, name, slug } = await req.json();
  if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

  const tenant = slug
    ? await prisma.tenant.findUnique({ where: { slug }, select: { id: true, name: true } })
    : null;

  try {
    await prisma.newsletterSubscriber.create({
      data: { email, name: name || null, tenantId: tenant?.id ?? null },
    });
  } catch (e: unknown) {
    if ((e as { code?: string }).code === 'P2002') {
      return NextResponse.json({ ok: true, existing: true });
    }
    throw e;
  }

  await resend.emails.send({
    from: 'CrowdVibe <noreply@crowdvibe.io>',
    to: email,
    subject: `You're subscribed to ${tenant?.name ?? 'CrowdVibe'} updates! 🎵`,
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px;background:#0B0B0B;color:#fff;">
        <h2 style="color:#7C3AED;margin-bottom:8px;">You're in! 🎉</h2>
        <p style="color:#ffffff80;">
          Hi${name ? ` ${name}` : ''}, you're now subscribed to updates from <strong style="color:#fff">${tenant?.name ?? 'CrowdVibe'}</strong>.
        </p>
        <p style="color:#ffffff50;font-size:12px;margin-top:24px;">
          You'll get notified about upcoming events, new mixes, and exclusive drops.
        </p>
      </div>
    `,
  }).catch(console.error);

  return NextResponse.json({ ok: true });
}
