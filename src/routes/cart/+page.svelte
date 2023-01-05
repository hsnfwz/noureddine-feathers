<script lang="ts">
  // components
  import CartCard from '$components/CartCard/CartCard.svelte';
  import Heading from '$components/Heading/Heading.svelte';

  // helpers
  import { formatCurrency } from '$helpers/helpers';

  // interfaces
  import type I_Profile from '$interfaces/I_Profile';

  // config
  import getStripe from '$config/stripe';

  // store
  import { profile } from '$stores/ProfileStore';
  import { cart } from '$stores/CartStore';

  // state
  let currentProfile: I_Profile | undefined;
  let isLoadingCheckout: boolean = false;
  let checkoutErrorMessage: string = '';

  profile.subscribe((value) => currentProfile = value);

  const checkout = async () => {
    try {
      isLoadingCheckout = true;

      const products: any = $cart.cartItems.map((cartItem: any) => {
        return {
          productPriceId: cartItem.product_price_id,
          quantity: cartItem.cart_item_quantity,
        }
      });

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          profileId: currentProfile?.id,
          products,
        }),
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

<svelte:head>
  <title>Cart | Noureddine Feathers</title>
  <meta name="description" content="Cart | Noureddine Feathers - Shop premium ostrich feather dusters, premium extendable lambswool dusters, premium lambswool dusters, ostrich feathers, and ostrich eggshells - handmade from 100% natural farm-raised ostrich feathers and eggshells" />
</svelte:head>

{#if $cart.isLoadingCartItems}
  <div class="flex flex-col gap-4 items-center">
    <span class="animate-spin h-6 w-6 border-2 border-black border-t-white rounded-full"></span>
  </div>
{:else}
  <div class="flex flex-col gap-4 items-center lg:flex-row lg:items-start lg:justify-center">
    <div class={`max-w-[500px] w-full flex flex-col gap-4 border-2 border-neutral-100 p-4 rounded-lg`}>
      <Heading>YOUR Cart</Heading>
      <div class="flex flex-col gap-2">
        <p class="uppercase">Subtotal ({$cart.cartTotalItems} {$cart.cartTotalItems === 1 ? 'item' : 'items'})</p>
        <p class="text-xl text-red-500 nf-font-bold">{formatCurrency($cart.cartTotalPrice)}</p>
      </div>
      {#if $cart.cartTotalItems !== 0}
        <div class="max-w-[500px] flex flex-col gap-4">
          {#each $cart.cartItems as item, index}
            <CartCard cartItem={item} cartItemIndex={index} />
          {/each}
        </div>
      {/if}
    </div>
    <div class={`max-w-[500px] w-full flex flex-col gap-4 border-2 border-neutral-100 p-4 rounded-lg`}>
      <Heading>SUMMARY</Heading>
      <div class="flex flex-col gap-2">
        <p class="uppercase">{$cart.cartTotalItems} {$cart.cartTotalItems === 1 ? 'item' : 'items'}</p>
        <div class="flex gap-2 items-center">
          <p class="nf-font-bold flex-grow uppercase">Subtotal</p>
          <p class="nf-font-bold text-xl text-red-500">
            {formatCurrency($cart.cartTotalPrice)}
          </p>
        </div>
      </div>
      <p>Shipping and taxes calculated at checkout</p>
      {#if isLoadingCheckout}
        <p class="text-center px-4 py-2 bg-neutral-100 rounded">Redirecting to Checkout...</p>
      {:else}
        <button
          class="rounded px-4 py-2 bg-green-500 text-white nf-font-bold disabled:opacity-50"  
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