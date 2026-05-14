# CLAUDE.md — Portfolio App Implementation

> **How to use this file:** Place this file at `apps/portfolio/CLAUDE.md` inside the
> `kasopeabolade` monorepo. Then run `claude` from that directory (or from the monorepo root
> and ask it to implement the portfolio app). Claude Code will read this file automatically
> and execute the full implementation plan below.

---

## Mission

Implement the `apps/portfolio` Next.js 15 application inside the `kasopeabolade` monorepo.
The result must be a **world-class, production-ready personal portfolio** for
**Kasope Abolade (DJ Karsh)** — a Senior Frontend & AI-Enabled Software Engineer based in
Lagos, Nigeria.

The visual bar: **Stripe, Vercel, Linear** — premium dark SaaS aesthetic. Every pixel
deliberate. Every interaction felt.

---

## Context you must understand before writing a single line

### Monorepo topology

```
kasopeabolade/                     ← monorepo root
├── apps/
│   ├── portfolio/                 ← YOU ARE HERE — implement this app
│   ├── admin/
│   ├── dj-karsh/
│   └── karsh-core/
├── packages/
│   ├── db/                        ← @karsh/db  (Prisma client, schema)
│   ├── ui/                        ← @karsh/ui  (shared components)
│   ├── utils/                     ← @karsh/utils (RBAC, validation)
│   └── config/                    ← @karsh/config (ESLint, Prettier, Tailwind)
├── turbo.json
└── package.json
```

### Shared packages you MUST use

| Import path | What it provides | Usage in portfolio |
|-------------|------------------|--------------------|
| `@karsh/db` | Prisma client singleton, all model types | Fetch `Project` records from DB |
| `@karsh/ui` | Base components (Button, Card, Badge, etc.) | Extend, don't duplicate |
| `@karsh/utils` | RBAC helpers, validation schemas | Any auth-gated routes |
| `@karsh/config/tailwind` | Shared Tailwind preset | Extend in `tailwind.config.ts` |
| `@karsh/config/eslint` | ESLint flat config base | Extend in `eslint.config.mjs` |

### Database models available via `@karsh/db`

```prisma
model Project {
  id          String   @id @default(cuid())
  title       String
  description String
  url         String?
  tags        String[]
  tenantId    String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model User {
  id       String  @id @default(cuid())
  name     String?
  email    String  @unique
  role     Role    @default(GUEST)  // SUPER_ADMIN | ADMIN | MEMBER | GUEST
  tenantId String?
}
```

---

## Tech constraints

| Requirement | Specification |
|-------------|--------------|
| Framework | Next.js 15, App Router only — no Pages Router |
| React | React 19 |
| Styling | Tailwind CSS 4 — extend `@karsh/config/tailwind` preset |
| Animation | Framer Motion v12 (already in workspace deps) |
| GSAP | GSAP 3 with ScrollTrigger (already in workspace deps) |
| Language | TypeScript 5, strict mode, no `any` |
| Data fetching | React Server Components for DB reads; client components only where interactivity is needed |
| Node | 20+ |

---

## Design system

### Tokens (define in `app/globals.css` as CSS custom properties)

```css
:root {
  /* Backgrounds */
  --bg:          #0B0B0B;
  --bg-2:        #111111;
  --bg-3:        #161616;
  --black:       #000000;

  /* Surfaces */
  --surface:     rgba(255,255,255,0.04);
  --surface-hover: rgba(255,255,255,0.07);
  --border:      rgba(255,255,255,0.08);
  --border-gold: rgba(212,175,55,0.3);

  /* Brand */
  --blue:        #2563EB;
  --blue-light:  #3B82F6;
  --blue-deep:   #1E3A8A;
  --gold:        #D4AF37;
  --gold-light:  #E8C84A;

  /* Text */
  --text-1:      #F8F8F8;
  --text-2:      #A0A0A0;
  --text-3:      #606060;

  /* Glows */
  --glow-blue:   rgba(37,99,235,0.25);
  --glow-gold:   rgba(212,175,55,0.2);

  /* Radii */
  --radius:      12px;
  --radius-lg:   20px;
}
```

