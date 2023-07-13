<!-- @format -->
<script lang="ts">
  import { page } from '$app/stores';

  // components
  import CartCard from '$components/CartCard/CartCard.svelte';
  import Heading from '$components/Heading/Heading.svelte';

  // helpers
  import { formatCurrency } from '$helpers/helpers';

  // config
  import getStripe from '$config/stripe';

  // store
  import { cart } from '$stores/CartStore';

  // state
  let isLoadingCheckout: boolean = false;
  let checkoutErrorMessage: string = '';

  const checkout = async () => {
    try {
      isLoadingCheckout = true;

      const products: any = $cart.cartItems.map((cartItem: any) => {
        return {
          productPriceId: cartItem.product_price_id,
          quantity: cartItem.cart_item_quantity,
        };
      });

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userProfileId: $page.data.session && $page.data.session.user.id,
          products,
        }),
      });

      const data = await response.json();

      // Redirect to Checkout.
      const stripe = await getStripe();
      const { error } = await stripe!.redirectToCheckout({
        sessionId: data.id,
      });

      if (error && error.message) checkoutErrorMessage = error.message;

      isLoadingCheckout = false;
    } catch (error) {
      console.log(error);
    }
  };
</script>

<svelte:head>
  <title>Cart | Noureddine Feathers</title>
  <meta
    name="description"
    content="Cart | Noureddine Feathers - Shop premium ostrich feather dusters, premium extendable lambswool dusters, premium lambswool dusters, ostrich feathers, and ostrich eggshells - handmade from 100% natural farm-raised ostrich feathers and eggshells"
  />
</svelte:head>

{#if $cart.isLoadingCartItems}
  <div class="flex flex-col items-center gap-4">
    <span
      class="h-6 w-6 animate-spin rounded-full border-2 border-black border-t-white"
    />
  </div>
{:else}
  <div
    class="flex flex-col items-center gap-4 lg:flex-row lg:items-start lg:justify-center"
  >
    <div
      class={`flex w-full basis-3/5 flex-col gap-4 rounded border-2 border-neutral-100 p-4`}
    >
      <Heading>Your Cart</Heading>
      {#if $cart.cartTotalItems !== 0}
        <div class="flex flex-col gap-4">
          {#each $cart.cartItems as item, index}
            <CartCard cartItem={item} cartItemIndex={index} />
            {#if index !== $cart.cartItems.length - 1}
              <div class="h-[2px] w-full rounded-full bg-neutral-100" />
            {/if}
          {/each}
        </div>
      {:else}
        <p>Empty</p>
      {/if}
    </div>
    <div
      class={`sticky top-4 flex w-full basis-2/5 flex-col gap-4 self-start rounded border-2 border-neutral-100 p-4`}
    >
      <Heading>Summary</Heading>
      <div class="flex flex-col gap-2">
        <p class="uppercase">
          {$cart.cartTotalItems}
          {$cart.cartTotalItems === 1 ? 'item' : 'items'}
        </p>
        <div class="flex items-center gap-2">
          <p class="nf-font-bold flex-grow uppercase">Subtotal</p>
          <p class="nf-font-bold text-xl text-red-500">
            {formatCurrency($cart.cartTotalPrice)}
          </p>
        </div>
      </div>
      <p>Shipping and taxes calculated at checkout</p>
      {#if isLoadingCheckout}
        <p class="rounded bg-neutral-100 px-4 py-2 text-center">
          Redirecting to Checkout...
        </p>
      {:else}
        <button
          class="nf-font-bold rounded bg-green-500 px-4 py-2 text-white disabled:opacity-50"
          type="button"
          on:click={async () => await checkout()}
          disabled={$cart.cartTotalItems === 0 || isLoadingCheckout}
        >
          Checkout
        </button>
      {/if}
    </div>
  </div>
{/if}
