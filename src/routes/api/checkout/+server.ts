import { json } from '@sveltejs/kit';
import Stripe from 'stripe';

// env
import { STRIPE_SECRET_KEY } from '$env/static/private';

export async function POST({ request }) {
  try {
    // LOOK INTO PRODUCTS, PRICES, and INVOICES on Stripe
    // what we can do is use the stripe API to update/add/remove products/prices. so, anytime we want to make modifications on our website, we will call the database AND stripe so that both get updated with the same data at once!
    
    const { lineItems, discounts } = await request.json();

    const stripe = new Stripe(STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      payment_method_types: ['card'],
      // discounts: discounts,
      // change these two to pages that show success/canceled payment pages
      success_url: `${request.headers.get('Origin')}/payment-success`,
      cancel_url: `${request.headers.get('Origin')}/payment-cancel`,
    });

    return json({ id: session.id });
  } catch (error) {
    console.log('[stripe: error]', error);
    return json({});
  }
}