<script lang="ts">
  import { onMount } from 'svelte';
  
  // components
  import Heading from '$components/Heading/Heading.svelte';
  import Link from '$components/Link/Link.svelte';

  // stores
  import { cart } from '$stores/CartStore';

  onMount(() => cart.clearCart()); // TODO: on success, create the required records, but only if we actually ordered, users can currently access this page anytime, which will lead to creating records we dont want
</script>

<svelte:head>
  <title>Payment Successful | Noureddine Feathers</title>
  <meta name="description" content="Payment Successful | Noureddine Feathers - Shop ostrich feather dusters, lambswool dusters, extendable lambswool dusters, ostrich eggshells, and ostrich feathers - handmade from 100% natural farm-raised ostrich feathers and eggshells" />
</svelte:head>

<div class="mx-8">
  <div class="flex flex-col gap-8 items-center">
    <Heading>
      <span>Payment Successful</span>
    </Heading>
    <p>
      Your payment was successful!
    </p>
    <div>
      <Link href="/" ariaLabel="home">
        <span>Return Home</span>
      </Link>
    </div>
  </div>
</div>