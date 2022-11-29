<script lang="ts">
  // components
  import CartCard from '$components/CartCard/CartCard.svelte';

  // store
  import { cart } from '$stores/CartStore';
</script>

{#if $cart.cartItems.length !== 0}
  <div class="flex flex-col gap-4 border-2 border-gray-100 p-4">
    {#each $cart.cartItems as item, index}
      <CartCard cartProduct={item} cartProductIndex={index} />
    {/each}
  </div>
{/if}