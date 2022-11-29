<script lang="ts">
  // components
  import ProductDetails from '$components/ProductDetails/ProductDetails.svelte';

  // interfaces
  import type I_ProductTableRecord from '$interfaces/I_ProductTableRecord';

  export let data: { product: I_ProductTableRecord | undefined };
</script>

<svelte:head>
  <title>{data.product.name} | Noureddine Feathers</title>
  <meta name="description" content={`${data.product.name} | Noureddine Feathers - Shop feather dusters, eggshells, lambskins, and feathers`} />
</svelte:head>

<div class="mx-8">
  <div class="flex flex-col gap-8">
    <ProductDetails product={data.product} />
  </div>
</div>