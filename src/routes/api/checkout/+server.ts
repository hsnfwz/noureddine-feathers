import { json } from "@sveltejs/kit";
import Stripe from "stripe";

// env
import { STRIPE_SECRET_KEY } from "$env/static/private";

// api
import { getProductPricesByIds } from "$api/product";

export async function POST({ request }: any) {
  try {
    const { userProfileId, products } = await request.json();

    const productPriceIds: number[] = products.map(
      (product: any) => product.productPriceId
    );

    const productPrices: any[] = await getProductPricesByIds(productPriceIds);

    let lineItems: any[] = [];
    let orderCost = 0;
    let shippingCost = 0;

    let i = 0;
    while (i < products.length) {
      const product: any = products[i];
      const productPrice: any = productPrices.find(
        (productPrice: any) => productPrice.id === product.productPriceId
      );

      const lineItem: any = {
        price: productPrice.stripe_price_id,
        tax_rates: productPrice.stripe_tax_rate_ids,
        quantity: product.quantity,
      };

      lineItems.push(lineItem);

      orderCost = orderCost + productPrice.price * product.quantity;
      shippingCost =
        shippingCost + productPrice.shipping_fee * product.quantity;

      i++;
    }

    // orders above $600 have free shipping
    if (orderCost > 600) shippingCost = 0;

    const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: "2022-11-15" });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      shipping_address_collection: { allowed_countries: ["CA", "US"] },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: shippingCost * 100, currency: "cad" },
            display_name:
              shippingCost > 0 ? "Standard shipping" : "Free shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 7 },
              maximum: { unit: "business_day", value: 10 },
            },
          },
        },
      ],
      line_items: lineItems,
      metadata: { userProfileId },
      success_url: `${request.headers.get("Origin")}/payment-success`,
      cancel_url: `${request.headers.get("Origin")}/payment-cancel`,
    });

    return json({ id: session.id });
  } catch (error) {
    console.log("[checkout: error]", error);
    return json({});
  }
}
