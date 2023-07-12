<script lang="ts">
  // components
  import Heading from "$components/Heading/Heading.svelte";
  import ProductCardGrid from "$components/ProductCardGrid/ProductCardGrid.svelte";

  // interfaces
  import type I_Product from "$interfaces/I_Product";

  export let data: { products: I_Product[] };
</script>

<svelte:head>
  <title>Feather Dusters | Noureddine Feathers</title>
  <meta
    name="description"
    content="Feather Dusters | Noureddine Feathers - Shop premium ostrich feather dusters, premium extendable lambswool dusters, premium lambswool dusters, ostrich feathers, and ostrich eggshells - handmade from 100% natural farm-raised ostrich feathers and eggshells"
  />
</svelte:head>

<Heading>
  <span>Feather Dusters</span>
</Heading>
<ProductCardGrid products={data.products} />
