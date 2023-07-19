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
    class="h-[calc(100vh-36px-72.25px)] w-full object-cover"
  />
  <div
    class="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-8 self-start px-8 py-2 text-center text-white"
  >
    <div class="flex flex-col gap-4">
      <p class="montserrat-bold text-4xl">Ostrich Feathers</p>
      <p>From 100% natural farm-raised ostrich</p>
    </div>

    <Link
      href="/products/feathers"
      customClass="px-4 py-2 bg-white rounded text-black hover:bg-black hover:text-white hover:transition-all"
      >Shop Now</Link
    >
  </div>
</div>
