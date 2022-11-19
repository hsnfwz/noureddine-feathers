<script lang="ts">
  // stores
  import { cart } from 'stores/CartStore';

  // utils
  import { formatCurrency } from 'utils/helpers';

  // types
  import type ProductType from 'types/ProductType';
  import type ProductPriceQuantityType from 'types/ProductPriceQuantityType';

  // components
  import Stars from 'components/shared/Stars.svelte';
  import Counter from 'components/shared/Counter.svelte';
  import Button from 'components/shared/Button.svelte';
  import ChevronLeftIcon from 'components/icons/ChevronLeftIcon.svelte';
  import ChevronRightIcon from 'components/icons/ChevronRightIcon.svelte';

  // props
  export let product: ProductType | undefined;

  // state
  let imageIndex: number = 0;
  let productPriceQuantity: ProductPriceQuantityType | undefined = product?.prices_quantities[0];
  let quantity: number = 1;

  const previousImage = () => {
    if (product) {
      imageIndex = imageIndex - 1;

      if (imageIndex === -1) imageIndex = product.images.length - 1;
    }
  }
  
  const nextImage = () => {
    if (product) {
      imageIndex = imageIndex + 1;

      if (imageIndex === product.images.length) imageIndex = 0;
    }
  }

  const currentImage = (index: number) => {
    imageIndex = index;
  }
</script>

{#if product && productPriceQuantity}
  <div class="flex">
    <div class="flex flex-col gap-4">
      <div class="flex gap-4">
        <div class="flex justify-center items-center">
          <Button onClick={() => previousImage()}>
            <ChevronLeftIcon />
          </Button>
        </div>
        <div class="bg-gray-100">
          <img
            src={product.images.at(imageIndex)?.url}
            alt={product.name}
            width="500"
            height="500"
          />
        </div>
        <div class="flex justify-center items-center">
          <Button onClick={() => nextImage()}>
            <ChevronRightIcon />
          </Button>
        </div>
      </div>
      <div class="flex justify-center items-center gap-4">
        {#each product.images as image, index}
          <Button onClick={() => currentImage(index)}>
            <div class="bg-gray-100">
              <img
                src={image.url}
                alt={product.name}
                width="100"
                height="100"
              />
            </div>
          </Button>
        {/each}
      </div>
    </div>
    <div class="flex flex-col gap-4">
      <h1 class="font-bold text-5xl">{product.name}</h1>
      <h2 class="text-gray-400 text-2xl">{product.color} &#183; {product.size}&#8243;</h2>
      <div class="flex">
        <Stars ratings={product.ratings.map(rating => rating.rating)} id={product.id} />
      </div>
      <div class="flex">
        <p>
          {formatCurrency(productPriceQuantity.price)} ({formatCurrency(productPriceQuantity.price / productPriceQuantity.quantity)} per unit)
        </p>
      </div>
      <div class="flex">
        <p>Description</p>
        <p>{product.description}</p>
      </div>
      <div class="flex">
        <p>Specifications</p>
        <p>Category: {product.category}</p>
        <p>Color: {product.color}</p>
        <p>Size: {product.size}&#8243;</p>
      </div>
      <div class="flex gap-4">
        <p>Package</p>
        <Button
          text="Single"
          onClick={() => console.log('single package')}
          disabled={true}
        />
        {#each product.prices_quantities as priceQuantity}
          <Button
            onClick={() => productPriceQuantity = priceQuantity}
          >
            {#if priceQuantity.quantity === 12}
              <p>1 dz.</p>
            {:else if priceQuantity.quantity === 60}
              <p>5 dz.</p>
            {/if}
          </Button>
        {/each}
      </div>
      <Counter label="Quantity" bind:value={quantity} />
      <div class="flex flex-col gap-4">
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
          onClick={() => console.log('buy now')}
          uppercase={true}
        />
      </div>
    </div>
  </div>
{:else}
  <p>Product not found...</p>
{/if}