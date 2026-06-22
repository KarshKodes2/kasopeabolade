export const dynamic = 'force-dynamic';
import { auth } from '@/shared/lib/auth';
import { prisma } from 'db';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.tenantId) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const data = await req.json();

  const allowed = ['title', 'description', 'featured', 'type'] as const;
  const safe = Object.fromEntries(
    Object.entries(data).filter(([k]) => allowed.includes(k as typeof allowed[number]))
  );

  const asset = await prisma.mediaAsset.update({
    where: { id, tenantId: session.user.tenantId },
    data: safe,
  });

  return Response.json({ asset });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.tenantId) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  await prisma.mediaAsset.delete({ where: { id, tenantId: session.user.tenantId } });

  return new Response(null, { status: 204 });
}
