<script lang="ts">
  // components
  import Heading from '$components/Heading/Heading.svelte';

  // interfaces
  import type I_Profile from '$interfaces/I_Profile';

  // stores
  import { profile } from '$stores/ProfileStore';

  // api
  import { updateOrder } from '$api/order';

  // helpers
  import { formatPackage } from '$helpers/helpers';

  // supabase
  import supabase from '$config/supabase';

  // data
  export let data: { order: any, orderProducts: any ;}

  let currentProfile: I_Profile | undefined = undefined;

  profile.subscribe(async (value) => {
    currentProfile = value;

    if (value && !value.is_admin) {
      window.location.replace('/');
    } else if (value && value.is_admin) {

    }
  });

  supabase
  .channel('public:order')
  .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'order' }, payload => data.order = payload.new)
  .subscribe()
</script>

{#if currentProfile && currentProfile.is_admin}
  <div class="flex flex-col items-center gap-4">
    <Heading>
      <span>Admin - Order</span>
    </Heading>
    <div class="flex flex-col gap-4">
      <div>
        <p class="text-neutral-500">Order Date:</p>
        <p>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }).format(new Date(data.order.created_at))}</p>
      </div>
      <div>
        <p class="text-neutral-500">Shipping Address:</p>
        <p>{data.order.shipping_address_line1}</p>
        {#if data.order.shipping_address_line2}
          <p>{data.order.shipping_address_line2}</p>
        {/if}
        <p>{data.order.shipping_address_city}, {data.order.shipping_address_state}, {data.order.shipping_address_country} {data.order.shipping_address_postal_code}</p>
      </div>
      <div>
        <p class="text-neutral-500">Receipt</p>
        <a href={data.order.stripe_receipt_url} class="text-blue-500" target="_blank" rel="noreferrer">View Receipt</a>
      </div>
      <div class="flex flex-col gap-4">
        <p class="text-neutral-500">Products ({data.orderProducts.length})</p>
        {#each data.orderProducts as orderProduct}
          <div class="bg-neutral-100 rounded p-4 flex flex-col">
            <div class="flex gap-2 justify-between">
              <p class="nf-font-bold">Category:</p>
              <p>{orderProduct.stripe_product_id.name}</p>
            </div>
            <div class="flex gap-2 justify-between">
              <p class="nf-font-bold">Color:</p>
              <p>{orderProduct.stripe_product_id.color}</p>
            </div>
            {#if orderProduct.stripe_product_id.size}
              <div class="flex gap-2 justify-between">
                <p class="nf-font-bold">Size:</p>
                <p>{orderProduct.stripe_product_id.size} {orderProduct.stripe_product_id.size_unit}</p>
              </div>
            {/if}
            <div class="flex gap-2 justify-between">
              <p class="nf-font-bold">Package:</p>
              <p>{formatPackage(orderProduct.stripe_price_id.quantity)}</p>
            </div>
            <div class="flex gap-2 justify-between">
              <p class="nf-font-bold">Quantity:</p>
              <p>{orderProduct.quantity}</p>
            </div>
          </div>
        {/each}
      </div>
      {#if data.order.is_fulfilled}
        <button
          class="px-4 py-2 bg-red-500 text-white rounded nf-font-bold"
          type="button"
          on:click={async () => await updateOrder(data.order.id, { is_fulfilled: !data.order.is_fulfilled })}
        >
          Unfulfill
        </button>
      {:else}
        <button
          class="px-4 py-2 bg-green-500 text-white rounded nf-font-bold"
          type="button"
          on:click={async () => await updateOrder(data.order.id, { is_fulfilled: !data.order.is_fulfilled })}
        >
          Fulfill
        </button>
      {/if}
    </div>
  </div>
{/if}