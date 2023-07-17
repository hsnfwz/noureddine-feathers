<!-- @format -->
<script lang="ts">
  export let heading: string = '';
  export let data;

  // components
  import Heading from '$components/Heading.svelte';
  import ProductCardGrid from '$components/ProductCardGrid.svelte';
</script>

<div class="flex flex-col gap-8 p-8">
  <Heading>
    <span>{heading}</span>
  </Heading>
  <ProductCardGrid products={data.products} />
</div>
