import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // ── Tenant: DJ Randy Universe ───────────────────────────────────────────────
  const tenant = await prisma.tenant.upsert({
    where: { slug: 'dj-randy' },
    update: {},
    create: {
      name: 'DJ Randy Universe',
      slug: 'dj-randy',
      plan: 'PRO',
      status: 'ACTIVE',
      bio: 'Lagos-based Afrobeats & Amapiano DJ with 10+ years of experience. Available for weddings, corporate events, club nights, and festivals.',
      location: 'Lagos, Nigeria',
      brandColor: '#8B5CF6',
      accentColor: '#F59E0B',
      instagramUrl: 'djrandyuniverse',
      tiktokUrl: 'djrandyuniverse',
      youtubeUrl: 'UCdjrandyuniverse',
    },
  });
  console.log(`✅ Tenant: ${tenant.name} (/${tenant.slug})`);

  // ── User: tenant admin ──────────────────────────────────────────────────────
  const user = await prisma.user.upsert({
    where: { email: 'randy@example.com' },
    update: {},
    create: {
      name: 'Randy Universe',
      email: 'randy@example.com',
      role: 'ADMIN',
      tenantId: tenant.id,
    },
  });
  console.log(`✅ User: ${user.name} (${user.email})`);

  // ── Media assets ────────────────────────────────────────────────────────────
  const mixes = await Promise.all([
    prisma.mediaAsset.upsert({
      where: { id: 'seed-mix-001' },
      update: {},
      create: {
        id: 'seed-mix-001',
        tenantId: tenant.id,
        title: 'Afrobeats Vol. 12 — Summer 2025',
        type: 'MIX',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        duration: 3600,
        description: 'A scorching 60-min Afrobeats set featuring the latest from Burna Boy, Asake, and Davido.',
        featured: true,
        publishedAt: new Date('2025-06-01'),
      },
    }),
    prisma.mediaAsset.upsert({
      where: { id: 'seed-mix-002' },
      update: {},
      create: {
        id: 'seed-mix-002',
        tenantId: tenant.id,
        title: 'Amapiano Sessions — Live at The Marquee',
        type: 'MIX',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        duration: 4500,
        description: 'Live set from The Marquee Lagos. Pure Amapiano vibes.',
        featured: true,
        publishedAt: new Date('2025-05-15'),
      },
    }),
    prisma.mediaAsset.upsert({
      where: { id: 'seed-mix-003' },
      update: {},
      create: {
        id: 'seed-mix-003',
        tenantId: tenant.id,
        title: 'Wedding Vibes Mix — Corporate Edition',
        type: 'MIX',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        duration: 5400,
        description: 'Smooth transitions from dinner to dancefloor. Perfect for weddings and corporate events.',
        featured: true,
        publishedAt: new Date('2025-04-20'),
      },
    }),
  ]);
  console.log(`✅ Media: ${mixes.length} mixes`);

  // ── Sample bookings ─────────────────────────────────────────────────────────
  const booking = await prisma.booking.upsert({
    where: { id: 'seed-booking-001' },
    update: {},
    create: {
      id: 'seed-booking-001',
      tenantId: tenant.id,
      clientName: 'Adaeze Okonkwo',
      clientEmail: 'adaeze@example.com',
      clientPhone: '+234 801 234 5678',
      eventType: 'WEDDING',
      eventDate: new Date('2025-09-20'),
      venue: 'Eko Hotel & Suites',
      venueAddress: 'Plot 1415 Adetokunbo Ademola St, Victoria Island, Lagos',
      guestCount: 350,
      services: ['DJ_SET', 'MC_HOST', 'SOUND_SYSTEM'],
      basePrice: 450000,
      totalPrice: 450000,
      depositAmount: 150000,
      status: 'CONFIRMED',
      specialRequests: 'Afrobeats and highlife only. No trap music please.',
    },
  });
  console.log(`✅ Booking: ${booking.clientName} — ${booking.eventType}`);

  // ── Super admin user ────────────────────────────────────────────────────────
  // Update this email to YOUR GitHub account email so the admin dashboard works
  const superAdmin = await prisma.user.upsert({
    where: { email: 'aboladekasope@gmail.com' },
    update: { role: 'SUPER_ADMIN' },
    create: {
      name: 'Kasope Abolade',
      email: 'aboladekasope@gmail.com',
      role: 'SUPER_ADMIN',
    },
  });
  console.log(`✅ Super admin: ${superAdmin.email}`);

  // ── Karsh Core lead ─────────────────────────────────────────────────────────
  await prisma.lead.upsert({
    where: { id: 'seed-lead-001' },
    update: {},
    create: {
      id: 'seed-lead-001',
      contactName: 'Emeka Adeyemi',
      email: 'emeka@techstartup.ng',
      companyName: 'TechStartup NG',
      projectType: 'Web Application',
      budget: '₦2,000,000 – ₦5,000,000',
      message: 'We need a full-stack web app for our fintech product. Looking for a reliable dev partner.',
      status: 'NEW',
    },
  });
  console.log('✅ Lead: sample Karsh Core inbound lead');

  // ── Portfolio project ───────────────────────────────────────────────────────
  await prisma.project.upsert({
    where: { slug: 'crowdvibe' },
    update: {},
    create: {
      title: 'CrowdVibe',
      slug: 'crowdvibe',
      description: 'Multi-tenant SaaS platform for entertainers. Custom booking sites, payment processing, and media hub — all under their own domain.',
      tags: ['Next.js', 'SaaS', 'Multi-tenant', 'Prisma', 'Paystack', 'Stripe'],
      liveUrl: 'https://crowdvibe.io',
      published: true,
    },
  });
  console.log('✅ Project: CrowdVibe portfolio entry');

  console.log('\n🎉 Seed complete.\n');
  console.log('   CrowdVibe tenant site → http://localhost:3003/site/dj-randy');
  console.log('   Tenant dashboard      → http://localhost:3003/dashboard');
  console.log('   Admin dashboard       → http://localhost:3001/dashboard');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
