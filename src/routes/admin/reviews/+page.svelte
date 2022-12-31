<script lang="ts">
  // components
  import Heading from '$components/Heading/Heading.svelte';

  // interfaces
  import type I_Profile from '$interfaces/I_Profile';

  // stores
  import { profile } from '$stores/ProfileStore';

  let currentProfile: I_Profile | undefined = undefined;
  let reviews: [] = [];

  profile.subscribe(async (value) => {
    currentProfile = value;

    if (value && !value.is_admin) {
      window.location.replace('/');
    } else if (value && value.is_admin) {

    }
  });
</script>

{#if currentProfile && currentProfile.is_admin}
  <div class="flex flex-col items-center gap-4">
    <Heading>
      <span>Admin - Reviews</span>
    </Heading>
    <div class="flex flex-col gap-4">
      {#if reviews.length === 0}
        <p class="text-gray-500">You have no reviews.</p>
      {:else}
        {#each reviews as review}
          <div class="flex gap-4 p-4 bg-neutral-100 rounded"></div>
        {/each}
      {/if}
    </div>
  </div>
{/if}