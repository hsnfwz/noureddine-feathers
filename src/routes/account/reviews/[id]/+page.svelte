<!-- @format -->
<script lang="ts">
  import { page } from '$app/stores';

  // components
  import Heading from '$components/Heading.svelte';
  import Link from '$components/Link.svelte';
</script>

<svelte:head>
  <title>Your Review | Noureddine Feathers</title>
  <meta
    name="description"
    content="Noureddine Feathers - Shop premium ostrich feather dusters, premium extendable lambswool dusters, premium lambswool dusters, ostrich feathers, and ostrich eggshells - handmade from 100% natural farm-raised ostrich feathers and eggshells"
  />
</svelte:head>

<div class="flex flex-col items-center gap-8">
  <Heading>
    <span>Your Review</span>
  </Heading>
  {#if $page.data.session}
    <div class="flex flex-col gap-8" />
  {:else}
    <p class="text-center">
      <Link href="/account/sign-in" customClass="text-sky-500">Sign In</Link> to
      view your review.
    </p>
  {/if}
</div>
