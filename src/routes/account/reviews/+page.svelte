<script lang="ts">
  import { page } from "$app/stores";

  // components
  import Heading from "$components/Heading/Heading.svelte";
  import Link from "$components/Link/Link.svelte";

  let reviews: [] = [];
</script>

<svelte:head>
  <title>Your Reviews | Noureddine Feathers</title>
  <meta
    name="description"
    content="Noureddine Feathers - Shop premium ostrich feather dusters, premium extendable lambswool dusters, premium lambswool dusters, ostrich feathers, and ostrich eggshells - handmade from 100% natural farm-raised ostrich feathers and eggshells"
  />
</svelte:head>

<div class="flex flex-col items-center gap-4">
  <Heading>
    <span>Your Reviews</span>
  </Heading>
  {#if $page.data.session}
    <div class="flex flex-col gap-4">
      {#if reviews.length === 0}
        <p class="text-gray-500">You have no reviews.</p>
      {:else}
        {#each reviews as review}
          <div class="flex gap-4 rounded bg-neutral-100 p-4" />
        {/each}
      {/if}
    </div>
  {:else}
    <p class="text-center">
      <Link
        href="/account/sign-in"
        customClass="text-sky-500"
        ariaLabel="account">Sign In</Link
      > to view your reviews.
    </p>
  {/if}
</div>
