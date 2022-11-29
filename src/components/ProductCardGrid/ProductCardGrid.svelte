<script lang="ts">
  // interfaces
  import type I_ProductTableRecord from '$interfaces/I_ProductTableRecord';

  // components
  import ProductCard from '$components/ProductCard/ProductCard.svelte';

  // props
  export let products: I_ProductTableRecord[] = [];
</script>

<div class="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
  {#each products as product}
    <ProductCard {product} />
  {/each}
</div>