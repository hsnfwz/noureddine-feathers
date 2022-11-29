<script lang="ts">
  // components
  import Heading from '$components/Heading/Heading.svelte';
  import ProductCardGrid from '$components/ProductCardGrid/ProductCardGrid.svelte';

  // interfaces
  import type I_ProductTableRecord from '$interfaces/I_ProductTableRecord';

  export let data: { products: I_ProductTableRecord[] | undefined } = { products: [] };
</script>

<svelte:head>
  <title>Feather Dusters | Noureddine Feathers</title>
  <meta name="description" content="Feather Dusters | Noureddine Feathers - Shop feather dusters, eggshells, lambskins, and feathers" />
</svelte:head>

<div class="mx-8">
  <div class="flex flex-col gap-8">
    <Heading>
      <span>Feather Dusters</span>
    </Heading>
    <ProductCardGrid products={data.products} />
  </div>
</div>