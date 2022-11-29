<script lang="ts">
  // stores
  import { cart } from '$stores/CartStore';

  // helpers
  import { formatCurrency } from '$helpers/helpers';

  // config
  import getStripe from '$config/stripe';

  // interfaces
  import type I_ProductTableRecord from '$interfaces/I_ProductTableRecord';
  import type I_ProductPriceQuantityTableRecord from '$interfaces/I_ProductPriceQuantityTableRecord';

  // components
  import Stars from '$components/Stars/Stars.svelte';
  import Counter from '$components/Counter/Counter.svelte';
  import Button from '$components/Button/Button.svelte';
  import Heading from '$components/Heading/Heading.svelte';

  // props
  export let product: I_ProductTableRecord;

  // state
  let productPriceQuantity: I_ProductPriceQuantityTableRecord = product?.prices_quantities[0];
  let quantity: number = 1;
  let isLoadingCheckout: boolean = false;
  let checkoutErrorMessage: string = '';

  const checkout = async () => {
    try {
      isLoadingCheckout = true;

      const lineItems = [{
        price: productPriceQuantity.stripe_price_id,
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

<div class="flex flex-col md:flex-row gap-8 m-auto">
  <div class="flex flex-col gap-2 md:hidden">
    <h1 class="font-bold text-xl">{product.name}</h1>
    <h2 class="text-gray-500">{product.color} &#183; {product.size}&#8243;</h2>
    <Stars ratings={product.ratings.map(rating => rating.rating)} id={product.id} />
    <p>
      {formatCurrency(productPriceQuantity.price)} ({formatCurrency(productPriceQuantity.price / productPriceQuantity.quantity)} per unit)
    </p>
  </div>
  <div class="flex flex-col gap-4">
    <div class="bg-gray-100 p-2 flex justify-center">
      <img
        src={product.images[0].url}
        alt={product.name}
        width="1000"
        height="1000"
      />
    </div>
    <div class="bg-gray-100 p-2 flex justify-center">
      <img
        src={product.images[0].url}
        alt={product.name}
        width="1000"
        height="1000"
      />
    </div>
    <div class="bg-gray-100 p-2 flex justify-center">
      <img
        src={product.images[0].url}
        alt={product.name}
        width="1000"
        height="1000"
      />
    </div>
  </div>
  <div class="max-w-[600px]">
    <div class="flex flex-col gap-4 flex-1 sticky top-4">
      <div class="hidden md:flex md:flex-col md:gap-2">
        <h1 class="font-bold text-xl">{product.name}</h1>
        <h2 class="text-gray-500">{product.color} &#183; {product.size}&#8243;</h2>
        <Stars ratings={product.ratings.map(rating => rating.rating)} id={product.id} />
        <p>
          {formatCurrency(productPriceQuantity.price)} ({formatCurrency(productPriceQuantity.price / productPriceQuantity.quantity)} per unit)
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <p class="text-gray-500">Description</p>
        <p>{product.description}</p>
      </div>
      <div class="flex flex-col gap-2">
        <p class="text-gray-500">Details</p>
        <ul class="list-disc list-inside">
          <li>Category: {product.category}</li>
          <li>Color: {product.color}</li>
          <li>Size: {product.size}&#8243;</li>
        </ul>
      </div>
      <div class="flex flex-col gap-2">
        <p class="text-gray-500">Package</p>
        <div class="flex gap-2">
          <!-- <Button
            handleClick={() => console.log('single package')}
            disabled={true}
            customClass="text-black bg-gray-100"
          >
            <span>Single</span>
          </Button> -->
          {#each product.prices_quantities as priceQuantity}
          <div class={`${productPriceQuantity === priceQuantity ? 'pointer-events-none outline outline-2 outline-black' : 'outline-none'}`}>
              <Button
                handleClick={() => productPriceQuantity = priceQuantity}
                customClass={`text-black bg-gray-100 p-2 lowercase`}
              >
                <span>{(priceQuantity.quantity === 12 && '1 dz.') || (priceQuantity.quantity === 60 && '5 dz.')}</span>
              </Button>
            </div>
          {/each}
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <p class="text-gray-500">Quantity</p>
        <Counter bind:value={quantity} />
      </div>
      <div class="flex flex-col gap-2">
        <Button
          handleClick={() => cart.addCartProduct(product, productPriceQuantity, quantity)}
          customClass="uppercase text-white bg-orange-500 p-2"
        >
          <span>Add to Cart</span>
        </Button>
        <Button
          handleClick={async () => await checkout()}
          customClass="uppercase text-white bg-orange-300 p-2"
          disabled={isLoadingCheckout}
        >
          <span>Buy Now</span>
        </Button>
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