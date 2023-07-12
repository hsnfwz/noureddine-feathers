<script lang="ts">
  // components
  import Link from "$components/Link/Link.svelte";

  // lib
  import ImageHero from "$lib/images/hero.webp";
</script>

<div
  class={`flex flex-grow flex-col items-center justify-center gap-4 bg-cover bg-center px-8 py-2`}
>
  <p class="text-center text-base text-black xl:text-xl">
    Handmade from 100% natural farm-raised ostrich feathers
  </p>
  <div>
    <span class="bg-white px-4 py-2">
      <Link href="/feather-dusters" ariaLabel="feather dusters"
        ><span>Shop Feather Dusters</span></Link
      >
    </span>
    <span class="bg-white px-4 py-2">
      <Link href="/eggshells" ariaLabel="eggshells"
        ><span>Shop Eggshells</span></Link
      >
    </span>
    <span class="bg-white px-4 py-2">
      <Link href="/lambskin" ariaLabel="lambskin"
        ><span>Shop Lambskin</span></Link
      >
    </span>
  </div>
</div>