### Typography

- Display / headings: **Sora** (Google Fonts, weights 700–800)
- Monospace / numbers: **Space Mono** (Google Fonts, weights 400–700)
- Body: system-ui fallback stack

Load via `next/font/google` in `app/layout.tsx` — never via `<link>` tags.

### Key utility classes to define

```css
.text-gradient      { /* blue → gold gradient text clip */ }
.text-gradient-gold { /* gold gradient text clip */ }
.glass              { background: var(--surface); backdrop-filter: blur(20px); border: 1px solid var(--border); }
.glass-gold         { background: rgba(212,175,55,0.05); backdrop-filter: blur(20px); border: 1px solid var(--border-gold); }
.glow-blue          { box-shadow: 0 0 40px var(--glow-blue), 0 0 80px rgba(37,99,235,0.1); }
.section-padding    { padding: 7rem 0; }
.container-xl       { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
```

---

## File structure to create

Create every file listed below. Do not skip any. Implement each fully — no `// TODO` stubs.

```
apps/portfolio/
├── app/
│   ├── layout.tsx                    # Root layout: fonts, metadata, Navbar, Footer
│   ├── globals.css                   # Design tokens + Tailwind base
│   ├── page.tsx                      # Home — composes all sections
│   ├── loading.tsx                   # Root loading UI (skeleton)
│   ├── not-found.tsx                 # Branded 404 page
│   ├── sitemap.ts                    # Dynamic sitemap for SEO
│   └── robots.ts                     # Robots.txt
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx                # Sticky glass nav, mobile drawer
│   │   └── Footer.tsx                # Minimal luxury footer
│   │
│   ├── sections/                     # One file per page section
│   │   ├── LoadingScreen.tsx         # Cinematic entrance (client component)
│   │   ├── Hero.tsx                  # Particle canvas, parallax, letter animation
│   │   ├── About.tsx                 # Bio, pillars grid, animated avatar rings
│   │   ├── TechStack.tsx             # Category cards with hover glow
│   │   ├── Timeline.tsx              # Alternating career timeline
│   │   ├── Projects.tsx              # 3D tilt cards; data from DB via RSC
│   │   ├── AIEngineering.tsx         # Animated agent-network canvas
│   │   ├── Stats.tsx                 # Animated counters
│   │   └── Contact.tsx               # CTA block + social links
│   │
│   └── ui/
│       ├── GlowButton.tsx            # Primary/gold/ghost button variants
│       ├── SectionTitle.tsx          # Eyebrow + heading + gold divider
│       └── AnimatedCounter.tsx       # rAF count-up on scroll
│
├── hooks/
│   ├── useScrollAnimation.ts         # IntersectionObserver → Framer Motion
│   ├── useGsapTimeline.ts            # GSAP context + auto-cleanup
│   └── useParallax.ts                # Mouse parallax + card tilt
│
├── lib/
│   ├── projects.ts                   # Server-side DB helpers (uses @karsh/db)
│   └── metadata.ts                   # Shared OpenGraph metadata builder
│
├── public/
│   └── og-image.png                  # Placeholder OG image (create a simple SVG-based one)
│
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── eslint.config.mjs
└── package.json
```

---

## Section-by-section implementation spec

### 1. `app/layout.tsx` — Root Layout

```tsx
// Requirements:
// - Load Sora + Space Mono via next/font/google
// - Apply fonts as CSS variables: --font-sora, --font-mono
// - Set comprehensive <html> metadata (see Metadata section below)
// - Render <Navbar /> and <Footer /> around {children}
// - Wrap with a client-side <LoadingScreen /> that animates out on mount
// - Dark scrollbar styling via globals.css
// - Body background: var(--bg), color: var(--text-1)
```

### 2. `app/page.tsx` — Home Page

```tsx
// Requirements:
// - Pure React Server Component
// - Fetch projects from DB using lib/projects.ts
// - Compose all sections in order:
//   <Hero />
//   <About />
//   <TechStack />
//   <Timeline />
//   <Projects projects={projects} />   ← pass server-fetched data as prop
//   <AIEngineering />
//   <Stats />
//   <Contact />
// - Wrap each section below Hero in <Suspense fallback={<SectionSkeleton />}>
```

