# Portfolio App — Claude Context

Kasope Abolade's public developer portfolio at `kasope.dev`. Built with a premium dark-SaaS aesthetic, 6-theme system, GSAP particle canvas, and Framer Motion animations.

## Overview

| Property | Value |
| -------- | ----- |
| **App** | portfolio |
| **Path** | `apps/portfolio/` |
| **Port** | 3002 (dev) |
| **URL** | kasope.dev |
| **Framework** | Next.js 15 (App Router) |
| **Auth** | None (public site) |

## Design System

- **Fonts**: DM Sans (body/UI) + DM Serif Display (headings) via `next/font/google`
- **Themes**: 6 themes (Light, Dark, Forest, Ocean, Rose, Slate) — CSS custom properties on `<html data-theme>`
- **Animation**: Framer Motion 12 for UI transitions/reveals; GSAP 3 + ScrollTrigger for canvas animations

## Features

- Hero with particle canvas (GSAP canvas animation) + letter-by-letter name reveal
- About, TechStack, Timeline, Projects (3D tilt cards), AIEngineering canvas, Stats, Blog preview, Newsletter, Contact sections
- Blog listing + individual posts sourced from `Post` model (`context=PORTFOLIO`)
- Resources page (static curated list)
- Contact form → `Lead` record in DB (`source='portfolio'`)
- Client-side search across projects, posts, resources
- 6-theme switcher in navbar (persisted via localStorage)

## Commands

```bash
npm run dev:portfolio     # → http://localhost:3002
npm run build:portfolio
```

## Structure

```text
apps/portfolio/
├── app/
│   ├── layout.tsx         # Root layout: fonts, ThemeProvider, Navbar, Footer
│   ├── globals.css        # Design tokens + 6-theme CSS vars
│   ├── page.tsx           # Home — composes all sections
│   ├── loading.tsx
│   ├── not-found.tsx
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── blog/page.tsx      # Post listing (context=PORTFOLIO)
│   ├── blog/[slug]/page.tsx
│   ├── contact/page.tsx
│   ├── resources/page.tsx
│   └── search/page.tsx
├── components/
│   ├── layout/Navbar.tsx  # Theme switcher, mobile drawer
│   ├── layout/Footer.tsx
│   └── sections/          # Hero, About, TechStack, Timeline, Projects,
│                          # AIEngineering, Stats, Blog, Newsletter, Contact
├── hooks/
│   ├── useScrollAnimation.ts   # IntersectionObserver + Framer Motion
│   ├── useGsapTimeline.ts      # GSAP context + ScrollTrigger
│   └── useParallax.ts          # Mouse parallax + card tilt
├── lib/
│   ├── data.ts            # Static data (personal info, skills, experience, projects)
│   ├── projects.ts        # Server-side DB helper (falls back to static STATIC_PROJECTS)
│   └── metadata.ts        # Shared OG metadata builder
├── tailwind.config.ts
└── package.json
```

## Data Sources

```typescript
// Server component — projects from DB, falls back to static
import { getProjects } from '@/lib/projects';

// Direct import — blog posts
import { prisma } from 'db';
const posts = await prisma.post.findMany({
  where: { context: 'PORTFOLIO', published: true },
  orderBy: { publishedAt: 'desc' },
});
```

## Theme System

ThemeProvider (client component in layout) reads `localStorage.getItem('theme')` on mount and sets `document.documentElement.dataset.theme`. CSS custom properties cascade from `[data-theme="dark"]` etc. selectors in `globals.css`.

## Animation Patterns

- **Framer Motion**: `useScrollAnimation` hook → `fadeUpVariants`, `staggerContainerVariants` for section reveals
- **GSAP canvas**: `useGsapTimeline` hook → Hero particle canvas + AIEngineering agent-network canvas
- **Card tilt**: `useTilt` from `useParallax` → spring physics 3D perspective on project cards

## Dependencies

```typescript
// Database (read: projects, posts; write: leads, newsletter)
import { prisma } from 'db';

// Validation
import { LeadSchema } from 'utils/validation';
```

## Environment Variables

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/karsh
```

## Related

- [Root CLAUDE.md](../../CLAUDE.md)
- [Database Package](../../packages/db/)
- [Admin Dashboard](../admin/) — manage projects and blog posts
