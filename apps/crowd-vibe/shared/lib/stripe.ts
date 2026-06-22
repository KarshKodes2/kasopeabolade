import Stripe from 'stripe';

let _stripe: Stripe | undefined;
function getInstance(): Stripe {
  _stripe ??= new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-02-24.acacia' });
  return _stripe;
}

export const stripe: Stripe = new Proxy({} as Stripe, {
  get(_target, prop: string | symbol) {
    const client = getInstance();
    const val = (client as unknown as Record<string | symbol, unknown>)[prop];
    return typeof val === 'function' ? (val as Function).bind(client) : val;
  },
});

export async function createPaymentIntent(amount: number, currency = 'usd', metadata?: Stripe.MetadataParam) {
  return getInstance().paymentIntents.create({
    amount: Math.round(amount * 100),
    currency,
    automatic_payment_methods: { enabled: true },
    metadata,
  });
}
