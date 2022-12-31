<script lang="ts">
  // components
  import Heading from '$components/Heading/Heading.svelte';
  import Link from '$components/Link/Link.svelte';

  // interfaces
  import type I_Profile from '$interfaces/I_Profile';

  // supabase
  import supabase from '$config/supabase';

  // stores
  import { profile } from '$stores/ProfileStore';

  // api
  import { getOrders } from '$api/order';

  let currentProfile: I_Profile | undefined = undefined;
  let orders: [] = [];
  let reviews: [] = [];

  profile.subscribe(async (value) => {
    currentProfile = value;

    if (value) {
      const _orders: [] | undefined = await getOrders({ profile_id: currentProfile.id });

      if (_orders) {
        orders = _orders;
      }
    }
  });
</script>

<div class="flex flex-col items-center gap-4">
  <Heading>
    <span>Account</span>
  </Heading>
  {#if currentProfile}
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-4">
        <h1>Orders</h1>
        {#if orders.length === 0}
          <p class="text-gray-500">You have no current or past orders.</p>
        {:else}
          {#each orders as order}
            <div class="flex gap-4 p-4 bg-neutral-100 rounded">
              <p>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }).format(new Date(order.created_at))}</p>
              <a class="text-blue-500" href="/">View Order</a>
              <a class="text-blue-500" href={order.stripe_receipt_url} target="_blank" rel="noreferrer">View Receipt</a>
            </div>
          {/each}
        {/if}
      </div>
      <div class="flex flex-col gap-4">
        <h1>Reviews</h1>
        {#if reviews.length === 0}
          <p class="text-gray-500">You have no reviews.</p>
        {:else}
          {#each reviews as review}
            <div class="flex gap-4 p-4 bg-neutral-100 rounded"></div>
          {/each}
        {/if}
      </div>
      <button
        class="px-4 py-2 bg-neutral-100 rounded nf-font-bold"
        type="button"
        on:click={async () => await supabase.auth.signOut()}
      >
        Sign Out
      </button>
    </div>
  {:else}
    <p><Link href="/sign-in" ariaLabel="Sign In" customClass="text-blue-500">Sign in</Link> to view your account</p>
  {/if}
</div>