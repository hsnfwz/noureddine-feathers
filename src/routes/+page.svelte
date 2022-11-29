<script lang="ts">
  // components
  import Heading from '$components/Heading/Heading.svelte';
  import Hero from '$components/Hero/Hero.svelte';
  import Link from '$components/Link/Link.svelte';
  import ProductCardGrid from '$components/ProductCardGrid/ProductCardGrid.svelte';

  // interfaces
  import type I_ProductTableRecord from '$interfaces/I_ProductTableRecord';

  // data
  export let data: { products: I_ProductTableRecord[] } = { products: [] };

  const blackFeatherDusters = data.products.filter((featherDuster: I_ProductTableRecord) => featherDuster.color === 'Premium Black');

  const grayFeatherDusters = data.products.filter((featherDuster: I_ProductTableRecord) => featherDuster.color === 'Premium Gray');
</script>

<svelte:head>
  <title>Noureddine Feathers</title>
  <meta name="description" content="Noureddine Feathers - Shop feather dusters, eggshells, lambskins, and feathers" />
</svelte:head>

<!-- <Hero /> -->

<div class="mx-8">
  <div class="flex flex-col gap-8">
    <div class="flex flex-col md:flex-row gap-4">
      <div class="flex flex-grow items-center">
        <Heading>
          <span>Feather Dusters - Premium Black</span>
        </Heading>
      </div>
      <div class="flex items-center ">
        <Link href="/feather-dusters" ariaLabel="feather-dusters">
          <span>View All</span>
        </Link>
      </div>
    </div>
    <ProductCardGrid products={blackFeatherDusters} />
    <div class="flex flex-col md:flex-row gap-4">
      <div class="flex flex-grow items-center">
        <Heading>
          <span>Feather Dusters - Premium Gray</span>
        </Heading>
      </div>
      <div class="flex items-center">
        <Link href="/feather-dusters" ariaLabel="feather-dusters">
          <span>View All</span>
        </Link>
      </div>
    </div>
    <ProductCardGrid products={grayFeatherDusters} />
  </div>
</div>