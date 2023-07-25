<!-- @format -->
<script lang="ts">
  import { page } from '$app/stores';

  // components
  import Heading from '$components/Heading.svelte';
  import Link from '$components/Link.svelte';
</script>

<svelte:head>
  <title>Review | Noureddine Feathers</title>
  <meta
    name="description"
    content="Noureddine Feathers - Shop premium ostrich feather dusters, premium extendable lambswool dusters, premium lambswool dusters, ostrich feathers, and ostrich eggshells - handmade from 100% natural farm-raised ostrich feathers and eggshells"
  />
</svelte:head>

<div class="flex flex-col gap-8 p-8 lg:w-1/2">
  <Heading>
    <span>Review</span>
  </Heading>
  {#if $page.data.session}
    <div class="flex flex-col gap-8" />
  {:else}
    <Link href="/account/sign-in">Sign In</Link>
  {/if}
</div>
