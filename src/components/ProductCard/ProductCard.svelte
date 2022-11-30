<script lang="ts">
  import { onMount } from 'svelte';

  // helpers
  import { formatCurrency, getMinPrice, getMaxPrice, formatCategory } from '$helpers/helpers';

  // interfaces
  import type I_Product from '$interfaces/I_Product';

  // components
  import Stars from '$components/Stars/Stars.svelte';
  import Link from '$components/Link/Link.svelte';
  import ProductCardSkeleton from '$components/ProductCard/ProductCardSkeleton.svelte';

  // props
  export let product: I_Product;

  // state
  let loading: boolean = true;

  onMount(() => loading = false);
</script>

{#if loading}
  <ProductCardSkeleton />
{:else}
  <div class="flex flex-col">
    <Link href={`/${formatCategory(product.category)}/${product.id}`} ariaLabel={product.name}>
      <div class="flex justify-center p-2 bg-gray-100 hover:opacity-25 transition-all">
        <img
          src={product.thumbnail_url}
          alt={product.name}
          width="500"
          height="500"
        />
      </div>
    </Link>
    <div class="flex flex-col gap-2 pt-4">
      <p>{product.name}</p>
      <p class="text-gray-500">{product.color} {product.size ? `- ${product.size} ${product.size_unit}` : ''}</p>
      <div class="flex gap-2">
        <p>
          {formatCurrency(getMinPrice(product.prices))} - {formatCurrency(getMaxPrice(product.prices))}
        </p>
      </div>
      <Stars id={product.id} ratingAverage={product.rating_average} ratingCount={product.rating_count} />
    </div>
  </div>
{/if}