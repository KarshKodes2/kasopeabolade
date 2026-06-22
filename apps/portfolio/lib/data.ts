export const PERSONAL = {
  name: 'Kasope Abolade',
  title: 'Full-Stack Engineer & Founder',
  tagline: 'I build products that scale — from idea to production.',
  bio: "I'm a full-stack engineer and founder of Karsh Core Solutions, a boutique software studio building SaaS products and custom web applications. I specialise in multi-tenant architectures, payment integrations, and shipping polished user experiences with TypeScript and Next.js.",
  location: 'Lagos, Nigeria',
  email: 'aboladekasope@gmail.com',
  github: 'https://github.com/kasopeabolade',
  linkedin: 'https://linkedin.com/in/kasope-abolade',
  twitter: 'https://twitter.com/kasopeabolade',
  cvUrl: '/cv.pdf',
  openToWork: true,
};

export const TECH_STACK = [
  {
    category: 'Frontend',
    items: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'PostgreSQL', 'Prisma ORM', 'NextAuth.js', 'REST APIs'],
  },
  {
    category: 'DevOps & Tools',
    items: ['Vercel', 'Railway', 'Neon Postgres', 'Turbo', 'GitHub Actions'],
  },
  {
    category: 'Integrations',
    items: ['Stripe', 'Paystack', 'Cloudinary', 'Resend', 'Google Calendar API'],
  },
];

export const TIMELINE = [
  {
    year: '2024 – Present',
    role: 'Founder & Lead Engineer',
    company: 'Karsh Core Solutions',
    description:
      'Founded a boutique software studio. Building CrowdVibe — a multi-tenant SaaS platform for entertainment professionals — and consulting on full-stack projects for startups and SMEs.',
  },
  {
    year: '2023 – 2024',
    role: 'Full-Stack Developer',
    company: 'Freelance',
    description:
      'Delivered production-grade web applications for clients across fintech, e-commerce, and creative industries. Specialised in Next.js, PostgreSQL, and payment integrations.',
  },
  {
    year: '2022 – 2023',
    role: 'Frontend Engineer',
    company: 'Early Career',
    description:
      'Built and shipped React applications, designed component libraries, and developed a deep understanding of TypeScript, performance optimisation, and accessibility.',
  },
];

export interface StaticProject {
  id: string;
  title: string;
  description: string;
  slug: string;
  tags: string[];
  featuredImg: string | null;
  featured: boolean;
  liveUrl?: string;
  githubUrl?: string;
}

export const STATIC_PROJECTS: StaticProject[] = [
  {
    id: 'crowdvibe',
    title: 'CrowdVibe',
    description:
      'Multi-tenant SaaS platform for entertainment professionals. Custom domain routing, 5-step booking wizard, Paystack + Stripe payments, Google Calendar sync.',
    slug: 'crowdvibe',
    tags: ['Next.js', 'Prisma', 'PostgreSQL', 'Stripe', 'Paystack', 'Tailwind CSS'],
    featuredImg: null,
    featured: true,
    liveUrl: 'https://crowdvibe.io',
  },
  {
    id: 'karsh-core',
    title: 'Karsh Core Solutions',
    description:
      'Corporate site and lead-capture system for a boutique software studio. JSON-LD, sitemap, Resend email notifications, Lead CRM pipeline.',
    slug: 'karsh-core',
    tags: ['Next.js', 'Resend', 'TypeScript', 'Tailwind CSS'],
    featuredImg: null,
    featured: false,
    liveUrl: 'https://karshcoresolutions.com',
  },
  {
    id: 'portfolio',
    title: 'Developer Portfolio',
    description:
      'This site — built with Next.js 15, 6-theme system, Framer Motion animations, and a fully typed static-data + DB architecture.',
    slug: 'portfolio',
    tags: ['Next.js', 'Framer Motion', 'TypeScript', 'Tailwind CSS'],
    featuredImg: null,
    featured: false,
    liveUrl: 'https://kasope.dev',
  },
];

export const STATS = [
  { label: 'Years of experience', value: 3, suffix: '+' },
  { label: 'Projects shipped', value: 12, suffix: '+' },
  { label: 'SaaS products', value: 2, suffix: '' },
  { label: 'Open source commits', value: 100, suffix: '+' },
];

export const RESOURCES = [
  {
    id: '1',
    category: 'TypeScript',
    title: 'Matt Pocock — Total TypeScript',
    description: 'The definitive TypeScript resource. Advanced generics, type transformations, and real-world patterns.',
    url: 'https://www.totaltypescript.com',
    tags: ['TypeScript', 'Learning'],
  },
  {
    id: '2',
    category: 'Next.js',
    title: 'Next.js Official Docs',
    description: 'App Router, Server Components, caching strategies, and deployment guides.',
    url: 'https://nextjs.org/docs',
    tags: ['Next.js', 'React'],
  },
  {
    id: '3',
    category: 'Database',
    title: 'Prisma Documentation',
    description: 'Schema design, migrations, relations, and query optimisation with Prisma ORM.',
    url: 'https://www.prisma.io/docs',
    tags: ['Prisma', 'PostgreSQL', 'Database'],
  },
  {
    id: '4',
    category: 'Animation',
    title: 'Framer Motion Docs',
    description: 'Gestures, variants, layout animations, and shared element transitions.',
    url: 'https://motion.dev',
    tags: ['Animation', 'React'],
  },
  {
    id: '5',
    category: 'Design',
    title: 'Refactoring UI',
    description: 'Practical design principles for developers. How to make UIs look polished without being a designer.',
    url: 'https://www.refactoringui.com',
    tags: ['Design', 'UI/UX'],
  },
  {
    id: '6',
    category: 'Architecture',
    title: 'tRPC Documentation',
    description: 'End-to-end typesafe APIs. Build APIs with TypeScript without schemas or code generation.',
    url: 'https://trpc.io/docs',
    tags: ['TypeScript', 'APIs', 'Architecture'],
  },
  {
    id: '7',
    category: 'Performance',
    title: 'Web.dev — Core Web Vitals',
    description: 'Google\'s guide to measuring and optimising Largest Contentful Paint, CLS, and INP.',
    url: 'https://web.dev/vitals',
    tags: ['Performance', 'SEO'],
  },
  {
    id: '8',
    category: 'Deployment',
    title: 'Vercel Platform Docs',
    description: 'Edge Functions, ISR, Middleware, and monorepo deployments on Vercel.',
    url: 'https://vercel.com/docs',
    tags: ['Deployment', 'Next.js', 'Edge'],
  },
];
