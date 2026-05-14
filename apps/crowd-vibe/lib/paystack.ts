const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY!;
const BASE_URL = 'https://api.paystack.co';

interface InitiatePaymentParams {
  email: string;
  amount: number; // in Kobo (multiply NGN by 100)
  reference: string;
  callbackUrl: string;
  metadata?: Record<string, unknown>;
}

interface InitiatePaymentResult {
  authorizationUrl: string;
  accessCode: string;
  reference: string;
}

export async function initiatePayment(params: InitiatePaymentParams): Promise<InitiatePaymentResult> {
  const res = await fetch(`${BASE_URL}/transaction/initialize`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: params.email,
      amount: params.amount,
      reference: params.reference,
      callback_url: params.callbackUrl,
      metadata: params.metadata,
    }),
  });

  const data = (await res.json()) as {
    status: boolean;
    data: { authorization_url: string; access_code: string; reference: string };
  };

  if (!data.status) throw new Error('Paystack initiation failed');

  return {
    authorizationUrl: data.data.authorization_url,
    accessCode: data.data.access_code,
    reference: data.data.reference,
  };
}

export async function verifyPayment(reference: string): Promise<{ paid: boolean; amount: number }> {
  const res = await fetch(`${BASE_URL}/transaction/verify/${reference}`, {
    headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` },
  });

  const data = (await res.json()) as {
    status: boolean;
    data: { status: string; amount: number };
  };

  return {
    paid: data.data.status === 'success',
    amount: data.data.amount / 100, // convert Kobo back to NGN
  };
}
