<script lang="ts">
  import { afterUpdate } from "svelte";

  // storage
  import { getPublicUrl } from "$api/storage";

  // interfaces
  import type I_CartItem from "$interfaces/I_CartItem";

  // helpers
  import {
    formatCurrency,
    formatText,
    formatPackage,
    formatName,
  } from "$helpers/helpers";

  // stores
  import { cart } from "$stores/CartStore";

  // components
  import Link from "$components/Link/Link.svelte";
  import Counter from "$components/Counter/Counter.svelte";

  // props
  export let cartItem: I_CartItem;
  export let cartItemIndex: number = 1;

  // state
  let quantity: number = cartItem.cart_item_quantity;
  let src: string = "";

  $: cart.updateCartItem(cartItemIndex, quantity);

  afterUpdate(() => {
    quantity = cartItem.cart_item_quantity;

    if (cartItem.category === "Feathers") {
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

<div class="flex flex-col md:flex-row">
  <Link
    href={`/${formatText(cartItem.category)}/${
      cartItem.product_id
    }-${formatText(cartItem.name)}-${formatText(cartItem.color)}-${
      cartItem.size || ""
    }-${formatText(cartItem.size_unit) || ""}`}
    ariaLabel={cartItem.name}
  >
    <div
      class="flex h-full justify-center rounded-t-lg bg-neutral-100 p-2 md:rounded-t-none md:rounded-bl-lg md:rounded-tl-lg"
    >
      <img
        {src}
        alt={cartItem.name}
        width=""
        height=""
        class="object-contain"
      />
    </div>
  </Link>
  <div
    class="flex flex-col gap-4 rounded-b-lg border-x-2 border-b-2 border-neutral-100 p-4 md:rounded-b-none md:rounded-t-none md:rounded-br-lg md:rounded-tr-lg md:border-y-2 md:border-r-2"
  >
    <div class="flex flex-col gap-2">
      <p>
        {cartItem.name} - {cartItem.color}
        {cartItem.size ? `- ${cartItem.size} ${cartItem.size_unit}` : ""}
      </p>
      <div class="flex gap-2">
        <p class="flex flex-grow">Package</p>
        <p>{formatPackage(cartItem.quantity)}</p>
      </div>
      <div class="flex gap-2">
        <p class="flex flex-grow">Price</p>
        <p class="nf-font-bold">
          {formatCurrency(cartItem.price * cartItem.cart_item_quantity)}
        </p>
      </div>
      <div class="flex gap-2">
        <p class="flex flex-grow items-center">Quantity</p>
        <Counter bind:value={quantity} />
      </div>
    </div>
    <button
      class="nf-font-bold rounded bg-red-500 px-4 py-2 text-white disabled:opacity-50"
      type="button"
      on:click={() => cart.removeCartItem(cartItemIndex)}
    >
      Remove
    </button>
  </div>
</div>
