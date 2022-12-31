<script lang="ts">
  // components
  import Heading from '$components/Heading/Heading.svelte';

  // interfaces
  import type I_Profile from '$interfaces/I_Profile';

  // stores
  import { profile } from '$stores/ProfileStore';

  // api
  import { getOrders } from '$api/order';

  // state
  let isLoading: boolean = true;
  let currentProfile: I_Profile | undefined;
  let fulfilledOrders: any;
  let unfulfilledOrders: any;

  profile.subscribe(async (value) => {
    isLoading = true;

    if (value) {
      const _orders: [] | undefined = await getOrders({ profile_id: value.id });

      let _fulfilledOrders: [] = [];
      let _unfulfilledOrders: [] = [];

      if (_orders) {
        _orders.forEach(order => {
          if (order.is_fulfilled) {
            _fulfilledOrders.push(order);
          } else {
            _unfulfilledOrders.push(order);
          }
        });

        _fulfilledOrders.sort((a, b) => a.created_at < b.created_at);
        _unfulfilledOrders.sort((a, b) => a.created_at < b.created_at);

        fulfilledOrders = [..._fulfilledOrders];
        unfulfilledOrders = [..._unfulfilledOrders];
      }
    }

    currentProfile = value;

    isLoading = false;
  });
</script>

{#if isLoading}
  <p class="text-center">Loading...</p>
{:else if !isLoading && currentProfile && fulfilledOrders && unfulfilledOrders}
  <div class="flex flex-col items-center gap-4">
    <Heading>
      <span>Account - Orders</span>
    </Heading>
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-4">
        <h1>Current Orders ({unfulfilledOrders.length})</h1>
        {#if unfulfilledOrders.length === 0}
          <p class="text-gray-500">You have no current orders.</p>
        {:else}
          {#each unfulfilledOrders as order}
            <div class="flex justify-between gap-4 p-4 bg-neutral-100 rounded items-center">
              <p>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }).format(new Date(order.created_at))}</p>
              <a class="text-blue-500" href={`/account/orders/${order.id}`}>View Order</a>
              <a class="text-blue-500" href={order.stripe_receipt_url} target="_blank" rel="noreferrer">View Receipt</a>
            </div>
          {/each}
        {/if}
      </div>
      <div class="flex flex-col gap-4">
        <h1>Past Orders ({fulfilledOrders.length})</h1>
        {#if fulfilledOrders.length === 0}
          <p class="text-gray-500">You have no past orders.</p>
        {:else}
          {#each fulfilledOrders as order}
            <div class="flex justify-between gap-4 p-4 bg-neutral-100 rounded items-center">
              <p>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }).format(new Date(order.created_at))}</p>
              <a class="text-blue-500" href={`/account/orders/${order.id}`}>View Order</a>
              <a class="text-blue-500" href={order.stripe_receipt_url} target="_blank" rel="noreferrer">View Receipt</a>
            </div>
          {/each}
        {/if}
      </div>
    </div>
  </div>
{:else}
  <Heading customClass="text-center">
    <span>404 Not Found</span>
  </Heading>
  <p class="text-center">Woops! We could not find what you were looking for.</p>
{/if}