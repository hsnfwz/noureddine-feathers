<script lang="ts">
  // components
  import Heading from '$components/Heading/Heading.svelte';

  // interfaces
  import type I_Profile from '$interfaces/I_Profile';

  // stores
  import { profile } from '$stores/ProfileStore';

  let currentProfile: I_Profile | undefined = undefined;

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
      <span>Admin</span>
    </Heading>
    <div class="flex flex-col items-center gap-4">
      <a href="/admin/orders" class="text-blue-500">Orders</a>
      <a href="admin/reviews" class="text-blue-500">Reviews</a>
    </div>
  </div>
{/if}