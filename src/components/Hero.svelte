<!-- @format -->
<script lang="ts">
  // lib
  import Link from '$components/Link.svelte';
  import ImageHero from '$lib/images/hero.webp';
</script>

<div class="relative">
  <img
    src={ImageHero}
    alt="hero"
    class="h-[calc(100vh-40px-72.25px)] w-full object-cover"
  />
  <div
    class="absolute left-0 top-1/3 flex w-full flex-col items-center justify-center gap-4 self-center"
  >
    <p class="montserrat-bold text-4xl text-white">Ostrich Feathers</p>
    <p class="text-white">Handmade from 100% natural farm-raised ostrich</p>
    <Link href="/products/feathers" customClass="px-4 py-2 bg-white rounded"
      >Shop Feathers</Link
    >
  </div>
</div>
