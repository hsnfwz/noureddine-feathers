<script lang="ts">
  // components
  import Heading from '$components/Heading/Heading.svelte';

  // interfaces
  import type I_Profile from '$interfaces/I_Profile';

  // stores
  import { profile } from '$stores/ProfileStore';

  // supabase
  import supabase from '$config/supabase';

  let currentProfile: I_Profile | undefined = undefined;

  profile.subscribe(async (value) => currentProfile = value);
</script>

<div class="flex flex-col items-center gap-4">
  <Heading>
    <span>Account</span>
  </Heading>
  {#if currentProfile}
    <div class="flex flex-col items-center gap-4">
      <a href="/account/orders" class="text-blue-500">Orders</a>
      <a href="/account/reviews" class="text-blue-500">Reviews</a>
    </div>

    <!-- todo: CHANGE EMAIL HERE -->

    <button
      class="px-4 py-2 bg-neutral-100 rounded nf-font-bold"
      type="button"
      on:click={async () => await supabase.auth.signOut()}
    >
      Sign Out
    </button>
  {:else}
    <p><a href="/sign-in" class="text-blue-500">Sign in</a> to view your account</p>
  {/if}
</div>