<script lang="ts">
  // components
  import Heading from '$components/Heading/Heading.svelte';
  import Link from '$components/Link/Link.svelte';
</script>

<svelte:head>
  <title>404 Not Found | Noureddine Feathers</title>
  <meta name="description" content="404 Not Found | Noureddine Feathers - Shop ostrich feather dusters, lambswool dusters, extendable lambswool dusters, ostrich eggshells, and ostrich feathers - handmade from 100% natural farm-raised ostrich feathers and eggshells" />
</svelte:head>

<div class="flex flex-col gap-8">
  <Heading customClass="text-center">
    <span>404 Not Found</span>
  </Heading>
  <p class="text-center">Woops! We could not find what you were looking for.</p>
  <div class="text-center">
    <Link href="/" ariaLabel="home">Return Home</Link>
  </div>
</div>