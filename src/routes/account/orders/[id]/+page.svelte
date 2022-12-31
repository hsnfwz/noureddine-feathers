<script lang="ts">
  // components
  import Heading from '$components/Heading/Heading.svelte';

  // interfaces
  import type I_Profile from '$interfaces/I_Profile';

  // stores
  import { profile } from '$stores/ProfileStore';
  import { page } from '$app/stores';

  // helpers
  import { formatPackage } from '$helpers/helpers';

  // api
  import { getOrders } from '$api/order';
  import { getOrderProducts } from '$api/order-product';

  // state
  let isLoading: boolean = true;
  let order: any;
  let orderProducts: any;
  let currentProfile: I_Profile | undefined = undefined;

  profile.subscribe(async (value) => {
    isLoading = true;

    if (value) {
      const _orders: [] | undefined = await getOrders({ id: $page.params.id, profile_id: value.id });
      const _orderProducts: any = await getOrderProducts({ order_id: $page.params.id, profile_id: value.id });

      order = _orders[0];
      orderProducts = [..._orderProducts];
    }

    currentProfile = value;

    isLoading = false;
  });
</script>

{#if isLoading}
  <p class="text-center">Loading...</p>
{:else if !isLoading && currentProfile && order && orderProducts}
  <div class="flex flex-col items-center gap-4">
    <Heading>
      <span>Account - Order</span>
    </Heading>
    <div class="flex flex-col gap-4">
      <div>
        <p class="text-neutral-500">Order Date:</p>
        <p>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }).format(new Date(order.created_at))}</p>
      </div>
      <div>
        <p class="text-neutral-500">Shipping Address:</p>
        <p>{order.shipping_address_line1}</p>
        {#if order.shipping_address_line2}
          <p>{order.shipping_address_line2}</p>
        {/if}
        <p>{order.shipping_address_city}, {order.shipping_address_state}, {order.shipping_address_country} {order.shipping_address_postal_code}</p>
      </div>
      <div>
        <p class="text-neutral-500">Receipt</p>
        <a href={order.stripe_receipt_url} class="text-blue-500" target="_blank" rel="noreferrer">View Receipt</a>
      </div>
      <div class="flex flex-col gap-4">
        <p class="text-neutral-500">Products ({orderProducts.length})</p>
        {#each orderProducts as orderProduct}
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
    </div>
  </div>
{:else}
  <Heading customClass="text-center">
    <span>404 Not Found</span>
  </Heading>
  <p class="text-center">Woops! We could not find what you were looking for.</p>
{/if}