import { json } from '@sveltejs/kit';
import Stripe from 'stripe';

// env
import { STRIPE_SECRET_KEY } from '$env/static/private';

        // todo:
        /* 
          - how to make orders over 600 (subtotal) free shipping? answer: figure it out bud
        */

export async function POST({ request }: any) {
  try {
    const { profileId, lineItems } = await request.json();

    const shippingOptions = lineItems.map((lineItem: any) => {
      return { shipping_rate: lineItem.stripe_shipping_rate_id };
    });

    const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' });

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      payment_method_types: ['card'],
      shipping_address_collection: {allowed_countries: ['CA', 'US']},
      shipping_options: shippingOptions,
      metadata: { profileId },
      success_url: `${request.headers.get('Origin')}/payment-success`,
      cancel_url: `${request.headers.get('Origin')}/payment-cancel`,
    });

    return json({ id: session.id });
  } catch (error) {
    console.log('[checkout: error]', error);
    return json({});
  }
}