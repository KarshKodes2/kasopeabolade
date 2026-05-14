# DJ Karsh

Entertainment booking platform and portfolio for DJ Karsh featuring a 3D interactive experience.

## Features

- 3D interactive homepage (planned)
- Event booking system
- Media gallery
- Blog and news
- Contact and inquiry forms
- Cloudinary/S3 media uploads

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4
- **3D Graphics**: React Three Fiber, Drei (planned)
- **Animation**: Framer Motion (planned)
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
npm run dev:dj-karsh

# Or from this directory
npm run dev
```

The app will be available at `http://localhost:3000`.

### Build

```bash
# From root directory
npm run build:dj-karsh

# Or from this directory
npm run build
```

## Project Structure

```text
apps/dj-karsh/
├── app/
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page with 3D scene
│   ├── globals.css     # Global styles
│   ├── bookings/       # Booking pages
│   ├── gallery/        # Media gallery
│   └── blog/           # Blog pages
├── components/
│   ├── 3d/             # Three.js components
│   └── ui/             # UI components
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
| `/` | Home with 3D interactive experience |
| `/bookings` | Event booking form |
| `/bookings/[id]` | Booking confirmation |
| `/gallery` | Media gallery |
| `/blog` | Blog and news |
| `/about` | About DJ Karsh |
| `/contact` | Contact form |

## Booking System

The booking system allows users to:

1. Select event date and type
2. Provide event details
3. Submit booking request
4. Receive confirmation

Bookings are stored in the database and managed via the Admin dashboard.

## 3D Features (Planned)

- Interactive 3D scene with React Three Fiber
- Custom shaders and effects
- Responsive 3D elements
- Performance optimized for mobile

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `CLOUDINARY_URL` | Cloudinary API URL (for media uploads) |

## CI/CD

GitHub Actions workflow runs on push to `apps/dj-karsh/**`:

- Lint checking
- Production build

## Related

- [Root README](../../README.md)
- [Admin Dashboard](../admin/README.md) - For managing bookings
- [Database Package](../../packages/db/README.md)
