import { NextResponse } from 'next/server';
import { prisma } from 'db';
import { auth } from '../../../lib/auth';

async function requireAdmin() {
  const session = await auth();
  // @ts-expect-error extended
  if (!session || !['SUPER_ADMIN', 'ADMIN'].includes(session.user?.role)) return null;
  return session;
}

export async function GET(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const context = searchParams.get('context');
  const tenantId = searchParams.get('tenantId');

  const posts = await prisma.post.findMany({
    where: {
      ...(context ? { context: context as 'PORTFOLIO' | 'KARSH_CORE' | 'TENANT' } : {}),
      ...(tenantId ? { tenantId } : {}),
    },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const { title, slug, excerpt, content, coverImage, tags, readingTime, featured, published, context, tenantId } = body;

    if (!title || !slug || !content || !context) {
      return NextResponse.json({ error: 'title, slug, content, context are required' }, { status: 400 });
    }

    const post = await prisma.post.create({
      data: {
        title, slug, excerpt, content, coverImage,
        tags: tags ?? [],
        readingTime,
        featured: featured ?? false,
        published: published ?? false,
        publishedAt: published ? new Date() : null,
        context,
        tenantId: tenantId ?? null,
      },
    });
    return NextResponse.json(post, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