### 3. Hero Section

```tsx
// Visuals:
// - Full-screen (min-h-screen), bg: var(--black)
// - CSS grid background: subtle blue line grid at 80px spacing, 4% opacity
// - <ParticleCanvas /> — client component, canvas-based particle network:
//   · 90 blue particles drifting slowly
//   · Connect particles <120px apart with faint lines
//   · Animated pulse dots travel along connecting lines
// - Pulsing blue radial glow orb (600×600px, blur-[160px])
// - Gold gradient top border line, scaleX animates from 0→1 on mount

// Content:
// - "Senior Frontend & AI-Enabled Engineer" gold pill badge
// - Name "Kasope Abolade" — letter-by-letter stagger animation
//   · "Kasope" in var(--text-1), "Abolade" in text-gradient
// - Tagline: word-by-word stagger reveal
// - Three CTAs: View Projects (primary), Contact Me (gold), GitHub (ghost)
// - Scroll cue: animated downward line below content

// Parallax:
// - useScroll + useTransform to move content 30% as user scrolls down
// - Opacity fades from 1→0 as section exits
```

### 4. About Section

```tsx
// Layout: two-column grid (lg:grid-cols-2), items-center
// Left column — text:
// - Gold eyebrow label
// - Headline with text-gradient span
// - Three paragraphs of bio (from CV content below)
// - Personal philosophy: "Questions, not answers, create knowledge."
// - Contact info line: email · Lagos, Nigeria

// Right column — avatar:
// - Three concentric rings, each with different rotation speeds (12s, 16s, 20s)
//   counter-rotating alternately
// - Central glass-gold circle with "KA" monogram + name
// - Two floating badges: "8+ yrs", "Lagos 🇳🇬" — bouncing Y animation

// Below grid — four pillar cards (sm:grid-cols-2 lg:grid-cols-4):
// 1. ⚡ Frontend Architecture
// 2. 🤖 AI-Assisted Dev
// 3. 📱 Cross-Platform Mobile
// 4. 🔒 Fintech & Security
// Each card: glass surface, hover glow, scale-up variant on scroll
```

### 5. TechStack Section

```tsx
// bg: var(--bg-2)
// Data: import { skills } from '@/data/portfolio'
// Render one card per category:
//   Frontend | Mobile | Backend | Database | DevOps | Testing | AI
// Each card:
// - Category icon (emoji) + coloured category label
// - Skill pills — hover scales 1.05×
// - Hover radial glow using category colour
// - Bottom accent line fades in on hover
// Cards animate in with staggerContainerVariants
```

### 6. Timeline Section

```tsx
// Alternating left/right layout on md+, stacked on mobile
// Centre spine: vertical gradient line (blue → transparent)
// Centre node: coloured dot per company, scale-up animation
// Each experience card: glass surface, company name, role, period, location
// Highlights list: › prefix in company colour
// Cards animate in from left/right using slideIn variants
// Companies in order:
//   Solab Technologies → SystemSpecs → VULTe by Polaris Bank → SPOXIO → Access Bank
```

### 7. Projects Section

```tsx
// Data source: accept `projects` prop (server-fetched via lib/projects.ts)
// Fall back to STATIC_PROJECTS constant if DB returns empty (see data below)
// Grid: sm:grid-cols-2 (two columns)
// Each card:
// - useTilt hook for 3D perspective tilt on hover
// - Top gradient accent line in project colour
// - Visual area (h-44): CSS grid bg pattern + emoji centred
// - Hover radial glow overlay
// - Project title, subtitle, description (truncated)
// - External link icon (↗) — hover rotates 10°
// - Tag pills styled with project colour (border + bg tint)
// - Card lifts y:-8 on hover
```

### 8. AIEngineering Section

