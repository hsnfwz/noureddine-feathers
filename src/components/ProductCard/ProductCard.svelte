<script lang="ts">
  import { onMount, afterUpdate } from 'svelte';

  // storage
  import { getPublicUrl } from '$api/storage';

  // helpers
  import { formatCurrency, formatText, formatPackage, formatName } from '$helpers/helpers';

  // interfaces
  import type I_Product from '$interfaces/I_Product';

  // components
  import Stars from '$components/Stars/Stars.svelte';
  import Link from '$components/Link/Link.svelte';
  import ProductCardSkeleton from '$components/ProductCard/ProductCardSkeleton.svelte';

  // props
  export let product: I_Product;

  // state
  let isLoading: boolean = true;
  let src: string = '';

  onMount(() => isLoading = false);

  afterUpdate(() => {
    if (product.category === 'Feathers') {
      src = getPublicUrl(`${formatName(product.name, product.color, product.size, product.size_unit)}/0-${formatName(product.name, product.color, product.size, product.size_unit)}-1024x1024.webp`);
    } else {
      src = getPublicUrl(`${formatName(product.name, product.color, product.size, product.size_unit)}/${formatName(product.name, product.color, product.size, product.size_unit)}-0.webp`);
    }
  });
</script>

{#if isLoading}
  <ProductCardSkeleton />
{:else}
  <div class="flex flex-col">
    <Link href={`/${formatText(product.category)}/${product.id}-${formatText(product.name)}-${formatText(product.color)}-${product.size || ''}-${formatText(product.size_unit) || ''}`} ariaLabel={product.name}>
      <div class="flex justify-center p-2 bg-neutral-100 rounded-t-lg">
        <img
          src={src}
          alt={product.name}
          width=""
          height=""
          class="object-cover"
        />
      </div>
    </Link>
    <div class="flex flex-col gap-2 p-4 border-x-2 border-b-2 border-neutral-100 rounded-b-lg">
      <p>{product.name} - {product.color} {product.size ? `- ${product.size} ${product.size_unit}` : ''}</p>
      <div class="flex flex-col gap-2">
        {#each product.prices as productPrice}
          {#if productPrice.quantity === 1}
            <p><span class="text-xl text-red-500 nf-font-bold">{formatCurrency(productPrice.price)}</span> {formatPackage(productPrice.quantity, true)}</p>
          {:else}
            <p><span class="text-xl text-red-500 nf-font-bold">{formatCurrency(productPrice.price)}</span>{formatPackage(productPrice.quantity, true)} ({formatCurrency(productPrice.price / productPrice.quantity)}/unit)</p>
          {/if}
        {/each}
      </div>
    </div>
    <!-- <Stars id={product.id} ratingAverage={product.rating_average} ratingCount={product.rating_count} /> -->
  </div>
{/if}