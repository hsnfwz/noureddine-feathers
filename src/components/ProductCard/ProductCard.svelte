<script lang="ts">
  import { onMount } from 'svelte';

  // helpers
  import { calculateSalePrice, formatCurrency, getMinPrice, getMaxPrice, formatCategory } from '$helpers/helpers';

  // interfaces
  import type I_ProductTableRecord from '$interfaces/I_ProductTableRecord';

  // components
  import Stars from '$components/Stars/Stars.svelte';
  import Link from '$components/Link/Link.svelte';
  import ProductCardSkeleton from '$components/ProductCard/ProductCardSkeleton.svelte';

  // props
  export let product: I_ProductTableRecord;

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
          src={product.thumbnail}
          alt={product.name}
          width="500"
          height="500"
        />
      </div>
    </Link>
    <div class="flex flex-col gap-2 pt-4">
      <p>{product.name}</p>
      <p class="text-gray-500">{product.color} &#183; {product.size}&#8243;</p>
      <div class="flex gap-2">
        <p>
          {formatCurrency(calculateSalePrice(getMinPrice(product.prices_quantities), product.sale_percent))} - {formatCurrency(calculateSalePrice(getMaxPrice(product.prices_quantities), product.sale_percent))}
        </p>
      </div>
      <Stars ratings={product.ratings.map((rating) => rating.rating)} id={product.id} />
    </div>
  </div>
{/if}