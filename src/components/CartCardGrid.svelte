<script lang="ts">
  // import { onMount } from 'svelte';

  // components
  import CartCard from 'components/CartCard.svelte';
  import Heading from 'components/shared/Heading.svelte';
  import Link from 'components/shared/Link.svelte';
  import Button from 'components/shared/Button.svelte';
  import VisaIcon from 'components/icons/VisaIcon.svelte';
  import MastercardIcon from 'components/icons/MastercardIcon.svelte';

  // types
  import type CartProductType from 'types/CartProductType';

  // utils
  import { formatCurrency } from 'utils/helpers';

  // store
  import { cart } from 'stores/CartStore';

  // state
  // let promoCode: string = '';
</script>

{#if $cart.cartItems.length === 0}
  <div class="flex flex-col justify-center items-center gap-8">
    <Heading text="Your cart is empty." />
    <Link href="/" ariaLabel="continue shopping" text="Continue Shopping" />
  </div>
{/if}

{#if $cart.cartItems.length > 0}
  <div class="flex justify-center items-center">
    <div class="flex flex-col lg:flex-row gap-8">
      <div class="flex flex-col gap-4">
        <Heading text="Cart" bold={true} uppercase={true} />
        <div class="flex flex-col gap-4">
          {#each $cart.cartItems as item, index}
            <CartCard cartProduct={item} cartProductIndex={index} />
          {/each}
        </div>
      </div>
      <div class="flex flex-col gap-4 flex-grow">
        <Heading text="Order Summary" bold={true} uppercase={true} />
        <p>{$cart.cartTotalItems} ITEMS</p>
        <div class="flex gap-2">
          <p class="font-bold flex-grow">
            ORDER SUBTOTAL
          </p>
          <p class="font-bold">
            {formatCurrency($cart.cartTotalPrice)}
          </p>
        </div>
        <!-- <div class="flex flex-col gap-2">
          <label htmlFor="promo-code">
            Promo Code
          </label>
          <input
            id="promo-code"
            type="text"
            placeholder="Enter promo code"
            value={promoCode}
            onChange={(e: any) => setPromoCode(e.target.value)}
            class="p-2 border-2 border-gray-100 rounded-sm box-border"
          />
        </div> -->
        <p class="text-gray-500">Shipping, taxes, and discounts calculated at checkout</p>
        <!-- <Button
          text="Checkout"
          uppercase={true}
          on:click={async () => await checkout()}
          buttonColor="bg-green-500"
        /> -->
        <div class="flex gap-2 justify-center items-center">
          <div class="flex w-12">
            <VisaIcon />
          </div>
          <div class="flex w-12">
            <MastercardIcon />
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}