```tsx
// bg: var(--bg) with subtle dot-grid pattern
// Left: <AgentNetwork /> canvas — animated node graph:
//   Nodes: Architect (gold, centre), Builder, Tester, Reviewer, Deployer, DocWriter
//   Edges: gradient lines between all nodes
//   Animated pulse dots travel along each edge
//   Nodes breathe with sine-wave scale pulse
//   Labels rendered inside each node circle
// Right: four capability cards (stagger animation):
//   🧠 Agent Orchestration
//   ⚡ AI-Assisted Workflows
//   🔁 Automation Pipelines
//   📚 Knowledge Engineering
//   Each card: glass, icon, title, description, hover slides x:+6
```

### 9. Stats Section

```tsx
// bg: var(--bg-3) with blue-deep left-gradient overlay
// Gold top border
// Four AnimatedCounter components in a 2×2 / 4-col grid:
//   8+ Years Experience     (blue)
//   20+ Projects Delivered  (gold)
//   75% Performance Boost   (green)
//   80% Test Coverage       (purple)
// AnimatedCounter: rAF-based ease-out cubic, triggers once on IntersectionObserver
```

### 10. Contact Section

```tsx
// bg: var(--bg-2) with blue glow orb pulsing at bottom
// glass-gold CTA card (max-w-2xl centred):
//   - 👋 emoji
//   - "Available for opportunities" heading
//   - Availability description
//   - Send Email (primary) + LinkedIn (gold) buttons
// Three social link pills: GitHub | LinkedIn | Email
//   hover: y:-4, scale:1.1
```

---

## Reusable hooks spec

### `hooks/useScrollAnimation.ts`

```ts
// useScrollAnimation(options?: { threshold?: number; triggerOnce?: boolean })
// → { ref, controls, inView }
// Uses react-intersection-observer + framer-motion useAnimation
// Starts 'visible' when inView, 'hidden' when not (if !triggerOnce)

// Export pre-built Variants (all use string easing for FM v12 compatibility):
export const fadeUpVariants: Variants        // hidden: { opacity:0, y:40 }
export const fadeInVariants: Variants        // hidden: { opacity:0 }
export const slideInLeftVariants: Variants   // hidden: { opacity:0, x:-60 }
export const slideInRightVariants: Variants  // hidden: { opacity:0, x:60 }
export const scaleUpVariants: Variants       // hidden: { opacity:0, scale:0.85 }
export const staggerContainerVariants: (stagger?: number) => Variants
```

### `hooks/useGsapTimeline.ts`

```ts
// useGsapTimeline(callback, deps, options?)
// Creates GSAP timeline inside gsap.context() — auto-revert on unmount
// Registers ScrollTrigger plugin
// Returns { ref, tl }

// useGsapScrollReveal(selector, containerRef)
// Batch reveals elements matching selector when container enters viewport
```

### `hooks/useParallax.ts`

```ts
// useParallax(strength?: number) → { x, y }
// Mouse-position → useMotionValue → useSpring (stiffness:60, damping:20)
// Cleans up mousemove listener on unmount

// useTilt(maxTilt?: number) → { rotateX, rotateY, handleMouseMove, handleMouseLeave }
// Spring physics (stiffness:120, damping:18)
// Card perspective tilt — returns motion values and event handlers
```

---

## Reusable UI components spec

### `components/ui/GlowButton.tsx`

```tsx
// Props: variant ('primary'|'gold'|'ghost'), size ('sm'|'md'|'lg'),
//        href?, onClick?, className?, download?, target?, rel?
// Renders <a> if href provided, else <button>
// whileHover: scale 1.03, whileTap: scale 0.97
// primary: blue bg, blue border, blue glow on hover
// gold:    transparent bg, gold border, gold text, gold glow on hover
// ghost:   transparent, border-[--border], muted text
```

### `components/ui/SectionTitle.tsx`

```tsx
// Props: label (eyebrow), title, subtitle?, align ('left'|'center')
// Eyebrow: gold, tracking-[0.2em], uppercase, flanked by 6px gold lines
// Title: text-4xl md:text-5xl font-bold
// Gold underline: 24px-wide gradient hr, centred if align=centre
// Subtitle: text-[--text-2] max-w-2xl
// Whole component wrapped in useScrollAnimation + fadeUpVariants
```

### `components/ui/AnimatedCounter.tsx`

