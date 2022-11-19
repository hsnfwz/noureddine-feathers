import Stripe from 'stripe';

export const post = async ({ request }) => {
  if (request.headers.get('Content-Type') === 'application/json') {
    try {
      // LOOK INTO PRODUCTS, PRICES, and INVOICES on Stripe
      // what we can do is use the stripe API to update/add/remove products/prices. so, anytime we want to make modifications on our website, we will call the database AND stripe so that both get updated with the same data at once!
      
      const body = await request.json();

      const { lineItems, discounts } = body;

      const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY);

      const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        payment_method_types: ['card'],
        // discounts: discounts,
        // change these two to pages that show success/canceled payment pages
        success_url: `${request.headers.get('Origin')}/payment-completed`,
        cancel_url: `${request.headers.get('Origin')}/payment-cancelled`,
      });

      return new Response(JSON.stringify({ id: session.id }), { status: 200 });
    } catch (error) {
      console.log('[STRIPE: ERROR]', error);
      return new Response(null, { status: 500 });
    }
  }
  return new Response(null, { status: 400 });
}