<!-- @format -->
<script lang="ts">
  import { onMount } from 'svelte';

  // components
  import Heading from '$components/Heading.svelte';

  // stores
  import { cart } from '$stores/CartStore';
  import Link from '$components/Link.svelte';

  onMount(() => cart.clearCart());
</script>

<svelte:head>
  <title>Payment Successful | Noureddine Feathers</title>
  <meta
    name="description"
    content="Payment Successful | Noureddine Feathers - Shop premium ostrich feather dusters, premium extendable lambswool dusters, premium lambswool dusters, ostrich feathers, and ostrich eggshells - handmade from 100% natural farm-raised ostrich feathers and eggshells"
  />
</svelte:head>

<div class="flex w-full flex-col gap-8 p-8 lg:w-3/5">
  <Heading>Payment Successful</Heading>
  <p>Your payment was successful!</p>
  <Link
    href="/"
    customClass="rounded-full px-8 py-4 hover:bg-black hover:text-white transition-all bg-neutral-100 self-start"
    >Continue Shopping</Link
  >
</div>
