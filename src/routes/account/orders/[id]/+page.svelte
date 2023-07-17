<!-- @format -->
<script lang="ts">
  export let data;

  import { page } from '$app/stores';

  // components
  import Heading from '$components/Heading.svelte';
  import Link from '$components/Link.svelte';

  // helpers
  import { formatPackage } from '$helpers/helpers';
</script>

<svelte:head>
  <title>Your Order | Noureddine Feathers</title>
  <meta
    name="description"
    content="Noureddine Feathers - Shop premium ostrich feather dusters, premium extendable lambswool dusters, premium lambswool dusters, ostrich feathers, and ostrich eggshells - handmade from 100% natural farm-raised ostrich feathers and eggshells"
  />
</svelte:head>

<Heading customClass="text-center">
  <span>Your Order</span>
</Heading>
{#if $page.data.session}
  <div class="m-auto flex flex-col gap-8">
    <div class="flex flex-col gap-8">
      <div>
        <p class="montserrat-bold">Date</p>
        <p>
          {new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          }).format(new Date(data.orderProducts[0].order.created_at))}
        </p>
      </div>
      <div>
        <p class="montserrat-bold">Shipping Address</p>
        <p>{data.orderProducts[0].order.shipping_address_line1}</p>
        {#if data.orderProducts[0].order.shipping_address_line2}
          <p>{data.orderProducts[0].order.shipping_address_line2}</p>
        {/if}
        <p>
          {data.orderProducts[0].order.shipping_address_city}, {data
            .orderProducts[0].order.shipping_address_state}, {data
            .orderProducts[0].order.shipping_address_country}
          {data.orderProducts[0].order.shipping_address_postal_code}
        </p>
      </div>
      <div>
        <p class="montserrat-bold">Receipt</p>
        <a
          href={data.orderProducts[0].order.stripe_receipt_url}
          class="text-sky-500"
          target="_blank"
          rel="noreferrer">View Receipt</a
        >
      </div>
    </div>
    <div class="flex flex-col gap-8">
      <p class="montserrat-bold">Products ({data.orderProducts.length})</p>
      {#each data.orderProducts as orderProduct}
        <div class="flex flex-col gap-8 rounded bg-neutral-100 p-4">
          <div>
            <p class="montserrat-bold">Category</p>
            <p>{orderProduct.stripe_product_id.name}</p>
          </div>
          <div>
            <p class="montserrat-bold">Color</p>
            <p>{orderProduct.stripe_product_id.color}</p>
          </div>
          {#if orderProduct.stripe_product_id.size}
            <div>
              <p class="montserrat-bold">Size</p>
              <p>
                {orderProduct.stripe_product_id.size}
                {orderProduct.stripe_product_id.size_unit}
              </p>
            </div>
          {/if}
          <div>
            <p class="montserrat-bold">Package</p>
            <p>{formatPackage(orderProduct.stripe_price_id.quantity)}</p>
          </div>
          <div>
            <p class="montserrat-bold">Quantity</p>
            <p>{orderProduct.quantity}</p>
          </div>
        </div>
      {/each}
    </div>
    <div class="flex flex-col gap-8">
      <div>
        <p class="montserrat-bold">Shipped By</p>
        <p>Canada Post</p>
      </div>
      <div>
        <p class="montserrat-bold">Shipping Service</p>
        <p>Registered Mail</p>
      </div>
      <div>
        <p class="montserrat-bold">Tracking ID</p>
        {#if data.orderProducts[0].order.is_fulfilled}
          <p>{data.orderProducts[0].order.tracking_id}</p>
        {:else}
          <p>No Tracking ID</p>
        {/if}
      </div>
    </div>
  </div>
{:else}
  <p class="text-center">
    <Link href="/account/sign-in" customClass="text-sky-500">Sign In</Link> to view
    your order.
  </p>
{/if}
