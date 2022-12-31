<script lang="ts">
  // components
  import Heading from '$components/Heading/Heading.svelte';

  // interfaces
  import type I_Profile from '$interfaces/I_Profile';

  // stores
  import { profile } from '$stores/ProfileStore';

  // supabase
  import supabase from '$config/supabase';

  // api
  import { getOrders } from '$api/order';

  let currentProfile: I_Profile | undefined = undefined;
  let fulfilledOrders: [] = [];
  let unfulfilledOrders: [] = [];

  profile.subscribe(async (value) => {
    currentProfile = value;

    if (value && !value.is_admin) {
      window.location.replace('/');
    } else if (value && value.is_admin) {
      const _orders: [] | undefined = await getOrders();

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
  });

  supabase
  .channel('public:order')
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'order' }, payload => unfulfilledOrders = [...unfulfilledOrders, payload.new])
  .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'order' }, payload => {
    let _fulfilledOrders: [] = [];
    let _unfulfilledOrders: [] = [];

    if (payload.new.is_fulfilled) {
      _fulfilledOrders = [...fulfilledOrders, payload.new];
      _unfulfilledOrders = unfulfilledOrders.filter(order => order.id !== payload.new.id);
    } else {
      _fulfilledOrders = fulfilledOrders.filter(order => order.id !== payload.new.id);
      _unfulfilledOrders = [...unfulfilledOrders, payload.new];
    }

    _fulfilledOrders.sort((a, b) => a.created_at < b.created_at);
    _unfulfilledOrders.sort((a, b) => a.created_at < b.created_at);

    fulfilledOrders = [..._fulfilledOrders];
    unfulfilledOrders = [..._unfulfilledOrders];
  })
  .subscribe()
</script>

{#if currentProfile && currentProfile.is_admin}
  <div class="flex flex-col items-center gap-4">
    <Heading>
      <span>Admin - Orders</span>
    </Heading>
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-4">
        <h1>Unfulfilled Orders</h1>
        {#if unfulfilledOrders.length === 0}
          <p class="text-gray-500">You have no current orders.</p>
        {:else}
          {#each unfulfilledOrders as order}
            <div class="flex justify-between gap-4 p-4 bg-neutral-100 rounded items-center">
              <p>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }).format(new Date(order.created_at))}</p>
              <a class="text-blue-500" href={`/admin/orders/${order.id}`}>View Order</a>
              <a class="text-blue-500" href={order.stripe_receipt_url} target="_blank" rel="noreferrer">View Receipt</a>
            </div>
          {/each}
        {/if}
      </div>
      <div class="flex flex-col gap-4">
        <h1>Fulfilled Orders</h1>
        {#if fulfilledOrders.length === 0}
          <p class="text-gray-500">You have no past orders.</p>
        {:else}
          {#each fulfilledOrders as order}
            <div class="flex justify-between gap-4 p-4 bg-neutral-100 rounded items-center">
              <p>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }).format(new Date(order.created_at))}</p>
              <a class="text-blue-500" href={`/admin/orders/${order.id}`}>View Order</a>
              <a class="text-blue-500" href={order.stripe_receipt_url} target="_blank" rel="noreferrer">View Receipt</a>
            </div>
          {/each}
        {/if}
      </div>
    </div>
  </div>
{/if}