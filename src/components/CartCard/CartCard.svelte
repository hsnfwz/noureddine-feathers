<script lang="ts">
  import { afterUpdate } from 'svelte';

  // interfaces
  import type I_CartItem from '$interfaces/I_CartItem';

  // helpers
  import { formatCurrency, formatCategory } from '$helpers/helpers';

  // stores
  import { cart } from '$stores/CartStore';
  
  // components
  import Button from '$components/Button/Button.svelte';
  import Link from '$components/Link/Link.svelte';
  import Counter from '$components/Counter/Counter.svelte';

  // props
  export let cartItem: I_CartItem;
  export let cartItemIndex: number = 1;

  // state
  let quantity: number = cartItem.cart_item_quantity;
  
  $: cart.updateCartItem(cartItemIndex, quantity);

  afterUpdate(() => quantity = cartItem.cart_item_quantity);
</script>

<div class="flex flex-col lg:flex-row gap-4">
  <Link
    href={`/${formatCategory(cartItem.category)}/${cartItem.product_id}`}
    ariaLabel={cartItem.name}
  >
    <div class="flex justify-center p-2 bg-gray-100 hover:opacity-25 transition-all">
      <img
        src={cartItem.thumbnail_url}
        alt={cartItem.name}
        width="250"
        height="250"
      />
    </div>
  </Link>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-2 flex-1">
      <p>{cartItem.name}</p>
      <p class="text-gray-500">{cartItem.color} {cartItem.size ? `- ${cartItem.size} ${cartItem.size_unit}` : ''}</p>
      <div class="flex gap-2">
        <p class="flex flex-grow">Package</p>
        <p>
          {#if cartItem.quantity === 12}
            1 dz.
          {:else if cartItem.quantity === 36}
            3 dz.
          {:else if cartItem.quantity === 60}
            5 dz.
          {:else}
            {cartItem.quantity}
          {/if}
        </p>
      </div>
      <div class="flex gap-2">
        <p class="flex flex-grow">Price</p>
        <p>{formatCurrency(cartItem.price)}</p>
      </div>
      <div class="flex gap-2">
        <p class="flex flex-grow items-center">Quantity</p>
        <Counter bind:value={quantity} />
      </div>
      <div class="flex gap-2">
        <p class="nf-font-bold flex-grow">
          ITEM SUBTOTAL
        </p>
        <p class="nf-font-bold">
          {formatCurrency(cartItem.price * cartItem.cart_item_quantity)}
        </p>
      </div>
    </div>
    <Button
      handleClick={() => cart.removeCartItem(cartItemIndex)}
      customClass="bg-red-500 text-white uppercase p-2"
    >
      <span>Remove</span>
    </Button>
  </div>
</div>