export const ROUTES = {
  HOME: '/',
  PRICING: '/pricing',
  AUTH: {
    SIGNIN: '/auth/signin',
    SIGNUP: '/auth/signup',
  },
  DASHBOARD: '/dashboard',
  BOOKINGS: '/bookings',
  MEDIA: '/media',
  SETTINGS: '/settings',
  BILLING: '/billing',
  SITE: (slug: string) => `/site/${slug}`,
  BOOK: (slug: string) => `/site/${slug}/book`,
} as const;
