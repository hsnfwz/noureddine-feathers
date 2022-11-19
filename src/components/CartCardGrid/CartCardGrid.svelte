<script lang="ts">
  // components
  import CartCard from 'components/CartCard/CartCard.svelte';
  import Heading from 'components/shared/Heading.svelte';
  import Link from 'components/shared/Link.svelte';

  // store
  import { cart } from 'stores/CartStore';
</script>

{#if $cart.cartItems.length !== 0}
  <div class="flex flex-col gap-4">
    {#each $cart.cartItems as item, index}
      <CartCard cartProduct={item} cartProductIndex={index} />
    {/each}
  </div>
{/if}