<!-- @format -->
<script lang="ts">
  // components
  import Link from '$components/Link/Link.svelte';

  // lib
  import ImageLogo from '$lib/images/logo.webp';
</script>

<footer
  class="mt-4 flex flex-col items-center justify-center gap-4 bg-neutral-100 p-4"
>
  <Link href="/" ariaLabel="home">
    <div>
      <img src={ImageLogo} alt="Noureddine Feathers" width="128" height="72" />
    </div>
  </Link>
  <div class="grid grid-flow-row gap-4 lg:grid-flow-col">
    <Link href="/info/contact" ariaLabel="contact">
      <span>Contact</span>
    </Link>
    <Link href="/info/about" ariaLabel="about">
      <span>About</span>
    </Link>
    <Link href="/info/faq" ariaLabel="faq">
      <span>FAQ</span>
    </Link>
    <Link href="/info/shipping" ariaLabel="shipping">
      <span>Shipping</span>
    </Link>
    <Link href="/info/returns" ariaLabel="returns">
      <span>Returns</span>
    </Link>
    <Link href="/info/privacy-policy" ariaLabel="privacy policy">
      <span>Privacy Policy</span>
    </Link>
    <Link href="/info/terms-of-service" ariaLabel="terms of service">
      <span>Terms of Service</span>
    </Link>
  </div>
  <p class="text-center">Copyright &copy; 2023 Noureddine Feathers</p>
</footer>
