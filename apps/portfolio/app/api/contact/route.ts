export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const Schema = z.object({
  contactName: z.string().min(1),
  email: z.string().email(),
  companyName: z.string().optional(),
  projectType: z.string().min(1),
  budget: z.string().optional(),
  message: z.string().min(10),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = Schema.parse(body);

    const { prisma } = await import('db');
    await prisma.lead.create({
      data: {
        contactName: data.contactName,
        email: data.email,
        companyName: data.companyName ?? null,
        projectType: data.projectType,
        budget: data.budget ?? null,
        message: data.message,
        source: 'portfolio',
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Please fill in all required fields.' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
