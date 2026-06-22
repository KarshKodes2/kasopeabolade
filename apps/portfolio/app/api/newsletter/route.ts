export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const Schema = z.object({ email: z.string().email() });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = Schema.parse(body);

    const { prisma } = await import('db');
    await prisma.newsletterSubscriber.create({
      data: { email, tenantId: null },
    });

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }
    const msg = (err as { message?: string })?.message ?? '';
    if (msg.includes('Unique constraint')) {
      return NextResponse.json({ error: 'Already subscribed.' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
