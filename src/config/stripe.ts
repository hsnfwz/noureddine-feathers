import type { Stripe } from '@stripe/stripe-js';
import { loadStripe } from '@stripe/stripe-js/pure';

let stripePromise: Promise<Stripe | null>;

const getStripe = () => {
  if (!stripePromise) stripePromise = loadStripe(import.meta.env.PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  return stripePromise;
};

export default getStripe;