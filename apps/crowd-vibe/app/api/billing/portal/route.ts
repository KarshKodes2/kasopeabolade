import { auth } from '@/shared/lib/auth';
import { prisma } from 'db';
import Stripe from 'stripe';
import { redirect } from 'next/navigation';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST() {
  const session = await auth();
  if (!session?.user?.tenantId) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const sub = await prisma.subscription.findFirst({ where: { tenantId: session.user.tenantId } });
  if (!sub?.stripeCustomerId) return Response.json({ error: 'No Stripe customer' }, { status: 400 });

  const portal = await stripe.billingPortal.sessions.create({
    customer: sub.stripeCustomerId,
    return_url: `${process.env.NEXTAUTH_URL}/dashboard/billing`,
  });

  redirect(portal.url);
}
