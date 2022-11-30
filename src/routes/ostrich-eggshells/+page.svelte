<script lang="ts">
  // components
  import Heading from '$components/Heading/Heading.svelte';
  import ProductCardGrid from '$components/ProductCardGrid/ProductCardGrid.svelte';

  // interfaces
  import type I_Product from '$interfaces/I_Product';

  export let data: { products: I_Product[] };
</script>

<svelte:head>
  <title>Ostrich Eggshells | Noureddine Feathers</title>
  <meta name="description" content="Ostrich Eggshells | Noureddine Feathers - Shop ostrich feather dusters, lambswool dusters, extendable lambswool dusters, ostrich eggshells, and ostrich feathers - handmade from 100% natural farm-raised ostrich feathers and eggshells" />
</svelte:head>

<div class="mx-8">
  <div class="flex flex-col gap-8">
    <Heading>
      <span>Ostrich Eggshells</span>
    </Heading>
    <ProductCardGrid products={data.products} />
  </div>
</div>