```tsx
// Props: value, suffix?, label, duration? (default 2s), color?
// Triggers once via useInView (threshold 0.5)
// Uses requestAnimationFrame + ease-out-cubic for smooth count
// Cancels rAF on unmount (no memory leaks)
// Wraps in glass card with hover radial glow in counter colour
// Value rendered in Space Mono font
```

---

## Data — copy verbatim into `lib/data.ts`

```ts
// Personal
export const personal = {
  name:     'Kasope Abolade',
  alias:    'Karsh',
  title:    'Senior Frontend & AI-Enabled Software Engineer',
  tagline:  'Building scalable SaaS platforms, fintech systems, and AI-powered digital experiences.',
  email:    'aboladekasope@gmail.com',
  phone:    '(+234) 8132332011',
  location: 'Lagos, Nigeria',
  linkedin: 'https://linkedin.com/in/kasopeabolade',
  github:   'https://github.com/karshkodes2',
  gitlab:   'https://gitlab.com/kabolade',
} as const

// Stats
export const stats = [
  { label: 'Years Experience',    value: 8,  suffix: '+', color: '#2563EB' },
  { label: 'Projects Delivered',  value: 20, suffix: '+', color: '#D4AF37' },
  { label: 'Performance Boost',   value: 75, suffix: '%', color: '#059669' },
  { label: 'Test Coverage',       value: 80, suffix: '%', color: '#7C3AED' },
] as const

// Skills
export const skills = {
  Frontend: ['React', 'Next.js', 'TypeScript', 'JavaScript ES6+', 'Redux', 'Zustand', 'Recoil'],
  Mobile:   ['React Native', 'Flutter', 'Riverpod'],
  Backend:  ['Node.js', 'Express.js', 'REST APIs', 'WebSockets'],
  Database: ['MongoDB', 'PostgreSQL', 'Firebase'],
  DevOps:   ['AWS S3/EC2', 'Docker', 'GitLab CI/CD', 'GitHub Actions', 'AppCenter'],
  Testing:  ['Jest', 'React Testing Library', 'Playwright', 'Cypress'],
  AI:       ['AI-Assisted Workflows', 'Agent Orchestration', 'Sub-Agent Systems', 'Automation Pipelines'],
}

// Experience
export const experience = [
  {
    company:  'Solab Technologies',
    role:     'Frontend Developer',
    period:   'Jul 2019 – Present',
    location: 'Remote',
    color:    '#2563EB',
    highlights: [
      'Built end-to-end pharmaceutical supply chain including EPCIS 1.2 validation & automated PO matching engine, cutting processing time by 75%',
      'Engineered real-time environmental infraction reporting system for Lagos State, reducing accidents by 20%',
      'Built financial analysis tool with real-time currency exchange, increasing business profitability by 30%',
      'Achieved 80% code coverage with Jest, Playwright & Cypress, reducing bug incidence by 50%',
    ],
  },
  {
    company:  'SystemSpecs Technology',
    role:     'Senior Mobile Engineer',
    period:   'Oct 2021 – Feb 2025',
    location: 'VI, Lagos',
    color:    '#D4AF37',
    highlights: [
      'Developed reusable React Native & Flutter component libraries, reducing future dev time by 40%',
      'Architected wallet infrastructure with Service Aggregation Middleware using microfrontend principles',
      'Enhanced facial detection KYC feature ensuring security and regulatory compliance',
      'Increased user retention by 25% through data-driven UX improvements via analytics integration',
    ],
  },
  {
    company:  'VULTe by Polaris Bank',
    role:     'Frontend Web Developer',
    period:   'Dec 2023 – Feb 2024',
    location: 'Remote',
    color:    '#7C3AED',
    highlights: [
      'Developed AI-powered post-transaction recommendation engine using Next.js, boosting revenue by 10%',
      'Resolved critical production and UI issues, reducing downtime by 30%',
      'Conducted code reviews and security audits, reducing vulnerabilities significantly',
    ],
  },
  {
    company:  'SPOXIO',
    role:     'Frontend Web Developer',
    period:   'Dec 2021 – Sep 2023',
    location: 'Remote',
    color:    '#059669',
    highlights: [
      'Transformed core application interface with React — boosted performance 30%, DAU by 20%',
      'Implemented Redux for complex data flows with seamless backend integration',
      'Developed live-streaming and real-time chat features with Firebase, increasing engagement by 25%',
    ],
  },
  {
    company:  'Access Bank PLC',
    role:     'Graduate Trainee',
    period:   'Aug 2017 – Aug 2019',
    location: 'Lagos, Nigeria',
    color:    '#DC2626',
    highlights: [
      'Collaborated on testing and enhancing banking applications for reliability and security',
      'Led pre-internal audits across six zonal branches, maintaining 5-star ratings',
    ],
  },
]

// Static fallback projects (used if DB is empty)
export const STATIC_PROJECTS = [
  {
    id:          'availablerx',
    title:       'AvailableRX',
    subtitle:    'Medical Supply Chain ERP',
    description: 'End-to-end pharmaceutical supply chain workflow and warehouse management ERP with EPCIS 1.2 validation, SAP integration, and automated PO matching.',
    url:         'https://demo.availablerx.com',
    tags:        ['React', 'TypeScript', 'Node.js', 'SAP', 'EPCIS'],
    color:       '#2563EB',
    emoji:       '💊',
  },
  {
    id:          'pouchii',
    title:       'Pouchii',
    subtitle:    'Fintech Mobile App',
    description: 'Fintech mobile app for digital payments, peer-to-peer transfers, and social financial activities with KYC and wallet infrastructure.',
    url:         'https://pouchii.net/#/products',
    tags:        ['React Native', 'Flutter', 'Firebase', 'Fintech'],
    color:       '#D4AF37',
    emoji:       '💳',
  },
  {
    id:          'kiira',
    title:       'Kiira Health',
    subtitle:    "Women's Health Assistant",
    description: 'Women-centric health assistant to navigate health decisions, find clinicians, and manage appointments — combining AI with healthcare delivery.',
    url:         'https://www.kiira.io',
    tags:        ['React', 'Next.js', 'AI', 'Healthcare'],
    color:       '#EC4899',
    emoji:       '🩺',
  },
  {
    id:          'biwe',
    title:       'BIWE Magazine',
    subtitle:    'Digital Wellness Platform',
    description: 'Digital magazine platform for wellness content, podcasts, community engagement, and coaching with real-time features.',
    url:         'https://biwenetwork.com',
    tags:        ['Flutter', 'Firebase', 'WebSockets'],
    color:       '#7C3AED',
    emoji:       '📱',
  },
]
```

