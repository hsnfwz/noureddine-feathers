<script lang="ts">
  // components
  import Heading from '$components/Heading/Heading.svelte';
  import Link from '$components/Link/Link.svelte';
</script>

<svelte:head>
  <title>Payment Cancelled | Noureddine Feathers</title>
  <meta name="description" content="Payment Cancelled | Noureddine Feathers - Shop feather dusters, eggshells, lambskins, and feathers" />
</svelte:head>

<div class="mx-8">
  <div class="flex flex-col gap-8">
    <Heading customClass="text-center">
      <span>Payment Cancelled</span>
    </Heading>
    <p class="text-center">
      Your payment was cancelled. Continue shopping and checkout when you are ready.
    </p>
    <Link href="/" ariaLabel="home">
      <span>Return Home</span>
    </Link>
  </div>
</div>