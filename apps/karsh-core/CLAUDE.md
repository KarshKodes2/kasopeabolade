# Karsh Core App - Claude Context

Corporate website for Karsh Core Solutions.

## Overview

| Property | Value |
|----------|-------|
| **App** | karsh-core |
| **Path** | `apps/karsh-core/` |
| **Port** | 3000 (dev) |
| **Framework** | Next.js 15 (App Router) |
| **Auth** | None (public) |

## Features

- Products and services showcase
- Tech blog with markdown support
- Contact and consultation forms
- Company information
- SEO-optimized pages

## Commands

```bash
# Development
npm run dev:karsh-core

# Build
npm run build:karsh-core

# Lint
npm run lint -- --filter=karsh-core
```

## Structure

```
apps/karsh-core/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   ├── globals.css      # Styles
│   ├── services/        # Services pages
│   ├── products/        # Products pages
│   ├── blog/            # Tech blog
│   │   ├── page.tsx     # Blog list
│   │   └── [slug]/      # Blog post
│   ├── about/           # About company
│   └── contact/         # Contact form
├── components/          # App components
├── content/             # Markdown content
│   └── blog/            # Blog posts
├── lib/                 # Utilities
└── public/              # Static assets
```

## Pages

| Route | Description | Type |
|-------|-------------|------|
| `/` | Home page | Static |
| `/services` | Services offered | Static |
| `/products` | Products showcase | Static |
| `/blog` | Tech blog | Dynamic |
| `/blog/[slug]` | Blog post | Dynamic |
| `/about` | About company | Static |
| `/contact` | Contact form | Dynamic |

## Content Management

### Markdown Blog

Blog posts can be written in Markdown:

```
content/blog/
├── my-first-post.md
├── another-post.md
└── tech-insights.md
```

### Frontmatter

```markdown
---
title: "Post Title"
date: "2025-01-15"
author: "Author Name"
tags: ["tech", "web"]
excerpt: "Brief description"
---

# Post content here...
```

## Dependencies

```typescript
// Database (optional, for dynamic content)
import { prisma } from '@karsh/db';

// UI Components
import { Card, Button } from '@karsh/ui';
```

## Contact Form Pattern

```typescript
'use client';

import { useState } from 'react';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    setStatus(res.ok ? 'success' : 'error');
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
    </form>
  );
}
```

## SEO Configuration

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: {
    default: 'Karsh Core Solutions',
    template: '%s | Karsh Core',
  },
  description: 'Professional solutions for your business.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Karsh Core Solutions',
  },
};
```

## Environment Variables

```env
DATABASE_URL=
```

## Performance Goals

| Metric | Target |
|--------|--------|
| LCP | < 2.5s |
| FID | < 100ms |
| CLS | < 0.1 |
| Lighthouse | > 90 |

## Related

- [Root CLAUDE.md](../../CLAUDE.md)
- [Database Package](../../packages/db/)
- [UI Components](../../packages/ui/)
