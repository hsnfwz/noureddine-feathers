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
    premiumOstrichfeatherDusters: I_Product[],
    premiumExtendableLambswoolDusters: I_Product[],
    premiumLambswoolDusters: I_Product[],
    ostrichFeathers: I_Product[],
    ostrichEggshells: I_Product[],
  };
</script>

<svelte:head>
  <title>Noureddine Feathers</title>
  <meta name="description" content="Noureddine Feathers - Shop premium ostrich feather dusters, premium extendable lambswool dusters, premium lambswool dusters, ostrich feathers, and ostrich eggshells - handmade from 100% natural farm-raised ostrich feathers and eggshells" />
</svelte:head>

<!-- <Hero /> -->

<div class="flex flex-col gap-8">
  <div class="flex flex-col gap-4 lg:flex-row">
    <div class="flex flex-grow items-center">
      <Heading>
        <span>Premium Ostrich Feather Dusters</span>
      </Heading>
    </div>
    <div class="flex items-center">
      <Link href="/premium-ostrich-feather-dusters" ariaLabel="Premium Ostrich Feather Dusters">
        <span>View All</span>
      </Link>
    </div>
  </div>
  <ProductCardGrid products={data.premiumOstrichfeatherDusters} />
</div>
<div class="flex flex-col gap-8">
  <div class="flex flex-col gap-4 lg:flex-row">
    <div class="flex flex-grow items-center">
      <Heading>
        <span>Premium Extendable Lambswool Dusters</span>
      </Heading>
    </div>
    <div class="flex items-center">
      <Link href="/premium-extendable-lambswool-dusters" ariaLabel="Premium Extendable Lambswool Dusters">
        <span>View All</span>
      </Link>
    </div>
  </div>
  <ProductCardGrid products={data.premiumExtendableLambswoolDusters} />
</div>
<div class="flex flex-col gap-8">
  <div class="flex flex-col gap-4 lg:flex-row">
    <div class="flex flex-grow items-center">
      <Heading>
        <span>Premium Lambswool Dusters</span>
      </Heading>
    </div>
    <div class="flex items-center">
      <Link href="/premium-lambswool-dusters" ariaLabel="Premium Lambswool Dusters">
        <span>View All</span>
      </Link>
    </div>
  </div>
  <ProductCardGrid products={data.premiumLambswoolDusters} />
</div>
<div class="flex flex-col gap-8">
  <div class="flex flex-col gap-4 lg:flex-row">
    <div class="flex flex-grow items-center">
      <Heading>
        <span>Ostrich Feathers</span>
      </Heading>
    </div>
    <div class="flex items-center">
      <Link href="/ostrich-feathers" ariaLabel="Ostrich Feathers">
        <span>View All</span>
      </Link>
    </div>
  </div>
  <ProductCardGrid products={data.ostrichFeathers} />
</div>
<div class="flex flex-col gap-8">
  <div class="flex flex-col gap-4 lg:flex-row">
    <div class="flex flex-grow items-center">
      <Heading>
        <span>Ostrich Eggshells</span>
      </Heading>
    </div>
    <div class="flex items-center">
      <Link href="/ostrich-eggshells" ariaLabel="Ostrich Eggshells">
        <span>View All</span>
      </Link>
    </div>
  </div>
  <ProductCardGrid products={data.ostrichEggshells} />
</div>