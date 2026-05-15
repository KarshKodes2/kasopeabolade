export type PaymentMethod = 'paystack' | 'stripe';

export interface PaymentIntent {
  clientSecret: string;
  amount: number;
  currency: string;
}

export interface PaystackSession {
  authorizationUrl: string;
  reference: string;
}
