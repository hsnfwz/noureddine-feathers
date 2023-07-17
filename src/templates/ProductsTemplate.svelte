<!-- @format -->
<script lang="ts">
  export let heading: string = '';
  export let data;

  // components
  import Heading from '$components/Heading.svelte';
  import ProductCardGrid from '$components/ProductCardGrid.svelte';
</script>

<div class="m-8 flex flex-col gap-8">
  <Heading>
    <span>{heading}</span>
  </Heading>
  <ProductCardGrid products={data.products} />
</div>
