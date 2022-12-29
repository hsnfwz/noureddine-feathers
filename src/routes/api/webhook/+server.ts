import { json } from '@sveltejs/kit';
import Stripe from 'stripe';

// env
import { STRIPE_WEBHOOK_SECRET, STRIPE_SECRET_KEY } from '$env/static/private';

export async function POST({ request }: any) {
  try {
    const buf = await request.text();
    const sig = request.headers.get('stripe-signature');
    const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' });
    const webhookSecret: string = STRIPE_WEBHOOK_SECRET;
    const event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret);

    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;

        console.log(session);

        // Then define and call a function to handle this event

        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    
    return json({});
  } catch (error) {
    console.log('[webhook: error]', error);
    return json({});
  }
}