---

## `lib/projects.ts` — Server-side data fetching

```ts
// Import prisma from @karsh/db
// Import STATIC_PROJECTS from lib/data
//
// export async function getProjects(): Promise<ProjectDisplay[]>
// - Query: prisma.project.findMany({ orderBy: { createdAt: 'desc' } })
// - If result is empty, return STATIC_PROJECTS mapped to ProjectDisplay shape
// - Handle DB errors gracefully — catch, log, return STATIC_PROJECTS
// - Never throw — portfolio must never show an error page due to DB issues

// ProjectDisplay type:
export type ProjectDisplay = {
  id:          string
  title:       string
  subtitle?:   string
  description: string
  url?:        string
  tags:        string[]
  color:       string   // hex, assigned by index if from DB
  emoji:       string   // assigned by index if from DB
}
```

---

## Metadata spec (`lib/metadata.ts` + `app/layout.tsx`)

```ts
// Root metadata in app/layout.tsx:
export const metadata: Metadata = {
  title: {
    default:  'Kasope Abolade — Senior Frontend Engineer',
    template: '%s | Kasope Abolade',
  },
  description: 'Senior Frontend & AI-Enabled Software Engineer. Building scalable SaaS platforms, fintech systems, and AI-powered digital experiences. Lagos, Nigeria.',
  keywords:    ['React', 'Next.js', 'TypeScript', 'Flutter', 'React Native', 'Fintech', 'SaaS', 'Frontend Engineer', 'Lagos Nigeria', 'AI Engineering'],
  authors:     [{ name: 'Kasope Abolade', url: 'https://linkedin.com/in/kabolade' }],
  openGraph: {
    type:        'website',
    locale:      'en_US',
    title:       'Kasope Abolade — Senior Frontend Engineer',
    description: 'Building scalable SaaS platforms, fintech systems, and AI-powered digital experiences.',
    siteName:    'Kasope Abolade Portfolio',
    images:      [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Kasope Abolade' }],
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Kasope Abolade — Senior Frontend Engineer',
    description: 'Building scalable SaaS platforms, fintech systems, and AI-powered digital experiences.',
  },
  robots: {
    index:  true,
    follow: true,
  },
}
```

