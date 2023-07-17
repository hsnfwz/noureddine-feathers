<!-- @format -->
<script lang="ts">
  export let data;

  import { page } from '$app/stores';

  // components
  import Heading from '$components/Heading.svelte';
  import Link from '$components/Link.svelte';
</script>

<svelte:head>
  <title>Your Orders | Noureddine Feathers</title>
  <meta
    name="description"
    content="Noureddine Feathers - Shop premium ostrich feather dusters, premium extendable lambswool dusters, premium lambswool dusters, ostrich feathers, and ostrich eggshells - handmade from 100% natural farm-raised ostrich feathers and eggshells"
  />
</svelte:head>

<Heading customClass="text-center">
  <span>Your Orders</span>
</Heading>
{#if $page.data.session}
  <div class="m-auto flex flex-col gap-8">
    <div class="flex flex-col gap-8">
      <h1>New Orders ({data.unfulfilledOrders.length})</h1>
      {#if data.unfulfilledOrders.length === 0}
        <p class="text-gray-500">You have no new orders.</p>
      {:else}
        {#each data.unfulfilledOrders as order}
          <div class="grid gap-8 rounded bg-neutral-100 p-4 md:grid-cols-3">
            <div class="self-center">
              <p>
                {new Intl.DateTimeFormat('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                }).format(new Date(order.created_at))}
              </p>
            </div>
            <div class="md:self-center">
              <p class="text-neutral-500">No Tracking ID</p>
            </div>
            <div
              class="grid gap-8 md:grid-cols-2 md:self-center md:justify-self-end"
            >
              <a
                class="text-sky-500 md:justify-self-end"
                href={`/account/orders/${order.id}`}>View Order</a
              >
              <a
                class="text-sky-500 md:justify-self-end"
                href={order.stripe_receipt_url}
                target="_blank"
                rel="noreferrer">View Receipt</a
              >
            </div>
          </div>
        {/each}
      {/if}
    </div>
    <div class="flex flex-col gap-8">
      <h1>Shipped Orders ({data.fulfilledOrders.length})</h1>
      {#if data.fulfilledOrders.length === 0}
        <p class="text-gray-500">You have no shipped orders.</p>
      {:else}
        {#each data.fulfilledOrders as order}
          <div class="grid gap-8 rounded bg-neutral-100 p-4 md:grid-cols-3">
            <div class="self-center">
              <p>
                {new Intl.DateTimeFormat('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                }).format(new Date(order.created_at))}
              </p>
            </div>
            <div class="md:self-center">
              <p class="montserrat-bold">
                {order.tracking_id || 'No Tracking ID'}
              </p>
            </div>
            <div
              class="grid gap-8 md:grid-cols-2 md:self-center md:justify-self-end"
            >
              <a
                class="text-sky-500 md:justify-self-end"
                href={`/account/orders/${order.id}`}>View Order</a
              >
              <a
                class="text-sky-500 md:justify-self-end"
                href={order.stripe_receipt_url}
                target="_blank"
                rel="noreferrer">View Receipt</a
              >
            </div>
          </div>
        {/each}
      {/if}
    </div>
  </div>
{:else}
  <p class="text-center">
    <Link href="/account/sign-in" customClass="text-sky-500">Sign In</Link> to view
    your orders.
  </p>
{/if}
