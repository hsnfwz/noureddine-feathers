<!-- @format -->
<script lang="ts">
  // components
  import Link from '$components/Link.svelte';

  // lib
  import ImageLogo from '$lib/images/logo.webp';
</script>

<footer class="flex flex-col gap-8 bg-neutral-100 p-8">
  <Link href="/" customClass="self-start">
    <img src={ImageLogo} alt="Noureddine Feathers" width="128" height="72" />
  </Link>
  <div class="flex flex-col gap-4 self-start lg:flex-row">
    <Link href="/info/contact" customClass=" hover:underline transition-all"
      >Contact</Link
    >
    <Link href="/info/about" customClass=" hover:underline transition-all"
      >About</Link
    >
    <Link href="/info/faq" customClass=" hover:underline transition-all"
      >FAQ</Link
    >
    <Link href="/info/shipping" customClass=" hover:underline transition-all"
      >Shipping</Link
    >
    <Link href="/info/returns" customClass=" hover:underline transition-all"
      >Returns</Link
    >
    <Link
      href="/info/privacy-policy"
      customClass=" hover:underline transition-all">Privacy Policy</Link
    >
    <Link
      href="/info/terms-of-service"
      customClass=" hover:underline transition-all">Terms of Service</Link
    >
  </div>
  <p>Copyright &copy; 2023 Noureddine Feathers</p>
</footer>
