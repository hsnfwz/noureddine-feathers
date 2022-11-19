<script lang="ts">
  // types
  import type ProductType from 'types/ProductType';

  // components
  import ProductCard from 'components/ProductCard/ProductCard.svelte';

  // props
  export let products: ProductType[] = [];
</script>

<div class="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
  {#each products as product}
    <ProductCard {product} />
  {/each}
</div>