---

## `next.config.ts`

```ts
// Requirements:
// - Transpile @karsh/* workspace packages: transpilePackages
// - Set images.remotePatterns if any remote images used
// - Strict mode: true
// - Do NOT use experimental flags unless absolutely required
// - PoweredByHeader: false (security)
```

---

## `tailwind.config.ts`

```ts
// Requirements:
// - Extend @karsh/config/tailwind preset (import and spread)
// - Add fontFamily: { sora: ['var(--font-sora)', ...], mono: ['var(--font-mono)', ...] }
// - Content paths: './app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'
// - Dark mode: 'class' (or rely on the global dark body)
```

---

## `package.json` for the portfolio app

```json
{
  "name": "@karsh/portfolio",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev":   "next dev --port 3001",
    "build": "next build",
    "start": "next start --port 3001",
    "lint":  "next lint"
  },
  "dependencies": {
    "next":                  "15.x",
    "react":                 "19.x",
    "react-dom":             "19.x",
    "framer-motion":         "^12.0.0",
    "gsap":                  "^3.12.0",
    "react-intersection-observer": "^9.0.0",
    "@karsh/db":             "*",
    "@karsh/ui":             "*",
    "@karsh/utils":          "*",
    "@karsh/config":         "*"
  },
  "devDependencies": {
    "@types/node":  "^20",
    "@types/react": "^19",
    "typescript":   "^5",
    "tailwindcss":  "^4"
  }
}
```

---

## `tsconfig.json` for the portfolio app

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "plugins":  [{ "name": "next" }],
    "baseUrl":  ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

## Animation choreography

All timing references are from when the element first enters the viewport (or on mount for Hero).

| Element | Trigger | Animation | Duration | Delay |
|---------|---------|-----------|----------|-------|
| LoadingScreen logo | mount | scale 0→1, opacity 0→1 | 0.8s | 0.2s |
| LoadingScreen progress bar | mount | scaleX 0→1 | 1.4s | 0.4s |
| LoadingScreen exit | 1.8s after mount | opacity 1→0, scale 1→1.05 | 0.6s | — |
| Navbar | after loader exits | y -80→0 | 0.8s | 1.8s |
| Hero badge | after loader | opacity+y | 0.6s | 2.1s |
| Hero name letters | after loader | y 80→0, stagger 0.06s | 0.6s each | 2.3s+ |
| Hero tagline words | after loader | opacity+y, stagger 0.08s | 0.5s each | 3.2s+ |
| Hero CTAs | after loader | opacity+y | 0.6s | 3.8s |
| All other sections | scroll into view | fadeUpVariants | 0.7s | 0 |
| Stagger containers | scroll into view | children stagger 0.1–0.12s | — | — |
| Gold top border | mount | scaleX 0→1 | 1.2s | 2.0s |

---

## Quality gates

Before considering the implementation complete, verify all of the following:

### TypeScript
```bash
# From monorepo root:
npm run check-types
# Must produce zero errors
```

### Linting
```bash
npm run lint
# Must produce zero errors or warnings
```

### Build
```bash
npm run build:portfolio
# Must succeed with zero errors
# Check chunk sizes — no chunk should exceed 500 kB uncompressed
```

