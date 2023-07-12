<script lang="ts">
  // components
  import Heading from "$components/Heading/Heading.svelte";
  import Link from "$components/Link/Link.svelte";
  import ProductCardGrid from "$components/ProductCardGrid/ProductCardGrid.svelte";

  // interfaces
  import type I_Product from "$interfaces/I_Product";

  // data
  export let data: {
    featherDusters: I_Product[];
    lambswoolDusters: I_Product[];
    feathers: I_Product[];
    eggshells: I_Product[];
  };
</script>

<svelte:head>
  <title>Noureddine Feathers</title>
  <meta
    name="description"
    content="Noureddine Feathers - Shop premium ostrich feather dusters, premium extendable lambswool dusters, premium lambswool dusters, ostrich feathers, and ostrich eggshells - handmade from 100% natural farm-raised ostrich feathers and eggshells"
  />
</svelte:head>

<div class="flex flex-col gap-8">
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-4 sm:flex-row">
      <div class="flex flex-grow items-center">
        <Heading>
          <span>Feather Dusters</span>
        </Heading>
      </div>
      <div class="flex items-center">
        <Link href="/products/feather-dusters" ariaLabel="Feather Dusters">
          <span class="text-blue-500">View All</span>
        </Link>
      </div>
    </div>
    <ProductCardGrid products={data.featherDusters} />
  </div>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-4 sm:flex-row">
      <div class="flex flex-grow items-center">
        <Heading>
          <span>Lambswool Dusters</span>
        </Heading>
      </div>
      <div class="flex items-center">
        <Link href="/products/lambswool-dusters" ariaLabel="Lambswool Dusters">
          <span class="text-blue-500">View All</span>
        </Link>
      </div>
    </div>
    <ProductCardGrid products={data.lambswoolDusters} />
  </div>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-4 sm:flex-row">
      <div class="flex flex-grow items-center">
        <Heading>
          <span>Feathers</span>
        </Heading>
      </div>
      <div class="flex items-center">
        <Link href="/products/feathers" ariaLabel="Feathers">
          <span class="text-blue-500">View All</span>
        </Link>
      </div>
    </div>
    <ProductCardGrid products={data.feathers} />
  </div>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-4 sm:flex-row">
      <div class="flex flex-grow items-center">
        <Heading>
          <span>Eggshells</span>
        </Heading>
      </div>
      <div class="flex items-center">
        <Link href="/products/eggshells" ariaLabel="Eggshells">
          <span class="text-blue-500">View All</span>
        </Link>
      </div>
    </div>
    <ProductCardGrid products={data.eggshells} />
  </div>
</div>
