<script lang="ts">
  // components
  import Link from '$components/Link/Link.svelte';
  import FacebookIcon from '$components/icons/FacebookIcon.svelte';
  import InstagramIcon from '$components/icons/InstagramIcon.svelte';
  import PinterestIcon from '$components/icons/PinterestIcon.svelte';

  // lib
  import ImageLogo from '$lib/images/logo.webp';
</script>

<footer class="flex flex-col bg-neutral-100 p-4 mt-4 gap-4 justify-center items-center">    
  <Link
    href="/"
    ariaLabel="home"
  >
    <div>
      <img
        src={ImageLogo}
        alt="Noureddine Feathers"
        width="128"
        height="72"
      />
    </div>
  </Link>
  <!-- <div class="flex flex-col gap-4 justify-center items-center">
    <p class="text-center">Follow Us</p>
    <div class="flex gap-4">
      <Link
        href="/"
        ariaLabel="facebook"
      >
        <div class="w-6 h-6">
          <FacebookIcon />
        </div>
      </Link>
      <Link
        href="/"
        ariaLabel="instagram"
      >
        <div class="w-6 h-6">  
          <InstagramIcon />
        </div>
      </Link>
      <Link
        href="/"
        ariaLabel="pinterest"
      >
        <div class="w-6 h-6">  
          <PinterestIcon />
        </div>
      </Link>
    </div>
  </div> -->
  <div class="grid grid-flow-row lg:grid-flow-col gap-4">
    <Link
      customClass="text-sm"
      href="/contact"
      ariaLabel="contact"
    >
      <span>Contact</span>
    </Link>
    <Link
      customClass="text-sm"
      href="/about"
      ariaLabel="about"
    >
      <span>About</span>
    </Link>
    <Link
      customClass="text-sm"
      href="/faq"
      ariaLabel="faq"
    >
      <span>FAQ</span>
    </Link>
    <Link
      customClass="text-sm"
      href="/shipping"
      ariaLabel="shipping"
    >
      <span>Shipping</span>
    </Link>
    <Link
      customClass="text-sm"
      href="/returns"
      ariaLabel="returns"
    >
      <span>Returns</span>
    </Link>
    <Link
      customClass="text-sm"
      href="/privacy-policy"
      ariaLabel="privacy policy"
    >
      <span>Privacy Policy</span>
    </Link>
    <Link
      customClass="text-sm"
      href="/terms-of-service"
      ariaLabel="terms of service"
    >
      <span>Terms of Service</span>
    </Link>
  </div>
  <p class="text-sm text-center">Copyright &copy; 2023 Noureddine Feathers</p>
</footer>