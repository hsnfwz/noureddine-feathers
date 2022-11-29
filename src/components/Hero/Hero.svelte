<script lang="ts">
  // components
  import Link from '$components/Link/Link.svelte';

  // lib
  import ImageHero from '$lib/images/hero.webp';
</script>

<div class={`flex flex-col flex-grow justify-center items-center gap-4 bg-cover bg-center px-8 py-2`}>
  <p class="text-black text-center text-base xl:text-xl">
    Handmade from 100% natural farm-raised ostrich feathers
  </p>
  <div>
    <span class="px-4 py-2 bg-white">
      <Link href="/feather-dusters" ariaLabel="feather dusters"><span>Shop Feather Dusters</span></Link>
    </span>
    <span class="px-4 py-2 bg-white">
      <Link href="/eggshells" ariaLabel="eggshells"><span>Shop Eggshells</span></Link>
    </span>
    <span class="px-4 py-2 bg-white">
      <Link href="/lambskin" ariaLabel="lambskin"><span>Shop Lambskin</span></Link>
    </span>
  </div>
</div>