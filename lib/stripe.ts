import { loadStripe } from '@stripe/stripe-js';
import Stripe from 'stripe';

export const getStripe = async () => {
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;
  const stripePromise = loadStripe(publishableKey);
  return stripePromise;
};

export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY!,
  {
    apiVersion: '2025-03-31.basil', // 最新のAPIバージョンを使用
  }
);