### Runtime checks
- [ ] `npm run dev:portfolio` starts without errors on port 3001
- [ ] All sections render correctly in Chrome, Firefox, Safari
- [ ] Mobile responsive at 375px, 768px, 1280px, 1440px
- [ ] Loading screen plays and exits cleanly
- [ ] Hero particle canvas renders and animates
- [ ] Agent network canvas renders and animates
- [ ] Timeline alternates left/right on desktop, stacks on mobile
- [ ] Project cards have visible tilt effect on hover
- [ ] Animated counters count up on first scroll into view
- [ ] Navbar collapses to hamburger on mobile and opens/closes correctly
- [ ] All external links open in new tab
- [ ] No console errors or warnings in production build

### Performance
- [ ] Lighthouse Performance ≥ 90 (desktop)
- [ ] LCP < 2.5s
- [ ] CLS = 0 (no layout shift from fonts — use `next/font` with `display: swap`)

---

## Implementation order

Follow this exact sequence to avoid dependency issues:

1. **`package.json`** — define dependencies first
2. **`tsconfig.json`** + **`next.config.ts`** + **`tailwind.config.ts`** + **`eslint.config.mjs`** — project configuration
3. **`app/globals.css`** — design tokens and utilities (everything depends on these CSS variables)
4. **`lib/data.ts`** — all static data constants
5. **`lib/projects.ts`** — server-side DB helper
6. **`lib/metadata.ts`** — shared metadata builder
7. **`hooks/useScrollAnimation.ts`** — most sections depend on this
8. **`hooks/useParallax.ts`**
9. **`hooks/useGsapTimeline.ts`**
10. **`components/ui/GlowButton.tsx`**
11. **`components/ui/SectionTitle.tsx`**
12. **`components/ui/AnimatedCounter.tsx`**
13. **`components/layout/Navbar.tsx`**
14. **`components/layout/Footer.tsx`**
15. **`components/sections/LoadingScreen.tsx`**
16. **`components/sections/Hero.tsx`**
17. **`components/sections/About.tsx`**
18. **`components/sections/TechStack.tsx`**
19. **`components/sections/Timeline.tsx`**
20. **`components/sections/Projects.tsx`**
21. **`components/sections/AIEngineering.tsx`**
22. **`components/sections/Stats.tsx`**
23. **`components/sections/Contact.tsx`**
24. **`app/layout.tsx`**
25. **`app/page.tsx`**
26. **`app/loading.tsx`**, **`app/not-found.tsx`**, **`app/sitemap.ts`**, **`app/robots.ts`**
27. **Run quality gates** — fix any errors before declaring done

---

## Common pitfalls — avoid these

| Pitfall | Correct approach |
|---------|-----------------|
| Using `useEffect` + `window` in RSC | Mark any component that uses browser APIs `'use client'` |
| Importing `@karsh/db` in a client component | Only import in Server Components or `lib/` server helpers |
| Framer Motion `variants` with array easing like `[0.25, 0.46, 0.45, 0.94]` | Use string easing: `'easeOut'`, `'backOut'` — FM v12 requires this |
| canvas elements without `'use client'` directive | Canvas animations must be in client components |
| `new Font()` via `<link>` tag | Always use `next/font/google` — prevents FOUT and improves CLS |
| Calling `gsap.registerPlugin()` at module level in SSR | Call inside `useEffect` or wrap in `if (typeof window !== 'undefined')` |
| Missing `'use client'` on hooks that use React state/effects | All three custom hooks need `'use client'` in the consuming component or be in client components |
| Hardcoding colours as hex in JSX | Always reference `var(--blue)`, `var(--gold)` etc. from CSS custom properties |
| Empty `<Suspense>` fallback | Always provide a skeleton fallback — never `fallback={null}` for visible sections |
| `<canvas>` width/height set via CSS only | Always set `canvas.width` and `canvas.height` to actual pixel dimensions via JS for correct HiDPI rendering |

---

## Done criteria

The implementation is complete when:

1. `npm run build:portfolio` succeeds with zero errors from the monorepo root
2. `npm run dev:portfolio` serves a fully functional site on `http://localhost:3001`
3. All quality gates above are green
4. The site looks premium, cinematic, and interactive — every section is implemented and animated
5. No section is stubbed, empty, or left as a placeholder
