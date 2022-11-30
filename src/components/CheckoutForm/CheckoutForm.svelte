<script lang="ts">
  // components
  import Button from '$components/Button/Button.svelte';

  // helpers
  import { formatCurrency } from '$helpers/helpers';

  // interfaces
  import type I_CartItem from '$interfaces/I_CartItem';

  // config
  import getStripe from '$config/stripe';

  // store
  import { cart } from '$stores/CartStore';

  // state
  // let promoCode: string = '';
  let isLoadingCheckout: boolean = false;
  let checkoutErrorMessage: string = '';

  const checkout = async () => {
    try {
      isLoadingCheckout = true;

      const lineItems = $cart.cartItems.map((cartItem: I_CartItem) => {
        return {
          price: cartItem.stripe_price_id,
          quantity: cartItem.cart_item_quantity,
        }
      });

      let discounts = undefined;
      
      // if (promoCode) discounts = [{ coupon: promoCode }];

      const body = {
        lineItems,
        discounts,
      };

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      // Redirect to Checkout.
      const stripe = await getStripe();
      const { error } = await stripe!.redirectToCheckout({ sessionId: data.id });

      if (error && error.message) checkoutErrorMessage = error.message;

      isLoadingCheckout = false;
    } catch (error) {
      console.log(error);
    }
  }
</script>

<div class="flex flex-col gap-4 flex-grow">
  <p>{$cart.cartTotalItems} ITEMS</p>
  <div class="flex gap-2">
    <p class="nf-font-bold flex-grow">
      ORDER SUBTOTAL
    </p>
    <p class="nf-font-bold">
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
    customClass="uppercase bg-green-500 text-white p-2"
    handleClick={async () => await checkout()}
    disabled={$cart.cartTotalItems === 0 || isLoadingCheckout}
  >
    <span>Checkout</span>
  </Button>
  {#if isLoadingCheckout}
    <div class="flex justify-center uppercase p-2">
      <p>Redirecting to Checkout...</p>
    </div>
  {/if}
  {#if checkoutErrorMessage !== ''}
    <p class="text-rose-500">*{checkoutErrorMessage}</p>
  {/if}
</div>