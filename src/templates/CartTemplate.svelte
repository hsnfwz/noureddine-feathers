<!-- @format -->
<script lang="ts">
  import { page } from '$app/stores';

  // components
  import CartCard from '$components/CartCard.svelte';
  import Heading from '$components/Heading.svelte';

  // helpers
  import { formatCurrency } from '$helpers/helpers';

  // config
  import getStripe from '$config/stripe';

  // store
  import { cart } from '$stores/CartStore';
  import Button from '$components/Button.svelte';
  import Divider from '$components/Divider.svelte';
  import CartCardSkeleton from '$components/CartCardSkeleton.svelte';

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

<div
  class="flex flex-col items-center gap-8 p-8 lg:flex-row lg:items-start lg:justify-center"
>
  <div class={`flex w-full basis-3/5 flex-col gap-8 `}>
    <Heading>Your Cart</Heading>
    {#if $cart.isLoadingCartItems}
      <CartCardSkeleton />
    {:else if $cart.cartTotalItems === 0}
      <p>Empty</p>
    {:else}
      <div class="flex flex-col gap-8">
        {#each $cart.cartItems as item, index}
          <CartCard cartItem={item} cartItemIndex={index} />
          {#if index !== $cart.cartItems.length - 1}
            <Divider />
          {/if}
        {/each}
      </div>
    {/if}
  </div>
  <Divider customClass="lg:hidden" />
  <div class={`sticky top-4 flex w-full basis-2/5 flex-col gap-8 self-start`}>
    <Heading>Summary</Heading>
    <div class="flex flex-col gap-4">
      <p class="uppercase">
        {$cart.cartTotalItems}
        {$cart.cartTotalItems === 1 ? 'item' : 'items'}
      </p>
      <div class="flex items-center gap-4">
        <p class="montserrat-bold flex-grow uppercase">Subtotal</p>
        <p class="montserrat-bold text-xl text-rose-500">
          {formatCurrency($cart.cartTotalPrice)}
        </p>
      </div>
    </div>
    <p>Shipping and taxes calculated at checkout</p>

    <Button
      customClass="px-8 py-4 rounded-full bg-green-400 text-white hover:bg-green-500 transition-all disabled:bg-neutral-100 disabled:text-black disabled:opacity-25"
      handleClick={async () => await checkout()}
      disabled={$cart.cartTotalItems === 0 || isLoadingCheckout}
    >
      {#if isLoadingCheckout}
        Redirecting to Checkout...
      {:else}
        Checkout
      {/if}
    </Button>
  </div>
</div>
