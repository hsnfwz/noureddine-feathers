<!-- @format -->
<script lang="ts">
  import HomeTemplate from '$templates/HomeTemplate.svelte';

  // data
  export let data;
</script>

<svelte:head>
  <title>Noureddine Feathers</title>
  <meta
    name="description"
    content="Noureddine Feathers - Shop premium ostrich feather dusters, premium extendable lambswool dusters, premium lambswool dusters, ostrich feathers, and ostrich eggshells - handmade from 100% natural farm-raised ostrich feathers and eggshells"
  />
</svelte:head>

<HomeTemplate {data} />
