<script lang="ts">
  // stores
  import { profile } from '$stores/ProfileStore';
  import { cart } from '$stores/CartStore';

  // helpers
  import { formatCurrency, formatPackage } from '$helpers/helpers';

  // config
  import getStripe from '$config/stripe';

  // interfaces
  import type I_Product from '$interfaces/I_Product';
  import type I_ProductPriceTableRecord from '$interfaces/I_ProductPriceTableRecord';
  import type I_Profile from '$interfaces/I_Profile';

  // components
  import Stars from '$components/Stars/Stars.svelte';
  import Counter from '$components/Counter/Counter.svelte';

  // props
  export let product: I_Product;
  export let productImagePublicUrls: string[];

  // state
  let currentProfile: I_Profile | undefined;
  let productPrice: I_ProductPriceTableRecord = product?.prices[0];
  let quantity: number = 1;
  let isLoadingCheckout: boolean = false;
  let checkoutErrorMessage: string = '';
  let showAddToCartMessage: boolean = false;

  profile.subscribe((value) => currentProfile = value);

  const checkout = async () => {
    try {
      isLoadingCheckout = true;

      const products: any = [{
        productPriceId: productPrice.id,
        quantity,
      }];

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          profileId: currentProfile?.id,
          products,
        }),
      });

      const data = await response.json();

      const stripe = await getStripe();

      const { error } = await stripe!.redirectToCheckout({ sessionId: data.id });
  
      if (error && error.message) checkoutErrorMessage = error.message;

      isLoadingCheckout = false;
    } catch (error) {
      console.log(error);
    }
  }

  $: {
    if (showAddToCartMessage) setTimeout(() => showAddToCartMessage = false, 1000);
  }
</script>

<div class="flex flex-col lg:flex-row gap-4 m-auto">
  <div class="max-w-[500px] flex flex-col gap-4">
    <div class="flex flex-col gap-2 lg:hidden">
      <h1 class="nf-font-bold text-xl"><p>{product.name} - {product.color} {product.size ? `- ${product.size} ${product.size_unit}` : ''}</p></h1>
      <!-- <Stars id={product.id} ratingAverage={product.rating_average} ratingCount={product.rating_count} /> -->
      {#if productPrice.quantity === 1}
        <p><span class="text-xl text-red-500 nf-font-bold">{formatCurrency(productPrice.price)}</span> {formatPackage(productPrice.quantity, true)}</p>
      {:else}
        <p><span class="text-xl text-red-500 nf-font-bold">{formatCurrency(productPrice.price)}</span> {formatPackage(productPrice.quantity, true)} ({formatCurrency(productPrice.price / productPrice.quantity)} per unit)</p>
      {/if}
    </div>
    <div class="flex flex-col gap-4">
      {#each productImagePublicUrls as publicUrl}
        <div class="bg-neutral-100 p-2 flex justify-center rounded-lg">
          <img
            src={publicUrl}
            alt={product.name}
            width=""
            height=""
            class="object-cover"
          />
        </div>
      {/each}
    </div>
  </div>
  <div class="max-w-[500px]">
    <div class="flex flex-col gap-4 flex-1">
      <div class="hidden lg:flex lg:flex-col lg:gap-2">
        <h1 class="nf-font-bold text-xl"><p>{product.name} - {product.color} {product.size ? `- ${product.size} ${product.size_unit}` : ''}</p></h1>
        <!-- <Stars id={product.id} ratingAverage={product.rating_average} ratingCount={product.rating_count} /> -->
        {#if productPrice.quantity === 1}
          <p><span class="text-xl text-red-500 nf-font-bold">{formatCurrency(productPrice.price)}</span> {formatPackage(productPrice.quantity, true)}</p>
        {:else}
          <p><span class="text-xl text-red-500 nf-font-bold">{formatCurrency(productPrice.price)}</span> {formatPackage(productPrice.quantity, true)} ({formatCurrency(productPrice.price / productPrice.quantity)} per unit)</p>
        {/if}
      </div>
      <div class="flex flex-col gap-2">
        <p class="nf-font-bold">Description</p>
        <p>{product.description}</p>
      </div>
      <div class="flex flex-col gap-2">
        <p class="nf-font-bold">Specifications</p>
        <ul class="list-disc list-inside">
          <li><span>Category:</span> {product.category}</li>
          <li><span>Color:</span> {product.color}</li>
          {#if product.size}
            <li><span>Size:</span> {product.size} {product.size_unit}</li>
          {/if}
        </ul>
      </div>
      <div class="flex flex-col gap-2">
        <p class="nf-font-bold">Package</p>
        <div class="flex gap-2">
          {#each product.prices as price}
            <button
              class={`${productPrice === price ? 'pointer-events-none border-black' : 'border-white'} border-2 rounded px-4 py-2 bg-neutral-100 text-black nf-font-bold disabled:opacity-50`}
              on:click={() => productPrice = price}
            >
              {formatPackage(price.quantity)}
            </button>
          {/each}
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <p class="nf-font-bold">Quantity</p>
        <Counter bind:value={quantity} />
      </div>
      <div class="flex flex-col gap-4 p-4 border-2 border-neutral-100 rounded-lg">
        {#if productPrice.quantity === 1}
          <p><span class="text-xl text-red-500 nf-font-bold">{formatCurrency(productPrice.price)}</span> {formatPackage(productPrice.quantity, true)}</p>
        {:else}
          <p><span class="text-xl text-red-500 nf-font-bold">{formatCurrency(productPrice.price)}</span> {formatPackage(productPrice.quantity, true)} ({formatCurrency(productPrice.price / productPrice.quantity)} per unit)</p>
        {/if}
        <p>Shipping and taxes calculated at checkout</p>
        <div class="flex flex-col gap-2">
          {#if showAddToCartMessage}
            <!-- <div class="flex justify-center uppercase p-2">
              <p>Added to Cart ( {$cart.cartTotalItems} )</p>
            </div> -->
            <p class="text-center px-4 py-2 bg-neutral-100 rounded">Added to Cart ( {$cart.cartTotalItems} )</p>
          {:else}
            <button
              class="rounded px-4 py-2 text-white bg-yellow-500 nf-font-bold disabled:opacity-50"
              on:click={() => {
                cart.addCartItem(product, productPrice, quantity);
                showAddToCartMessage = true;
              }}
              disabled={showAddToCartMessage || isLoadingCheckout}
            >
              Add to Cart
            </button>
          {/if}
          <!-- {#if currentProfile} -->
            {#if isLoadingCheckout}
              <p class="text-center px-4 py-2 bg-neutral-100 rounded">Redirecting to Checkout...</p>
            {:else}
              <button
                class="rounded px-4 py-2 text-white bg-orange-500 nf-font-bold disabled:opacity-50"
                on:click={async () => await checkout()}
                disabled={isLoadingCheckout}
              >
                Buy Now
              </button>
            {/if}
          <!-- {:else}
            <p class="text-center px-4 py-2 bg-neutral-100 rounded"><a href="/sign-in" class="text-blue-500">Sign in</a> to checkout</p>
          {/if} -->
        </div>
      </div>
    </div>
  </div>
</div>