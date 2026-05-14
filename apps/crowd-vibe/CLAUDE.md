# DJ Karsh App - Claude Context

Entertainment booking platform and portfolio for DJ Karsh.

## Overview

| Property | Value |
|----------|-------|
| **App** | dj-karsh |
| **Path** | `apps/dj-karsh/` |
| **Port** | 3003 (dev) |
| **Framework** | Next.js 15 (App Router) |
| **Auth** | Optional (for booking status) |

## Features

- Event booking system
- Media gallery
- 3D interactive homepage (planned)
- Blog and news
- Contact forms
- Cloudinary media uploads

## Planned Technologies

| Tech | Purpose |
|------|---------|
| React Three Fiber | 3D graphics |
| Drei | R3F helpers |
| Framer Motion | Animations |
| Cloudinary | Media storage |

## Commands

```bash
# Development
npm run dev:dj-karsh

# Build
npm run build:dj-karsh

# Lint
npm run lint:dj-karsh
```

## Structure

```
apps/dj-karsh/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home (3D scene)
│   ├── globals.css      # Styles
│   ├── bookings/        # Booking flow
│   │   ├── page.tsx     # Booking form
│   │   └── [id]/        # Booking confirmation
│   ├── gallery/         # Media gallery
│   ├── blog/            # Blog pages
│   ├── about/           # About DJ Karsh
│   └── contact/         # Contact form
├── components/
│   ├── 3d/              # Three.js components
│   └── ui/              # UI components
├── lib/                 # Utilities
└── public/              # Static assets
```

## Pages

| Route | Description | Type |
|-------|-------------|------|
| `/` | 3D interactive home | Dynamic |
| `/bookings` | Booking form | Dynamic |
| `/bookings/[id]` | Confirmation | Dynamic |
| `/gallery` | Media gallery | Dynamic |
| `/blog` | Blog listing | Dynamic |
| `/blog/[slug]` | Blog post | Dynamic |
| `/about` | About page | Static |
| `/contact` | Contact form | Dynamic |

## Booking System

### Flow

```
1. User selects date/event type
2. User fills event details
3. System validates availability
4. Booking created (pending)
5. Confirmation email sent
6. Admin reviews in admin app
7. Booking confirmed/rejected
```

### Booking Schema

```typescript
interface Booking {
  id: string;
  eventDate: Date;
  clientName: string;
  clientEmail: string;
  eventType: string;
  venue: string;
  status: 'pending' | 'confirmed' | 'rejected';
  notes?: string;
}
```

## Dependencies

```typescript
// Database
import { prisma } from '@karsh/db';

// UI Components
import { Button, Card, Form } from '@karsh/ui';

// 3D (planned)
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
```

## 3D Scene Pattern (Planned)

```typescript
'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';

export function Scene() {
  return (
    <Canvas>
      <OrbitControls />
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      {/* 3D content */}
    </Canvas>
  );
}
```

## Environment Variables

```env
DATABASE_URL=
CLOUDINARY_URL=
```

## Performance Considerations

- Lazy load 3D components
- Use Suspense boundaries
- Optimize textures/models
- Progressive loading

## Related

- [Root CLAUDE.md](../../CLAUDE.md)
- [Admin Dashboard](../admin/) - Booking management
- [Database Package](../../packages/db/)
