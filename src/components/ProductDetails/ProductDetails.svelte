<script lang="ts">
  // stores
  import { cart } from '$stores/CartStore';

  // helpers
  import { formatCurrency, formatPackage } from '$helpers/helpers';

  // config
  import getStripe from '$config/stripe';

  // interfaces
  import type I_Product from '$interfaces/I_Product';
  import type I_ProductPriceTableRecord from '$interfaces/I_ProductPriceTableRecord';

  // components
  import Stars from '$components/Stars/Stars.svelte';
  import Counter from '$components/Counter/Counter.svelte';
  import Button from '$components/Button/Button.svelte';

  // props
  export let product: I_Product;
  export let productImagePublicUrls: string[];

  // state
  let productPrice: I_ProductPriceTableRecord = product?.prices[0];
  let quantity: number = 1;
  let isLoadingCheckout: boolean = false;
  let checkoutErrorMessage: string = '';

  const checkout = async () => {
    try {
      isLoadingCheckout = true;

      const lineItems = [{
        price: productPrice.stripe_price_id,
        quantity,
      }];

      let discounts = undefined;
      
      // if (promoCode) discounts = [{ coupon: promoCode }];

      const body = {
        lineItems,
        discounts,
      };

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
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
</script>

<div class="flex flex-col lg:flex-row gap-8 m-auto">
  <div class="max-w-[500px] flex flex-col gap-8">
    <div class="flex flex-col gap-2 lg:hidden">
      <h1 class="nf-font-bold text-xl">{product.name}</h1>
      <h2 class="text-gray-500">{product.color} {product.size ? `- ${product.size} ${product.size_unit}`: ''}</h2>
      <Stars id={product.id} ratingAverage={product.rating_average} ratingCount={product.rating_count} />
      <p>
        {formatCurrency(productPrice.price)} ({formatCurrency(productPrice.price / productPrice.quantity)} per unit)
      </p>
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
    <div class="flex flex-col gap-4 flex-1 sticky top-4">
      <div class="hidden lg:flex lg:flex-col lg:gap-2">
        <h1 class="nf-font-bold text-xl">{product.name}</h1>
        <h2 class="text-gray-500">{product.color} {product.size ? `- ${product.size} ${product.size_unit}`: ''}</h2>
        <Stars id={product.id} ratingAverage={product.rating_average} ratingCount={product.rating_count} />
        <p>
          {formatCurrency(productPrice.price)} ({formatCurrency(productPrice.price / productPrice.quantity)} per unit)
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <p class="text-gray-500">Description</p>
        <p>{product.description}</p>
      </div>
      <div class="flex flex-col gap-2">
        <p class="text-gray-500">Details</p>
        <ul class="list-disc list-inside">
          <li><span class="nf-font-bold">Category:</span> {product.name}s</li>
          <li><span class="nf-font-bold">Color:</span> {product.color}</li>
          {#if product.size}
            <li><span class="nf-font-bold">Size:</span> {product.size} {product.size_unit}</li>
          {/if}
        </ul>
        <p>*Because our products are handmade, sizes and/or colors may vary slightly</p>
      </div>
      <div class="flex flex-col gap-2">
        <p class="text-gray-500">Package</p>
        <div class="flex gap-2">
          {#each product.prices as price}
            <div class={`${productPrice === price ? 'pointer-events-none outline outline-2 outline-black' : 'outline-none'}`}>
              <button
                class="rounded px-4 py-2 bg-neutral-100 text-black nf-font-bold disabled:opacity-50"
                on:click={() => productPrice = price}
              >
                {formatPackage(price.quantity)}
              </button>
            </div>
          {/each}
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <p class="text-gray-500">Quantity</p>
        <Counter bind:value={quantity} />
      </div>
      <div class="flex flex-col gap-2">
        <button
          class="rounded px-4 py-2 bg-orange-500 text-white nf-font-bold disabled:opacity-50"
          on:click={() => cart.addCartItem(product, productPrice, quantity)}
        >
          Add to Cart
        </button>
        <button
          class="rounded px-4 py-2 bg-orange-300 text-white nf-font-bold disabled:opacity-50"
          on:click={async () => await checkout()}
          disabled={isLoadingCheckout}
        >
          Buy Now
        </button>
        {#if isLoadingCheckout}
          <div class="flex justify-center uppercase p-2">
            <p>Redirecting to Checkout...</p>
          </div>
        {/if}
        {#if checkoutErrorMessage !== ''}
          <p class="text-rose-500">*{checkoutErrorMessage}</p>
        {/if}
      </div>
    </div>
  </div>
</div>