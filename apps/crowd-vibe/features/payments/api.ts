import type { PaymentIntent, PaystackSession } from './types';

export async function initiatePaystackPayment(params: {
  bookingId: string;
  email: string;
  amount: number;
}): Promise<PaystackSession> {
  const res = await fetch('/api/payments/paystack', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  if (!res.ok) throw new Error('Paystack initiation failed');
  return res.json() as Promise<PaystackSession>;
}

export async function createStripeIntent(params: {
  bookingId: string;
  amount: number;
}): Promise<PaymentIntent> {
  const res = await fetch('/api/payments/stripe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  if (!res.ok) throw new Error('Stripe intent creation failed');
  return res.json() as Promise<PaymentIntent>;
}
