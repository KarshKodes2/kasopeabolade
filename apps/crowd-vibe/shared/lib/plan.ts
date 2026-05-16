export type Plan = 'FREE' | 'STARTER' | 'PRO' | 'ENTERPRISE';

const PLAN_RANK: Record<Plan, number> = {
  FREE: 0,
  STARTER: 1,
  PRO: 2,
  ENTERPRISE: 3,
};

export const PLAN_FEATURES: Record<string, Plan> = {
  customDomain:    'STARTER',
  googleCalendar:  'STARTER',
  invoices:        'STARTER',
  eventsPage:      'FREE',
  pressKit:        'FREE',
  gallery:         'FREE',
  newsletter:      'STARTER',
  analytics:       'PRO',
  mediaUnlimited:  'PRO',
  whiteLabel:      'ENTERPRISE',
};

export function canAccess(tenantPlan: Plan, feature: keyof typeof PLAN_FEATURES): boolean {
  const required = PLAN_FEATURES[feature];
  return PLAN_RANK[tenantPlan] >= PLAN_RANK[required];
}

export const PLAN_LABELS: Record<Plan, string> = {
  FREE: 'Free',
  STARTER: 'Starter',
  PRO: 'Pro',
  ENTERPRISE: 'Enterprise',
};

export const PLAN_PRICES: Record<Plan, string> = {
  FREE: '₦0',
  STARTER: '₦15,000/mo',
  PRO: '₦35,000/mo',
  ENTERPRISE: 'Custom',
};

export const STRIPE_PRICE_IDS: Partial<Record<Plan, string>> = {
  STARTER: process.env.STRIPE_PRICE_STARTER ?? '',
  PRO: process.env.STRIPE_PRICE_PRO ?? '',
};
