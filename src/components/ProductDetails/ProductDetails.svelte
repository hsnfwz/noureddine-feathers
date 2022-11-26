<script lang="ts">
  // stores
  import { cart } from 'stores/CartStore';

  // utils
  import { formatCurrency } from 'utils/helpers';

  // config
  import getStripe from 'config/stripe';

  // types
  import type ProductType from 'types/ProductType';
  import type ProductPriceQuantityType from 'types/ProductPriceQuantityType';

  // components
  import Stars from 'components/shared/Stars.svelte';
  import Counter from 'components/shared/Counter.svelte';
  import Button from 'components/shared/Button.svelte';

  // props
  export let product: ProductType | undefined;

  // state
  let productPriceQuantity: ProductPriceQuantityType | undefined = product?.prices_quantities[0];
  let quantity: number = 1;

  const checkout = async () => {
    try {
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

      const response = await fetch('/api/checkout-sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      // TODO: show loading here (as well as other places)
      // Redirect to Checkout.
      const stripe = await getStripe();
      const { error } = await stripe!.redirectToCheckout({
        // Make the id field from the Checkout Session creation API response
        // available to this file, so you can provide it as parameter here
        // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
        sessionId: data.id,
      });
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `error.message`.
      console.warn(error.message);
    } catch (error) {
      console.log(error);
    }
  }
</script>

{#if product && productPriceQuantity}
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
            <Button
              text="Single"
              onClick={() => console.log('single package')}
              disabled={true}
              buttonColor="bg-gray-100"
              textColor="text-black"
            />
            {#each product.prices_quantities as priceQuantity}
              <Button
                onClick={() => productPriceQuantity = priceQuantity}
                buttonColor="bg-gray-100"
                textColor="text-black"
                text={(priceQuantity.quantity === 12 && '1 dz.') || (priceQuantity.quantity === 60 && '5 dz.')}
                borderClass={productPriceQuantity === priceQuantity ? 'border-2 border-black' : ''}
              />
            {/each}
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <p class="text-gray-500">Quantity</p>
          <Counter bind:value={quantity} />
        </div>
        <div class="flex flex-col gap-2">
          <Button
            text="Add to Cart"
            textColor="text-white"
            buttonColor="bg-orange-500"
            onClick={() => cart.addCartProduct(product, productPriceQuantity, quantity)}
            uppercase={true}
          />
          <Button
            text="Buy Now"
            textColor="text-white"
            buttonColor="bg-orange-300"
            onClick={async () => await checkout()}
            uppercase={true}
          />
        </div>
      </div>
    </div>
  </div>
{:else}
  <p>Product not found...</p>
{/if}