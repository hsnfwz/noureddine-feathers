<!-- @format -->
<script lang="ts">
  import { afterUpdate } from 'svelte';

  // storage
  import { getPublicUrl } from '$api/storage';

  // interfaces
  import type I_CartItem from '$interfaces/I_CartItem';

  // helpers
  import {
    formatCurrency,
    formatText,
    formatPackage,
    formatName,
  } from '$helpers/helpers';

  // stores
  import { cart } from '$stores/CartStore';

  // components
  import Link from '$components/Link/Link.svelte';
  import Counter from '$components/Counter/Counter.svelte';

  // props
  export let cartItem: I_CartItem;
  export let cartItemIndex: number = 1;

  // state
  let quantity: number = cartItem.cart_item_quantity;
  let src: string = '';

  $: cart.updateCartItem(cartItemIndex, quantity);

  afterUpdate(() => {
    quantity = cartItem.cart_item_quantity;

    if (cartItem.category === 'Feathers') {
      src = getPublicUrl(
        `${formatName(
          cartItem.name,
          cartItem.color,
          cartItem.size,
          cartItem.size_unit
        )}/0-${formatName(
          cartItem.name,
          cartItem.color,
          cartItem.size,
          cartItem.size_unit
        )}-1024x1024.webp`
      );
    } else {
      src = getPublicUrl(
        `${formatName(
          cartItem.name,
          cartItem.color,
          cartItem.size,
          cartItem.size_unit
        )}/${formatName(
          cartItem.name,
          cartItem.color,
          cartItem.size,
          cartItem.size_unit
        )}-0.webp`
      );
    }
  });
</script>

<div class="flex flex-row gap-4">
  <div>
    <Link
      href={`/products/${formatText(cartItem.category)}/${
        cartItem.product_id
      }-${formatText(cartItem.name)}-${formatText(cartItem.color)}-${
        cartItem.size || ''
      }-${formatText(cartItem.size_unit) || ''}`}
      ariaLabel={cartItem.name}
    >
      <img
        {src}
        alt={cartItem.name}
        width=""
        height=""
        class="w-full max-w-[200px] items-center justify-center rounded bg-neutral-100 object-contain p-2"
      />
    </Link>
  </div>
  <div class="flex w-full flex-col gap-4">
    <div class="flex gap-4">
      <p class="flex-grow">
        {cartItem.name} - {cartItem.color}
        {cartItem.size ? `- ${cartItem.size} ${cartItem.size_unit}` : ''}
      </p>
      <button
        class="self-start rounded bg-neutral-100 p-2"
        type="button"
        on:click={() => cart.removeCartItem(cartItemIndex)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="h-5 w-5"
        >
          <path
            d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
          />
        </svg>
      </button>
    </div>
    <div class="flex flex-col gap-4 lg:grid lg:grid-cols-3">
      <div class="flex gap-4 lg:flex-col lg:gap-4">
        <p class="flex flex-grow">Package</p>
        <p>{formatPackage(cartItem.quantity)}</p>
      </div>
      <div class="flex gap-4 lg:flex-col lg:gap-4">
        <p class="flex flex-grow">Price</p>
        <p class="nf-font-bold">
          {formatCurrency(cartItem.price * cartItem.cart_item_quantity)}
        </p>
      </div>
      <div class="flex items-start gap-4 lg:flex-col lg:gap-4">
        <p class="flex flex-grow items-center">Quantity</p>
        <Counter bind:value={quantity} />
      </div>
    </div>
  </div>
</div>
