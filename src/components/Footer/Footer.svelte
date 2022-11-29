<script lang="ts">
  // components
  import Link from '$components/Link/Link.svelte';
  import FacebookIcon from '$components/icons/FacebookIcon.svelte';
  import InstagramIcon from '$components/icons/InstagramIcon.svelte';
  import PinterestIcon from '$components/icons/PinterestIcon.svelte';

  // lib
  import ImageLogo from '$lib/images/logo.webp';
</script>

<footer class="flex flex-col bg-gray-50 p-8 mt-8 gap-8 justify-center items-center">    
  <Link
    href="/"
    ariaLabel="home"
  >
    <div class="hover:opacity-25 transition-all">
      <img
        src={ImageLogo}
        alt="Noureddine Feathers"
        width="128"
        height="72"
      />
    </div>
  </Link>
  <div class="flex flex-col gap-4 justify-center items-center">
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
  </div>
  <div class="grid grid-flow-row lg:grid-flow-col gap-4">
    <Link
      href="/contact"
      ariaLabel="contact"
    >
      <span>Contact</span>
    </Link>
    <Link
      href="/about"
      ariaLabel="about"
    >
      <span>About</span>
    </Link>
    <Link
      href="/faq"
      ariaLabel="faq"
    >
      <span>FAQ</span>
    </Link>
    <Link
      href="/shipping"
      ariaLabel="shipping"
    >
      <span>Shipping</span>
    </Link>
    <Link
      href="/returns"
      ariaLabel="returns"
    >
      <span>Returns</span>
    </Link>
    <Link
      href="/privacy-policy"
      ariaLabel="privacy policy"
    >
      <span>Privacy Policy</span>
    </Link>
    <Link
      href="/terms-and-conditions"
      ariaLabel="terms and conditions"
    >
      <span>Terms and Conditions</span>
    </Link>
  </div>
  <div class="text-center">
    <p>Copyright &copy; 2022 Noureddine Feathers</p>
  </div>
</footer>