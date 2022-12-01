<script lang="ts">
  import { onMount } from 'svelte';

  // helpers
  import { formatCurrency, formatText, formatPackage } from '$helpers/helpers';

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

  onMount(() => isLoading = false);
</script>

{#if isLoading}
  <ProductCardSkeleton />
{:else}
  <div class="flex flex-col gap-4">
    <Link href={`/${formatText(product.name)}s/${product.id}-${formatText(product.name)}-${formatText(product.color)}-${product.size || ''}-${formatText(product.size_unit) || ''}`} ariaLabel={product.name}>
      <div class="flex justify-center p-2 bg-gray-100 hover:opacity-25 transition-all">
        <img
          src={product.thumbnail_url}
          alt={product.name}
          width=""
          height=""
          class="object-cover"
        />
      </div>
    </Link>
    <div class="flex flex-col gap-2">
      <p>{product.name}</p>
      <p class="text-gray-500">{product.color} {product.size ? `- ${product.size} ${product.size_unit}` : ''}</p>
      <div class="flex flex-col gap-2">
        {#each product.prices as productPrice}
          <p>{formatCurrency(productPrice.price / productPrice.quantity)} per unit {formatPackage(productPrice.quantity, true)}</p>
        {/each}
      </div>
    </div>
    <Stars id={product.id} ratingAverage={product.rating_average} ratingCount={product.rating_count} />
  </div>
{/if}