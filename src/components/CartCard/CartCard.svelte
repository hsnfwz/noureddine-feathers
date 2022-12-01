<script lang="ts">
  import { afterUpdate } from 'svelte';

  // interfaces
  import type I_CartItem from '$interfaces/I_CartItem';

  // helpers
  import { formatCurrency, formatText, formatPackage } from '$helpers/helpers';

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

<div class="flex flex-col gap-4">
  <Link href={`/${formatText(cartItem.name)}s/${cartItem.product_id}-${formatText(cartItem.name)}-${formatText(cartItem.color)}-${cartItem.size || ''}-${formatText(cartItem.size_unit) || ''}`} ariaLabel={cartItem.name}>
    <div class="flex justify-center p-2 bg-gray-100 hover:opacity-25 transition-all">
      <img
        src={cartItem.thumbnail_url}
        alt={cartItem.name}
        width=""
        height=""
        class="object-cover"
      />
    </div>
  </Link>
  <div class="flex flex-col gap-2">
    <p>{cartItem.name}</p>
    <p class="text-gray-500">{cartItem.color} {cartItem.size ? `- ${cartItem.size} ${cartItem.size_unit}` : ''}</p>
    <div class="flex gap-2">
      <p class="flex flex-grow">Package</p>
      <p>{formatPackage(cartItem.quantity)}</p>
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