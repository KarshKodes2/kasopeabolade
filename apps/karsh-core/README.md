# Karsh Core Solutions

Corporate website for Karsh Core Solutions featuring products, services, and a tech blog.

## Features

- Products and services showcase
- Tech blog with markdown support
- Contact and consultation forms
- Company information
- SEO-optimized pages

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4
- **Database**: Prisma + PostgreSQL
- **Language**: TypeScript 5

## Getting Started

### Prerequisites

Ensure the monorepo is set up:

```bash
# From root directory
npm install
npm run start:db
npm run db:sync
```

### Development

```bash
# From root directory
npm run dev:karsh-core

# Or from this directory
npm run dev
```

The app will be available at `http://localhost:3000`.

### Build

```bash
# From root directory
npm run build:karsh-core

# Or from this directory
npm run build
```

## Project Structure

```text
apps/karsh-core/
├── app/
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   ├── globals.css     # Global styles
│   ├── services/       # Services pages
│   ├── products/       # Products pages
│   ├── blog/           # Tech blog
│   └── contact/        # Contact page
├── public/             # Static assets
├── next.config.ts      # Next.js configuration
├── tsconfig.json       # TypeScript configuration
└── package.json
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home page with company overview |
| `/services` | Services offered |
| `/products` | Products showcase |
| `/blog` | Tech blog |
| `/blog/[slug]` | Individual blog post |
| `/about` | About the company |
| `/contact` | Contact and consultation form |

## Content Management

Content can be managed through:

1. **Markdown files** - For blog posts
2. **Database** - Via Admin dashboard
3. **CMS integration** - Planned for future

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |

## SEO

The site is optimized for search engines with:

- Semantic HTML structure
- Open Graph meta tags
- Structured data (JSON-LD)
- Sitemap generation
- robots.txt

## Related

- [Root README](../../README.md)
- [Database Package](../../packages/db/README.md)
- [UI Components](../../packages/ui/README.md)
