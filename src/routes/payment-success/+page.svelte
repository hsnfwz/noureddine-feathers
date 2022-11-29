<script lang="ts">
  // components
  import Heading from '$components/Heading/Heading.svelte';
  import Link from '$components/Link/Link.svelte';
</script>

<svelte:head>
  <title>Payment Successful | Noureddine Feathers</title>
  <meta name="description" content="Payment Successful | Noureddine Feathers - Shop feather dusters, eggshells, lambskins, and feathers" />
</svelte:head>

<div class="mx-8">
  <div class="flex flex-col gap-8">
    <Heading customClass="text-center">
      <span>Payment Successful</span>
    </Heading>
    <p class="text-center">
      Your payment was successful!
    </p>
    <Link href="/" ariaLabel="home">
      <span>Return Home</span>
    </Link>
  </div>
</div>