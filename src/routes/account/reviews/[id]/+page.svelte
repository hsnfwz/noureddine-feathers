<script lang="ts">
  // components
  import Heading from '$components/Heading/Heading.svelte';

  // interfaces
  import type I_Profile from '$interfaces/I_Profile';

  // stores
  import { profile } from '$stores/ProfileStore';

  let currentProfile: I_Profile | undefined = undefined;

  profile.subscribe(async (value) => currentProfile = value);
</script>

<svelte:head>
  <title>Account Review | Noureddine Feathers</title>
  <meta name="description" content="Noureddine Feathers - Shop premium ostrich feather dusters, premium extendable lambswool dusters, premium lambswool dusters, ostrich feathers, and ostrich eggshells - handmade from 100% natural farm-raised ostrich feathers and eggshells" />
</svelte:head>

{#if currentProfile}
  <div class="flex flex-col items-center gap-4">
    <Heading>
      <span>Account - Review</span>
    </Heading>
    <div class="flex flex-col gap-4"></div>
  </div>
{/if}