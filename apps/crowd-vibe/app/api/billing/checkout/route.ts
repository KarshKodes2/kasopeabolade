export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/shared/lib/auth';
import { prisma } from '@/shared/lib/prisma';
import { stripe } from '@/shared/lib/stripe';
import { STRIPE_PRICE_IDS, type Plan } from '@/shared/lib/plan';

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.tenantId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { plan } = (await req.json().catch(() => ({}))) as { plan?: string };
  const targetPlan = (req.nextUrl.searchParams.get('plan') ?? plan) as Plan;
  const priceId = STRIPE_PRICE_IDS[targetPlan];

  if (!priceId) {
    return NextResponse.json({ error: `No Stripe price configured for plan: ${targetPlan}` }, { status: 400 });
  }

  const tenant = await prisma.tenant.findUnique({
    where: { id: session.user.tenantId },
    include: { subscriptions: { take: 1, orderBy: { createdAt: 'desc' } } },
  });
  if (!tenant) return NextResponse.json({ error: 'Tenant not found' }, { status: 404 });

  const existingCustomerId = tenant.subscriptions[0]?.stripeCustomerId;

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    ...(existingCustomerId ? { customer: existingCustomerId } : { customer_email: session.user.email ?? undefined }),
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing?upgraded=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing`,
    metadata: { tenantId: tenant.id, plan: targetPlan },
    subscription_data: { metadata: { tenantId: tenant.id, plan: targetPlan } },
  });

  return NextResponse.redirect(checkoutSession.url!, 303);
}
