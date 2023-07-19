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
  import Stars from '$components/Stars.svelte';
  import Counter from '$components/Counter.svelte';
  import Button from '$components/Button.svelte';
  import Divider from '$components/Divider.svelte';
  import Link from '$components/Link.svelte';

  export let data;

  // state
  let productPrice: I_ProductPriceTableRecord = data.product?.prices[0];
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

<div class="flex flex-col gap-8 p-8">
  <div class="flex flex-col gap-4 lg:hidden">
    <h1 class="montserrat-bold text-xl">
      <p>
        {data.product.name} - {data.product.color}
        {data.product.size
          ? `- ${data.product.size} ${data.product.size_unit}`
          : ''}
      </p>
    </h1>
    <Stars
      id={data.product.id}
      ratingAverage={data.product.rating_average}
      ratingCount={data.product.rating_count}
    />
    {#if data.product.category === 'Feather Dusters' && !$page.data.session}
      <p>
        <Link
          href="/account/sign-in"
          customClass="text-sky-500 hover:underline transition-all"
          >Sign in</Link
        > to view prices
      </p>
    {:else if productPrice.quantity === 1}
      <p>
        <span class="montserrat-bold text-xl text-rose-500"
          >{formatCurrency(productPrice.price)}</span
        >
        {formatPackage(productPrice.quantity, true)}
      </p>
    {:else}
      <p>
        <span class="montserrat-bold text-xl text-rose-500"
          >{formatCurrency(productPrice.price)}</span
        >{formatPackage(productPrice.quantity, true)} ({formatCurrency(
          productPrice.price / productPrice.quantity
        )}/unit)
      </p>
    {/if}
  </div>
  <div class="flex flex-col gap-8 lg:flex-row">
    <div class="flex w-full flex-col gap-8 lg:w-3/5">
      {#if data.product.category === 'Feathers'}
        <div class="flex justify-center rounded bg-neutral-100 p-2">
          <img
            src={getPublicUrl(
              `${formatName(
                data.product.name,
                data.product.color,
                data.product.size,
                data.product.size_unit
              )}/0-${formatName(
                data.product.name,
                data.product.color,
                data.product.size,
                data.product.size_unit
              )}-1024x1024.webp`
            )}
            alt={data.product.name}
            width=""
            height=""
            class="object-cover"
          />
        </div>
      {:else}
        {#each data.productImagePublicUrls as publicUrl}
          <div class="flex justify-center rounded bg-neutral-100 p-2">
            <img
              src={publicUrl}
              alt={data.product.name}
              width=""
              height=""
              class="object-cover"
            />
          </div>
        {/each}
      {/if}
    </div>
    <div
      class="flex w-full flex-1 flex-col gap-8 lg:sticky lg:top-4 lg:w-2/5 lg:self-start"
    >
      <div class="hidden lg:flex lg:flex-col lg:gap-4">
        <h1 class="montserrat-bold text-xl">
          <p>
            {data.product.name} - {data.product.color}
            {data.product.size
              ? `- ${data.product.size} ${data.product.size_unit}`
              : ''}
          </p>
        </h1>
        <Stars
          id={data.product.id}
          ratingAverage={data.product.rating_average}
          ratingCount={data.product.rating_count}
        />
        {#if data.product.category === 'Feather Dusters' && !$page.data.session}
          <p>
            <Link
              href="/account/sign-in"
              customClass="text-sky-500 hover:underline transition-all"
              >Sign in</Link
            > to view prices
          </p>
        {:else if productPrice.quantity === 1}
          <p>
            <span class="montserrat-bold text-xl text-rose-500"
              >{formatCurrency(productPrice.price)}</span
            >
            {formatPackage(productPrice.quantity, true)}
          </p>
        {:else}
          <p>
            <span class="montserrat-bold text-xl text-rose-500"
              >{formatCurrency(productPrice.price)}</span
            >{formatPackage(productPrice.quantity, true)} ({formatCurrency(
              productPrice.price / productPrice.quantity
            )}/unit)
          </p>
        {/if}
      </div>
      <div class="flex flex-col gap-4">
        <p class="montserrat-bold">Description</p>
        <p>{data.product.description}</p>
      </div>
      <div class="flex flex-col gap-4">
        <p class="montserrat-bold">Specifications</p>
        <ul class="list-inside list-disc">
          <li>{data.product.color}</li>
          {#if data.product.size}
            <li>
              {data.product.size}
              {data.product.size_unit}
            </li>
          {/if}
        </ul>
      </div>
      <div class="flex flex-col gap-4">
        <p class="montserrat-bold">Package</p>
        <div class="flex gap-4">
          {#each data.product.prices as price}
            <Button
              customClass="bg-neutral-100"
              handleClick={() => (productPrice = price)}
              selected={productPrice === price}
            >
              {formatPackage(price.quantity)}
            </Button>
          {/each}
        </div>
      </div>
      <div class="flex flex-col items-start gap-4">
        <p class="montserrat-bold">Quantity</p>
        <Counter bind:value={quantity} />
      </div>
      <Divider />
      {#if data.product.category === 'Feather Dusters' && !$page.data.session}
        <p>
          <Link
            href="/account/sign-in"
            customClass="text-sky-500 hover:underline transition-all"
            >Sign in</Link
          > to purchase
        </p>
      {:else}
        <div class="flex flex-col gap-8">
          {#if data.product.category === 'Feather Dusters' && !$page.data.session}
            <p>
              <Link
                href="/account/sign-in"
                customClass="text-sky-500 hover:underline transition-all"
                >Sign in</Link
              > to view prices
            </p>
          {:else if productPrice.quantity === 1}
            <p>
              <span class="montserrat-bold text-xl text-rose-500"
                >{formatCurrency(productPrice.price)}</span
              >
              {formatPackage(productPrice.quantity, true)}
            </p>
          {:else}
            <p>
              <span class="montserrat-bold text-xl text-rose-500"
                >{formatCurrency(productPrice.price)}</span
              >{formatPackage(productPrice.quantity, true)} ({formatCurrency(
                productPrice.price / productPrice.quantity
              )}/unit)
            </p>
          {/if}
          <p>Shipping and taxes calculated at checkout</p>
          <div class="flex flex-col gap-4">
            <Button
              customClass="px-8 py-4 rounded-full bg-yellow-400 text-white hover:bg-yellow-500 transition-all disabled:opacity-100 disabled:bg-neutral-100"
              disabled={showAddToCartMessage}
              handleClick={() => {
                cart.addCartItem(data.product, productPrice, quantity);
                showAddToCartMessage = true;
              }}
            >
              {#if showAddToCartMessage}
                <span class="text-black"
                  >Added to Cart ( {$cart.cartTotalItems} )</span
                >
              {:else}
                Add to Cart
              {/if}
            </Button>
            <Button
              customClass="px-8 py-4 rounded-full bg-orange-400 text-white hover:bg-orange-500 transition-all disabled:opacity-100 disabled:bg-neutral-100"
              disabled={isLoadingCheckout}
              handleClick={async () => await checkout()}
            >
              {#if isLoadingCheckout}
                <span class="text-black">Redirecting to Checkout...</span>
              {:else}
                Buy Now
              {/if}
            </Button>
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>
