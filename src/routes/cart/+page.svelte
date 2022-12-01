<script lang="ts">
  // components
  import CartCard from '$components/CartCard/CartCard.svelte';
  import CheckoutForm from '$components/CheckoutForm/CheckoutForm.svelte';
  import Heading from '$components/Heading/Heading.svelte';

  // store
  import { cart } from '$stores/CartStore';
</script>

<svelte:head>
  <title>Cart | Noureddine Feathers</title>
  <meta name="description" content="Cart | Noureddine Feathers - Shop premium ostrich feather dusters, premium extendable lambswool dusters, premium lambswool dusters, ostrich feathers, and ostrich eggshells - handmade from 100% natural farm-raised ostrich feathers and eggshells" />
</svelte:head>


{#if $cart.isLoadingCartItems}
  <div class="flex flex-col gap-8 items-center">
    <span class="animate-spin h-6 w-6 border-2 border-black border-t-white rounded-full"></span>
  </div>
{:else}
  <div class="flex flex-col gap-8 items-center lg:flex-row lg:items-start lg:justify-center">
    <div class="flex lg:hidden">
      <Heading>Cart</Heading>
    </div>
    {#if $cart.cartTotalItems !== 0}
      <div class="max-w-[500px] flex flex-col gap-4">
        {#each $cart.cartItems as item, index}
          <CartCard cartItem={item} cartItemIndex={index} />
        {/each}
      </div>
    {/if}
    <div class={`max-w-[500px] flex flex-col gap-4 ${$cart.cartTotalItems === 0 ? 'items-center' : 'items-start'} sticky top-4`}>
      <div class="hidden lg:flex">
        <Heading>Cart</Heading>
      </div>
      <CheckoutForm />
    </div>
  </div>
{/if}