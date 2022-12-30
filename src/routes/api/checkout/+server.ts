import { json } from '@sveltejs/kit';
import Stripe from 'stripe';

// env
import { STRIPE_SECRET_KEY } from '$env/static/private';

export async function POST({ request }: any) {
  try {
    const { profileId, lineItems } = await request.json();

    const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' });

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      payment_method_types: ['card'],
      shipping_address_collection: {allowed_countries: ['CA']},
      custom_text: {
        shipping_address: {
          message: 'Estimated shipping time is 3 days.',
        },
      },
      // billing_address_collection: {allowed_countries: ['CA']}, // todo: look into this in relation to collecting taxes
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