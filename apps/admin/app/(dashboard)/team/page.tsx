import { prisma } from 'db';
import { TeamPageClient } from '../../../features/team/components/TeamPageClient';

export const metadata = { title: 'Team' };

export default async function TeamPage() {
  const members = await prisma.user.findMany({
    where: { role: { in: ['SUPER_ADMIN', 'ADMIN'] } },
    orderBy: { createdAt: 'asc' },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      createdAt: true,
    },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--cv-text)' }}>Team</h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--cv-text-secondary)' }}>
          {members.length} admin {members.length === 1 ? 'member' : 'members'}
        </p>
      </div>
      <TeamPageClient members={members} />
    </div>
  );
}
