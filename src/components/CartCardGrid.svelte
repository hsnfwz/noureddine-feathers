<script lang="ts">
  import { onMount } from 'svelte';

  // components
  import CartCard from 'components/CartCard.svelte';
  import Heading from 'components/shared/Heading.svelte';
  import Link from 'components/shared/Link.svelte';
  import Button from 'components/shared/Button.svelte';
  import VisaIcon from 'components/icons/VisaIcon.svelte';
  import MastercardIcon from 'components/icons/MastercardIcon.svelte';

  // types
  import type CartProductType from 'types/CartProductType';

  // utils
  import { formatCurrency } from 'utils/helpers';

  // config
  import getStripe from 'config/stripe';

  // store
  import { cart } from 'stores/CartStore';

  // state
  // let promoCode: string = '';

  onMount(() => {
    /* 
      Handle redirect back from Checkout
      Show a message to your customer when they’re redirected back to your page. Wait to fulfill orders (for example, shipping or sending email receipts) until the payment succeeds. Because some payments can take minutes or even days to process, set up a webhook to listen for a payment_intent.succeeded event to reliably know when the payment succeeds. Learn more about fulfilling orders with Checkout.
    */

    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get('success')) console.log('Order placed! You will receive an email confirmation.');

    if (query.get('canceled')) console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
  });

  const checkout = async () => {
    try {    
      const lineItems = $cart.cartItems.map((cartProduct: CartProductType) => {
        return {
          price: cartProduct.stripe_price_id,
          quantity: cartProduct.cart_product_quantity,
        }
      });

      let discounts = undefined;
      
      // if (promoCode) discounts = [{ coupon: promoCode }];

      const body = {
        lineItems,
        discounts,
      };

      const response = await fetch('/api/checkout-sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      // TODO: show loading here (as well as other places)
      // Redirect to Checkout.
      const stripe = await getStripe();
      const { error } = await stripe!.redirectToCheckout({
        // Make the id field from the Checkout Session creation API response
        // available to this file, so you can provide it as parameter here
        // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
        sessionId: data.id,
      });
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `error.message`.
      console.warn(error.message);
    } catch (error) {
      console.log(error);
    }
  }
</script>

{#if $cart.cartItems.length === 0}
  <div class="flex flex-col justify-center items-center gap-8">
    <Heading text="Your cart is empty." />
    <Link href="/" ariaLabel="continue shopping" text="Continue Shopping" />
  </div>
{/if}

{#if $cart.cartItems.length > 0}
  <div class="flex justify-center items-center">
    <div class="flex flex-col lg:flex-row gap-8">
      <div class="flex flex-col gap-4">
        <Heading text="Cart" bold={true} uppercase={true} />
        <div class="flex flex-col gap-4">
          {#each $cart.cartItems as item, index}
            <CartCard cartProduct={item} cartProductIndex={index} />
          {/each}
        </div>
      </div>
      <div class="flex flex-col gap-4 flex-grow">
        <Heading text="Order Summary" bold={true} uppercase={true} />
        <p>{$cart.cartTotalItems} ITEMS</p>
        <div class="flex gap-2">
          <p class="font-bold flex-grow">
            ORDER SUBTOTAL
          </p>
          <p class="font-bold">
            {formatCurrency($cart.cartTotalPrice)}
          </p>
        </div>
        <!-- <div class="flex flex-col gap-2">
          <label htmlFor="promo-code">
            Promo Code
          </label>
          <input
            id="promo-code"
            type="text"
            placeholder="Enter promo code"
            value={promoCode}
            onChange={(e: any) => setPromoCode(e.target.value)}
            class="p-2 border-2 border-gray-100 rounded-sm box-border"
          />
        </div> -->
        <p class="text-gray-500">Shipping, taxes, and discounts calculated at checkout</p>
        <Button
          text="Checkout"
          uppercase={true}
          onClick={async () => await checkout()}
          buttonColor="bg-green-500"
        />
        <div class="flex gap-2 justify-center items-center">
          <div class="flex w-12">
            <VisaIcon />
          </div>
          <div class="flex w-12">
            <MastercardIcon />
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}