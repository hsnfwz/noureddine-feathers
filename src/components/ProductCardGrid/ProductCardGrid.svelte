<script lang="ts">
  // interfaces
  import type I_Product from '$interfaces/I_Product';

  // components
  import ProductCard from '$components/ProductCard/ProductCard.svelte';

  // props
  export let products: I_Product[] = [];
</script>

<div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {#each products as product}
    <ProductCard {product} />
  {/each}
</div>