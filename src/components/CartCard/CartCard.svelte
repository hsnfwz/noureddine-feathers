<script lang="ts">
  import { onMount, afterUpdate } from 'svelte';

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
  import CartCardSkeleton from '$components/CartCard/CartCardSkeleton.svelte';

  // props
  export let cartProduct: I_CartItem;
  export let cartProductIndex: number = 1;

  // state
  let loading: boolean = true;
  let quantity: number = cartProduct.cart_product_quantity;

  onMount(() => loading = false);
  
  $: cart.updateCartProduct(cartProductIndex, quantity);

  afterUpdate(() => quantity = cartProduct.cart_product_quantity);
</script>

<!-- {#if loading}
  <CartCardSkeleton />
{:else} -->
  <div class="flex flex-col lg:flex-row gap-4">
    <Link
      href={`/${formatCategory(cartProduct.category)}/${cartProduct.product_id}`},
      ariaLabel={cartProduct.name}
    >
      <div class="flex justify-center p-2 bg-gray-100 hover:opacity-25 transition-all">
        <img
          src={cartProduct.thumbnail}
          alt={cartProduct.name}
          width="250"
          height="250"
        />
      </div>
    </Link>
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-2 flex-1">
        <p>{cartProduct.name}</p>
        <p class="text-gray-500">
          <span>{cartProduct.color} &#183; </span>
          <span>{cartProduct.size}&#8243; &#183; </span>
          <span>
            {#if cartProduct.quantity === 12}
              1 dz.
            {:else if cartProduct.quantity === 60}
              5 dz.
            {/if}
          </span>
        </p>
        <div class="flex gap-2">
          <p class="flex flex-grow">Price</p>
          <p>{formatCurrency(cartProduct.price)}</p>
        </div>
        <div class="flex gap-2">
          <p class="flex flex-grow items-center">Quantity</p>
          <Counter bind:value={quantity} />
        </div>
        <div class="flex gap-2">
          <p class="font-bold flex-grow">
            ITEM SUBTOTAL
          </p>
          <p class="font-bold">
            {formatCurrency(cartProduct.price * cartProduct.cart_product_quantity)}
          </p>
        </div>
      </div>
      <Button
        handleClick={() => cart.removeCartProduct(cartProductIndex)}
        customClass="bg-red-500 text-white uppercase p-2"
      >
        <span>Remove</span>
      </Button>
    </div>
  </div>
<!-- {/if} -->