<!-- @format -->
<script lang="ts">
  // components
  import Heading from '$components/Heading.svelte';
  import Link from '$components/Link.svelte';
</script>

<svelte:head>
  <title>Payment Cancelled | Noureddine Feathers</title>
  <meta
    name="description"
    content="Payment Cancelled | Noureddine Feathers - Shop premium ostrich feather dusters, premium extendable lambswool dusters, premium lambswool dusters, ostrich feathers, and ostrich eggshells - handmade from 100% natural farm-raised ostrich feathers and eggshells"
  />
</svelte:head>

<div class="m-8 flex w-full flex-col gap-8 lg:w-3/5">
  <Heading>Payment Cancelled</Heading>
  <p>
    Your payment was cancelled. Continue shopping and checkout when you are
    ready.
  </p>
  <Link href="/" customClass="px-4 py-2 bg-neutral-100 self-start"
    >Continue Shopping</Link
  >
</div>
