import { NextResponse } from 'next/server';
import { prisma } from 'db';
import { auth } from '../../../../lib/auth';

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
    const { title, subtitle, slug, description, url, emoji, color, featuredImg, tags, featured, published } = body;

    const project = await prisma.project.update({
      where: { id },
      data: { title, subtitle, slug, description, url, emoji, color, featuredImg, tags, featured, published },
    });
    return NextResponse.json(project);
  } catch {
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  try {
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
