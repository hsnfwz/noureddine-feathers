<script lang="ts">
  // components
  import CartCard from '$components/CartCard/CartCard.svelte';
  import CheckoutForm from '$components/CheckoutForm/CheckoutForm.svelte';

  // store
  import { cart } from '$stores/CartStore';
</script>

<svelte:head>
  <title>Cart | Noureddine Feathers</title>
  <meta name="description" content="Cart | Noureddine Feathers - Shop premium ostrich feather dusters, premium extendable lambswool dusters, premium lambswool dusters, ostrich feathers, and ostrich eggshells - handmade from 100% natural farm-raised ostrich feathers and eggshells" />
</svelte:head>

<div class="flex flex-col gap-8 items-center lg:flex-row lg:items-start lg:justify-center">
  {#if $cart.isLoadingCartItems}
    <span class="animate-spin h-6 w-6 border-2 border-black border-t-white rounded-full"></span>
  {/if}
  {#if $cart.cartTotalItems !== 0}
    <div class="max-w-[400px] flex flex-col gap-4">
      {#each $cart.cartItems as item, index}
        <CartCard cartItem={item} cartItemIndex={index} />
      {/each}
    </div>
  {/if}
  <div class="max-w-[400px] sticky top-4">
    <CheckoutForm />
  </div>
</div>