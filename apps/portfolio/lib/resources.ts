export type Resource = {
  id: string
  name: string
  description: string
  url: string
  category: string
  tags: string[]
  free: boolean
}

export const RESOURCE_CATEGORIES = [
  'All',
  'UI Libraries',
  'Animation',
  'Dev Tools',
  'AI & Productivity',
  'Design',
  'Learning',
]

export const resources: Resource[] = [
  // UI Libraries
  {
    id: 'shadcn',
    name: 'shadcn/ui',
    description: 'Beautifully designed components built with Radix UI and Tailwind CSS. Copy and own them.',
    url: 'https://ui.shadcn.com',
    category: 'UI Libraries',
    tags: ['React', 'Radix', 'Tailwind'],
    free: true,
  },
  {
    id: 'radix',
    name: 'Radix UI',
    description: 'Unstyled, accessible primitives for building high-quality UI components.',
    url: 'https://www.radix-ui.com',
    category: 'UI Libraries',
    tags: ['React', 'Accessibility', 'Primitives'],
    free: true,
  },
  {
    id: 'lucide',
    name: 'Lucide Icons',
    description: 'Beautiful and consistent icon library for React apps, designed for clarity.',
    url: 'https://lucide.dev',
    category: 'UI Libraries',
    tags: ['Icons', 'React', 'SVG'],
    free: true,
  },
  // Animation
  {
    id: 'framer',
    name: 'Framer Motion',
    description: 'Production-ready motion library for React. Animate, gesture, layout, and scroll.',
    url: 'https://www.framer.com/motion/',
    category: 'Animation',
    tags: ['React', 'Animation', 'Gesture'],
    free: true,
  },
  {
    id: 'gsap',
    name: 'GSAP',
    description: 'The gold standard for JavaScript animations. Perfect for canvas and complex timelines.',
    url: 'https://gsap.com',
    category: 'Animation',
    tags: ['Canvas', 'Timeline', 'ScrollTrigger'],
    free: true,
  },
  {
    id: 'lottie',
    name: 'Lottie Files',
    description: 'High-quality, lightweight animations from After Effects, exported as JSON.',
    url: 'https://lottiefiles.com',
    category: 'Animation',
    tags: ['JSON', 'Illustration', 'Micro-animations'],
    free: true,
  },
  // Dev Tools
  {
    id: 'turbo',
    name: 'Turborepo',
    description: 'High-performance build system for JavaScript and TypeScript monorepos.',
    url: 'https://turbo.build',
    category: 'Dev Tools',
    tags: ['Monorepo', 'Build', 'Caching'],
    free: true,
  },
  {
    id: 'prisma',
    name: 'Prisma',
    description: 'Next-generation Node.js and TypeScript ORM. Type-safe DB queries with auto-migrations.',
    url: 'https://prisma.io',
    category: 'Dev Tools',
    tags: ['ORM', 'TypeScript', 'PostgreSQL'],
    free: true,
  },
  {
    id: 'tanstack',
    name: 'TanStack Query',
    description: 'Powerful async state management, server state synchronization, and data fetching for React.',
    url: 'https://tanstack.com/query',
    category: 'Dev Tools',
    tags: ['Data Fetching', 'Cache', 'React'],
    free: true,
  },
  {
    id: 'zod',
    name: 'Zod',
    description: 'TypeScript-first schema validation with static type inference. No more manual type assertions.',
    url: 'https://zod.dev',
    category: 'Dev Tools',
    tags: ['Validation', 'TypeScript', 'Schema'],
    free: true,
  },
  // AI & Productivity
  {
    id: 'claude',
    name: 'Claude Code',
    description: 'Anthropic\'s AI coding assistant. My primary pair programmer — writes, reviews, and architectures.',
    url: 'https://claude.ai/code',
    category: 'AI & Productivity',
    tags: ['AI', 'Coding', 'Anthropic'],
    free: false,
  },
  {
    id: 'v0',
    name: 'v0 by Vercel',
    description: 'Generate UI components from prompts. Great for scaffolding then customising.',
    url: 'https://v0.dev',
    category: 'AI & Productivity',
    tags: ['AI', 'UI Generation', 'Vercel'],
    free: true,
  },
  {
    id: 'cursor',
    name: 'Cursor',
    description: 'AI-first code editor built on VS Code. Native multi-file edits, agent mode.',
    url: 'https://cursor.com',
    category: 'AI & Productivity',
    tags: ['IDE', 'AI', 'VS Code'],
    free: false,
  },
  // Design
  {
    id: 'figma',
    name: 'Figma',
    description: 'Collaborative design and prototyping tool. The industry standard for UI design.',
    url: 'https://figma.com',
    category: 'Design',
    tags: ['Design', 'Prototype', 'Collaboration'],
    free: true,
  },
  {
    id: 'coolors',
    name: 'Coolors',
    description: 'Fast color palette generator. Pairs well with CSS custom properties and design tokens.',
    url: 'https://coolors.co',
    category: 'Design',
    tags: ['Color', 'Palette', 'Generator'],
    free: true,
  },
  {
    id: 'fontpair',
    name: 'Font Pair',
    description: 'Curated Google Fonts pairings that look great together — saves hours of trial and error.',
    url: 'https://www.fontpair.co',
    category: 'Design',
    tags: ['Fonts', 'Typography', 'Google Fonts'],
    free: true,
  },
  // Learning
  {
    id: 'patterns',
    name: 'patterns.dev',
    description: 'Design patterns, rendering patterns, and performance patterns for modern web development.',
    url: 'https://www.patterns.dev',
    category: 'Learning',
    tags: ['Patterns', 'Performance', 'Architecture'],
    free: true,
  },
  {
    id: 'joshcomeau',
    name: 'Josh W. Comeau',
    description: 'In-depth interactive tutorials on CSS, React, and animation. The best explanation style in the field.',
    url: 'https://joshwcomeau.com',
    category: 'Learning',
    tags: ['CSS', 'React', 'Animation'],
    free: true,
  },
]
