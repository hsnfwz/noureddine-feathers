<script lang="ts">
  // components
  import Heading from '$components/Heading/Heading.svelte';
  import Hero from '$components/Hero/Hero.svelte';
  import Link from '$components/Link/Link.svelte';
  import ProductCardGrid from '$components/ProductCardGrid/ProductCardGrid.svelte';

  // interfaces
  import type I_Product from '$interfaces/I_Product';

  // data
  export let data: {
    featherDusters: I_Product[],
    extendableLambswoolDusters: I_Product[],
    lambswoolDusters: I_Product[],
    ostrichFeathers: I_Product[],
    eggshells: I_Product[],
  };
</script>

<svelte:head>
  <title>Noureddine Feathers</title>
  <meta name="description" content="Noureddine Feathers - Shop ostrich feather dusters, lambswool dusters, extendable lambswool dusters, ostrich eggshells, and ostrich feathers - handmade from 100% natural farm-raised ostrich feathers and eggshells" />
</svelte:head>

<!-- <Hero /> -->

<div class="mx-8">
  <div class="flex flex-col gap-8">
    
    <div class="flex flex-col md:flex-row gap-4">
      <div class="flex flex-grow items-center">
        <Heading>
          <span>Ostrich Feather Dusters</span>
        </Heading>
      </div>
      <div class="flex items-center ">
        <Link href="/ostrich-feather-dusters" ariaLabel="ostrich feather dusters">
          <span>View All</span>
        </Link>
      </div>
    </div>

    <ProductCardGrid products={data.featherDusters} />

    <div class="flex flex-col md:flex-row gap-4">
      <div class="flex flex-grow items-center">
        <Heading>
          <span>Lambswool Dusters</span>
        </Heading>
      </div>
      <div class="flex items-center">
        <Link href="/lambswool-dusters" ariaLabel="lambswool dusters">
          <span>View All</span>
        </Link>
      </div>
    </div>

    <ProductCardGrid products={data.lambswoolDusters} />

    <div class="flex flex-col md:flex-row gap-4">
      <div class="flex flex-grow items-center">
        <Heading>
          <span>Extendable Lambswool Dusters</span>
        </Heading>
      </div>
      <div class="flex items-center">
        <Link href="/extendable-lambswool-dusters" ariaLabel="extendable lambswool dusters">
          <span>View All</span>
        </Link>
      </div>
    </div>
    
    <ProductCardGrid products={data.extendableLambswoolDusters} />

    <div class="flex flex-col md:flex-row gap-4">
      <div class="flex flex-grow items-center">
        <Heading>
          <span>Ostrich Feathers</span>
        </Heading>
      </div>
      <div class="flex items-center">
        <Link href="/ostrich-feathers" ariaLabel="ostrich feathers">
          <span>View All</span>
        </Link>
      </div>
    </div>
    
    <ProductCardGrid products={data.ostrichFeathers} />

    <div class="flex flex-col md:flex-row gap-4">
      <div class="flex flex-grow items-center">
        <Heading>
          <span>Ostrich Eggshells</span>
        </Heading>
      </div>
      <div class="flex items-center">
        <Link href="/ostrich-eggshells" ariaLabel="ostrich eggshells">
          <span>View All</span>
        </Link>
      </div>
    </div>
    
    <ProductCardGrid products={data.eggshells} />

  </div>
</div>