import { prisma, Role } from './index';
import { nanoid } from 'nanoid';

async function main() {
  const superAdmin = await prisma.user.upsert({
    where: { email: 'super@admin.io' },
    update: {},
    create: {
      email: 'super@admin.io',
      name: 'Super Admin',
      role: Role.SUPER_ADMIN,
    },
  });

  const guest = await prisma.user.upsert({
    where: { email: 'guest@example.com' },
    update: {},
    create: {
      email: 'guest@example.com',
      name: 'Guest User',
      role: Role.GUEST,
    },
  });

  await prisma.project.createMany({
    data: [
      {
        title: 'DJ Afrobeat Night',
        slug: 'dj-afrobeat-night',
        description: 'A high‑energy afrobeat mix set.',
        createdById: superAdmin.id,
      },
      {
        title: 'Corporate Tech Talk',
        slug: 'corporate-tech-talk',
        description: 'Audio setup and live DJ for a corporate tech event.',
        createdById: superAdmin.id,
      },
    ],
    skipDuplicates: true,
  });

  await prisma.booking.createMany({
    data: [
      {
        id: nanoid(),
        eventDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        clientName: 'ACME Corp',
        status: 'pending',
        userId: guest.id,
      },
    ],
  });

  console.log('✅ Test data inserted');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
