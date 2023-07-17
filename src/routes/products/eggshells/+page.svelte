<!-- @format -->
<script lang="ts">
  import ProductsTemplate from '$templates/ProductsTemplate.svelte';

  export let data;
</script>

<svelte:head>
  <title>Eggshells | Noureddine Feathers</title>
  <meta
    name="description"
    content="Eggshells | Noureddine Feathers - Shop premium ostrich feather dusters, premium extendable lambswool dusters, premium lambswool dusters, ostrich feathers, and ostrich eggshells - handmade from 100% natural farm-raised ostrich feathers and eggshells"
  />
</svelte:head>

<ProductsTemplate heading="Eggshells" {data} />
