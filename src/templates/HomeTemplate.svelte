<!-- @format -->
<script lang="ts">
  // components
  import Heading from '$components/Heading.svelte';
  import Hero from '$components/Hero.svelte';
  import Link from '$components/Link.svelte';
  import ProductCardGrid from '$components/ProductCardGrid.svelte';

  // data
  export let data;
</script>

<div class="flex flex-col">
  <Hero />
  <div class="m-8 flex flex-col gap-8">
    <div class="flex flex-col gap-8">
      <Heading>Feather Dusters</Heading>
      <ProductCardGrid products={data.featherDusters} />
      <Link
        href="/products/feather-dusters"
        customClass="text-center px-4 py-2 bg-neutral-100 self-center rounded"
        >View All</Link
      >
    </div>
    <div class="flex flex-col gap-8">
      <Heading>Lambswool Dusters</Heading>
      <ProductCardGrid products={data.lambswoolDusters} />
      <Link
        href="/products/lambswool-dusters"
        customClass="text-center px-4 py-2 bg-neutral-100 self-center rounded"
        >View All</Link
      >
    </div>
    <div class="flex flex-col gap-8">
      <Heading>Feathers</Heading>
      <ProductCardGrid products={data.feathers} />
      <Link
        href="/products/feathers"
        customClass="text-center px-4 py-2 bg-neutral-100 self-center rounded"
        >View All</Link
      >
    </div>
    <div class="flex flex-col gap-8">
      <Heading>Eggshells</Heading>
      <ProductCardGrid products={data.eggshells} />
      <Link
        href="/products/eggshells"
        customClass="text-center px-4 py-2 bg-neutral-100 self-center rounded"
        >View All</Link
      >
    </div>
  </div>
</div>
