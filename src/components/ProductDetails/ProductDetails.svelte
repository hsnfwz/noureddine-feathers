<!-- @format -->
<script lang="ts">
  import { page } from '$app/stores';

  // stores
  import { cart } from '$stores/CartStore';

  // helpers
  import { formatCurrency, formatPackage, formatName } from '$helpers/helpers';

  // config
  import getStripe from '$config/stripe';

  // storage
  import { getPublicUrl } from '$api/storage';

  // interfaces
  import type I_Product from '$interfaces/I_Product';
  import type I_ProductPriceTableRecord from '$interfaces/I_ProductPriceTableRecord';

  // components
  import Stars from '$components/Stars/Stars.svelte';
  import Counter from '$components/Counter/Counter.svelte';

  // props
  export let product: I_Product;
  export let productImagePublicUrls: string[];

  // state
  let productPrice: I_ProductPriceTableRecord = product?.prices[0];
  let quantity: number = 1;
  let isLoadingCheckout: boolean = false;
  let checkoutErrorMessage: string = '';
  let showAddToCartMessage: boolean = false;

  const checkout = async () => {
    try {
      isLoadingCheckout = true;

      const products: any = [
        {
          productPriceId: productPrice.id,
          quantity,
        },
      ];

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userProfileId: $page.data.session && $page.data.session.user.id,
          products,
        }),
      });

      const data = await response.json();

      const stripe = await getStripe();

      const { error } = await stripe!.redirectToCheckout({
        sessionId: data.id,
      });

      if (error && error.message) checkoutErrorMessage = error.message;

      isLoadingCheckout = false;
    } catch (error) {
      console.log(error);
    }
  };

  $: {
    if (showAddToCartMessage)
      setTimeout(() => (showAddToCartMessage = false), 1000);
  }
</script>

<div class="flex flex-col gap-2 lg:hidden">
  <h1 class="nf-font-bold text-xl">
    <p>
      {product.name} - {product.color}
      {product.size ? `- ${product.size} ${product.size_unit}` : ''}
    </p>
  </h1>
  <!-- <Stars id={product.id} ratingAverage={product.rating_average} ratingCount={product.rating_count} /> -->
  {#if productPrice.quantity === 1}
    <p>
      <span class="nf-font-bold text-xl text-red-500"
        >{formatCurrency(productPrice.price)}</span
      >
      {formatPackage(productPrice.quantity, true)}
    </p>
  {:else}
    <p>
      <span class="nf-font-bold text-xl text-red-500"
        >{formatCurrency(productPrice.price)}</span
      >{formatPackage(productPrice.quantity, true)} ({formatCurrency(
        productPrice.price / productPrice.quantity
      )}/unit)
    </p>
  {/if}
</div>
<div class="flex flex-col gap-4 lg:flex-row">
  <div class="flex flex-col gap-4 lg:basis-3/5">
    {#if product.category === 'Feathers'}
      <div class="flex justify-center rounded bg-neutral-100 p-2">
        <img
          src={getPublicUrl(
            `${formatName(
              product.name,
              product.color,
              product.size,
              product.size_unit
            )}/0-${formatName(
              product.name,
              product.color,
              product.size,
              product.size_unit
            )}-1024x1024.webp`
          )}
          alt={product.name}
          width=""
          height=""
          class="object-cover"
        />
      </div>
    {:else}
      {#each productImagePublicUrls as publicUrl}
        <div class="flex justify-center rounded bg-neutral-100 p-2">
          <img
            src={publicUrl}
            alt={product.name}
            width=""
            height=""
            class="object-cover"
          />
        </div>
      {/each}
    {/if}
  </div>
  <div
    class="flex flex-1 flex-col gap-4 lg:sticky lg:top-4 lg:basis-2/5 lg:self-start"
  >
    <div class="hidden lg:flex lg:flex-col lg:gap-2">
      <h1 class="nf-font-bold text-xl">
        <p>
          {product.name} - {product.color}
          {product.size ? `- ${product.size} ${product.size_unit}` : ''}
        </p>
      </h1>
      <!-- <Stars id={product.id} ratingAverage={product.rating_average} ratingCount={product.rating_count} /> -->
      {#if productPrice.quantity === 1}
        <p>
          <span class="nf-font-bold text-xl text-red-500"
            >{formatCurrency(productPrice.price)}</span
          >
          {formatPackage(productPrice.quantity, true)}
        </p>
      {:else}
        <p>
          <span class="nf-font-bold text-xl text-red-500"
            >{formatCurrency(productPrice.price)}</span
          >{formatPackage(productPrice.quantity, true)} ({formatCurrency(
            productPrice.price / productPrice.quantity
          )}/unit)
        </p>
      {/if}
    </div>
    <div class="flex flex-col gap-2">
      <p class="nf-font-bold">Description</p>
      <p>{product.description}</p>
    </div>
    <div class="flex flex-col gap-2">
      <p class="nf-font-bold">Specifications</p>
      <ul class="list-inside list-disc">
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
            class={`${
              productPrice === price
                ? 'pointer-events-none border-black'
                : 'border-white'
            } nf-font-bold rounded border-2 bg-neutral-100 px-4 py-2 text-black disabled:opacity-50`}
            on:click={() => (productPrice = price)}
          >
            {formatPackage(price.quantity)}
          </button>
        {/each}
      </div>
    </div>
    <div class="flex flex-col items-start gap-2">
      <p class="nf-font-bold">Quantity</p>
      <Counter bind:value={quantity} />
    </div>
    <div class="flex flex-col gap-4 rounded border-2 border-neutral-100 p-4">
      {#if productPrice.quantity === 1}
        <p>
          <span class="nf-font-bold text-xl text-red-500"
            >{formatCurrency(productPrice.price)}</span
          >
          {formatPackage(productPrice.quantity, true)}
        </p>
      {:else}
        <p>
          <span class="nf-font-bold text-xl text-red-500"
            >{formatCurrency(productPrice.price)}</span
          >{formatPackage(productPrice.quantity, true)} ({formatCurrency(
            productPrice.price / productPrice.quantity
          )}/unit)
        </p>
      {/if}
      <p>Shipping and taxes calculated at checkout</p>
      <div class="flex flex-col gap-2">
        {#if showAddToCartMessage}
          <p class="rounded bg-neutral-100 px-4 py-2 text-center">
            Added to Cart ( {$cart.cartTotalItems} )
          </p>
        {:else}
          <button
            class="nf-font-bold rounded bg-yellow-500 px-4 py-2 text-white disabled:opacity-50"
            on:click={() => {
              cart.addCartItem(product, productPrice, quantity);
              showAddToCartMessage = true;
            }}
            disabled={showAddToCartMessage || isLoadingCheckout}
          >
            Add to Cart
          </button>
        {/if}
        {#if isLoadingCheckout}
          <p class="rounded bg-neutral-100 px-4 py-2 text-center">
            Redirecting to Checkout...
          </p>
        {:else}
          <button
            class="nf-font-bold rounded bg-orange-500 px-4 py-2 text-white disabled:opacity-50"
            on:click={async () => await checkout()}
            disabled={isLoadingCheckout}
          >
            Buy Now
          </button>
        {/if}
      </div>
    </div>
  </div>
</div>
