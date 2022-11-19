<script lang="ts">
  import { onMount } from 'svelte';

  // types
  import type CartProductType from 'types/CartProductType';
  import type LinkPropsType from 'types/props/LinkPropsType';
  import type ButtonPropsType from 'types/props/ButtonPropsType';

  // utils
  import { formatCurrency, formatCategory } from 'utils/helpers';

  // stores
  import { cart } from 'stores/CartStore';
  
  // components
  import Button from 'components/shared/Button.svelte';
  import Link from 'components/shared/Link.svelte';
  import Counter from 'components/shared/Counter.svelte';
  import CartCardSkeleton from 'components/CartCard/CartCardSkeleton.svelte';

  // props
  export let cartProduct: CartProductType;
  export let cartProductIndex: number;

  // state
  let loading: boolean = true;
  let quantity: number = cartProduct.cart_product_quantity;

  onMount(() => loading = false);
  
  $: cart.updateCartProduct(cartProductIndex, quantity);

  const productLinkProps: LinkPropsType = {
    href: `/${formatCategory(cartProduct.category)}/${cartProduct.product_id}`,
    ariaLabel: cartProduct.name,
  }

  const removeButtonProps: ButtonPropsType = {
    onClick: () => cart.removeCartProduct(cartProductIndex),
    text: 'Remove',
    buttonColor: 'bg-red-500',
    uppercase: true,
  }
</script>

<!-- {#if loading}
  <CartCardSkeleton />
{:else} -->
  <div class="flex flex-col border-2 border-gray-100 rounded-sm">
    <Link {...productLinkProps}>
      <div class="text-center p-2 bg-gray-100 hover:opacity-25 transition-all">
        <img
          src={cartProduct.thumbnail}
          alt={cartProduct.name}
          width="250"
          height="250"
        />
      </div>
    </Link>
    <div class="flex flex-col gap-4 p-4">
      <div class="flex flex-col gap-2">
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
        <Counter label="Quantity" bind:value={quantity} />
        <div class="flex gap-2">
          <p class="font-bold flex-grow">
            ITEM SUBTOTAL
          </p>
          <p class="font-bold">
            {formatCurrency(cartProduct.price * cartProduct.cart_product_quantity)}
          </p>
        </div>
      </div>
      <Button {...removeButtonProps} />
    </div>
  </div>
<!-- {/if} -->