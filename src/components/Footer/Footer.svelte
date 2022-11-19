<script lang="ts">
  import { onMount } from 'svelte';

  // types
  import type LinkPropsType from 'types/props/LinkPropsType';

  // components
  import Link from 'components/shared/Link.svelte';
  import FacebookIcon from 'components/icons/FacebookIcon.svelte';
  import InstagramIcon from 'components/icons/InstagramIcon.svelte';
  import PinterestIcon from 'components/icons/PinterestIcon.svelte';

  const logoLinkProps: LinkPropsType = {
    href: '/',
    ariaLabel: 'home',
  }

  const facebookLinkProps: LinkPropsType = {
    href: '/',
    ariaLabel: '/'
  }

  const instagramLinkProps: LinkPropsType = {
    href: '/',
    ariaLabel: '/',
  }

  const pinterestLinkProps: LinkPropsType = {
    href: '/',
    ariaLabel: '/',
  }

  const contactLinkProps: LinkPropsType = {
    href: '/contact',
    ariaLabel: 'contact',
    text: 'Contact',
  }

  const aboutLinkProps: LinkPropsType = {
    href: '/about',
    ariaLabel: 'about',
    text: 'About',
  }

  const faqLinkProps: LinkPropsType = {
    href: '/faq',
    ariaLabel: 'faq',
    text: 'FAQ',
  }

  const shippingLinkProps: LinkPropsType = {
    href: '/shipping',
    ariaLabel: 'shipping',
    text: 'Shipping',
  }

  const returnsLinkProps: LinkPropsType = {
    href: '/returns',
    ariaLabel: 'returns',
    text: 'Returns',
  }

  const privacyPolicyLinkProps: LinkPropsType = {
    href: '/privacy-policy',
    ariaLabel: 'privacy policy',
    text: 'Privacy Policy',
  }

  const termsAndConditionsLinkProps: LinkPropsType = {
    href: '/terms-and-conditions',
    ariaLabel: 'terms and conditions',
    text: 'Terms and Conditions',
  }

</script>

<footer class="flex flex-col bg-gray-50 p-8 mt-8 gap-8 justify-center items-center">    
  <Link {...logoLinkProps}>
    <div class="hover:opacity-25 transition-all">
      <img
        src="/rectangle-transparent-logo.webp"
        alt="Noureddine Feathers"
        width="150"
        height="84"
      />
    </div>
  </Link>
  <div class="flex flex-col gap-4 justify-center items-center">
    <p class="text-center">Follow Us</p>
    <div class="flex gap-4">
      <Link {...facebookLinkProps}>
        <div class="w-6 h-6">
          <FacebookIcon />
        </div>
      </Link>
      <Link {...instagramLinkProps}>
        <div class="w-6 h-6">  
          <InstagramIcon />
        </div>
      </Link>
      <Link {...pinterestLinkProps}>
        <div class="w-6 h-6">  
          <PinterestIcon />
        </div>
      </Link>
    </div>
  </div>
  <div class="grid grid-flow-row lg:grid-flow-col gap-4">
    <Link {...contactLinkProps} />
    <Link {...aboutLinkProps} />
    <Link {...faqLinkProps} />
    <Link {...shippingLinkProps} />
    <Link {...returnsLinkProps} />
    <Link {...privacyPolicyLinkProps} />
    <Link {...termsAndConditionsLinkProps} />
  </div>
  <div class="text-center">
    <p>Copyright &copy; 2022 Noureddine Feathers</p>
  </div>
</footer>