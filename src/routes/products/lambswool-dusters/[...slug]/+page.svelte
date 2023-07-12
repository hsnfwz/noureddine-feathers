<script lang="ts">
  // components
  import ProductDetails from "$components/ProductDetails/ProductDetails.svelte";

  // interfaces
  import type I_Product from "$interfaces/I_Product";

  export let data: { product: I_Product; productImagePublicUrls: string[] };
</script>

<svelte:head>
  <title>{data.product.name} | Noureddine Feathers</title>
  <meta
    name="description"
    content={`${data.product.name} | Noureddine Feathers - Shop premium ostrich feather dusters, premium extendable lambswool dusters, premium lambswool dusters, ostrich feathers, and ostrich eggshells - handmade from 100% natural farm-raised ostrich feathers and eggshells`}
  />
</svelte:head>

<ProductDetails
  product={data.product}
  productImagePublicUrls={data.productImagePublicUrls}
/>
