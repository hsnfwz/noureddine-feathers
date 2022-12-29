<script lang="ts">
  import { onMount } from 'svelte';
  
  // components
  import Heading from '$components/Heading/Heading.svelte';

  // stores
  import { cart } from '$stores/CartStore';

  onMount(() => {
    cart.clearCart();
  }); // todo: on success, create the required records, but only if we actually ordered, users can currently access this page anytime, which will lead to creating records we dont want
</script>

<svelte:head>
  <title>Payment Successful | Noureddine Feathers</title>
  <meta name="description" content="Payment Successful | Noureddine Feathers - Shop premium ostrich feather dusters, premium extendable lambswool dusters, premium lambswool dusters, ostrich feathers, and ostrich eggshells - handmade from 100% natural farm-raised ostrich feathers and eggshells" />
</svelte:head>

<div class="flex flex-col gap-4 items-center">
  <Heading>
    <span>Payment Successful</span>
  </Heading>
  <p class="text-center">
    Your payment was successful!
  </p>
</div>