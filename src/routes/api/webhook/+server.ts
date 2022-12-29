import { json } from '@sveltejs/kit';
import Stripe from 'stripe';

// env
import { STRIPE_WEBHOOK_SECRET, STRIPE_SECRET_KEY } from '$env/static/private';
import supabase from '$config/supabase';

export async function POST({ request }: any) {
  try {
    const buf = await request.text();
    const sig = request.headers.get('stripe-signature');
    const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' });
    const webhookSecret: string = STRIPE_WEBHOOK_SECRET;
    const event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret);

    if (event.type === 'checkout.session.completed') {
      const session: any = event.data.object;
      const sessionWithLineItems: any = await stripe.checkout.sessions.retrieve(session.id, { expand: ['line_items'] });

      console.log('profile id', sessionWithLineItems.metadata?.profileId);
      console.log('payment intent', sessionWithLineItems.payment_intent);
      console.log('lineItems', sessionWithLineItems.line_items);

      // todo: TABLES

      // order
      /* 
        stripe_payment_intent_id
        profile_id (ref to profile)
      */

      // order_product:
      /* 
        order_id (ref key to order)
        product_stripe_product_id (ref key to product)
        product_price_stripe_price_id (ref key to product_price)
        profile_id (ref to profile)
      */

      return json({ id: sessionWithLineItems.id });
    }

    return json({});
  } catch (error) {
    console.log('[webhook: error]', error);
    return json({});
  }
}