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
  <div class="flex flex-col gap-8 p-8">
    <div class="flex flex-col gap-8">
      <Heading>Feather Dusters</Heading>
      <ProductCardGrid products={data.featherDusters} />
      <Link
        href="/products/feather-dusters"
        customClass="text-center px-8 py-4 bg-neutral-100 self-center rounded-full hover:bg-black hover:text-white transition-all"
        >View All</Link
      >
    </div>
    <div class="flex flex-col gap-8">
      <Heading>Lambswool Dusters</Heading>
      <ProductCardGrid products={data.lambswoolDusters} />
      <Link
        href="/products/lambswool-dusters"
        customClass="text-center px-8 py-4 bg-neutral-100 self-center rounded-full hover:bg-black hover:text-white transition-all"
        >View All</Link
      >
    </div>
    <div class="flex flex-col gap-8">
      <Heading>Feathers</Heading>
      <ProductCardGrid products={data.feathers} />
      <Link
        href="/products/feathers"
        customClass="text-center px-8 py-4 bg-neutral-100 self-center rounded-full hover:bg-black hover:text-white transition-all"
        >View All</Link
      >
    </div>
    <div class="flex flex-col gap-8">
      <Heading>Eggshells</Heading>
      <ProductCardGrid products={data.eggshells} />
      <Link
        href="/products/eggshells"
        customClass="text-center px-8 py-4 bg-neutral-100 self-center rounded-full hover:bg-black hover:text-white transition-all"
        >View All</Link
      >
    </div>
  </div>
</div>
