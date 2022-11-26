<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  
  // props
  export let pathname: string = '/';

  // types
  import type LinkPropsType from 'types/props/LinkPropsType';
  import type ButtonPropsType from 'types/props/ButtonPropsType';

  // components
  import Link from 'components/shared/Link.svelte';
  import Button from 'components/shared/Button.svelte';

  // store
  import { session } from 'stores/SessionStore';
  import { cart } from 'stores/CartStore';

  // state
  let loading: boolean = true;
  let subscriptionAuthStateChange: any;

  onMount(async () => {
    subscriptionAuthStateChange = session.subscribeAuthStateChange();

    await session.getSession();

    loading = false;
  });

  onDestroy(() => session.unsubscribeAuthStateChange(subscriptionAuthStateChange));

  const logoLinkProps: LinkPropsType = {
    href: '/',
    ariaLabel: 'home',
  }

  const featherDustersLinkProps: LinkPropsType = {
    href: '/feather-dusters',
    ariaLabel: 'feather dusters',
    text: 'Feather Dusters',
  }

  const eggshellsLinkProps: LinkPropsType = {
    href: '/eggshells',
    ariaLabel: 'eggshells',
    text: 'Eggshells',
  }

  const lambskinLinkProps: LinkPropsType = {
    href: '/lambskin',
    ariaLabel: 'lambskin',
    text: 'Lambskin',
  }

  const cartLinkProps: LinkPropsType = {
    href: '/cart',
    ariaLabel: 'cart',
    text: 'Cart',
  }

  const signInLinkProps: LinkPropsType = {
    href: '/sign-in',
    ariaLabel: 'sign in',
    text: 'Sign In',
  }

  const accountLinkProps: LinkPropsType = {
    href: '/account',
    ariaLabel: 'account',
    text: 'Account',
  }

  const shopNowLinkProps: LinkPropsType = {
    href: '/feather-dusters',
    ariaLabel: 'feather dusters',
    text: 'Shop Now',
  }

  const signOutButtonProps: ButtonPropsType = {
    text: 'Sign Out',
    uppercase: true,
    onClick: () => session.signOutUser(),
  }
</script>

<nav class={`flex flex-col w-full border-b-2 mb-8 border-b-gray-100 bg-gray-50 ${pathname === '/' && 'h-screen'}`}>
  <div class="flex flex-col items-center justify-between gap-2 px-8 py-2 lg:flex-row">
    <div class="flex flex-row flex-shrink-0">
      <Link {...logoLinkProps}>
        <div class="hover:opacity-25 transition-all w-[150px] h-[84px]">
          <img
            src="/rectangle-transparent-logo.webp"
            alt="Noureddine Feathers"
            width="150"
            height="84"
          />
        </div>
      </Link>
    </div>
    <div class="flex flex-col gap-2 flex-grow justify-center lg:flex-row">
      <Link {...featherDustersLinkProps} />
      <Link {...eggshellsLinkProps} />
      <Link {...lambskinLinkProps} />
    </div>
    <div class="flex flex-col gap-2 flex-shrink-0 lg:flex-row items-center">
      <!-- {#if $session}
        <Link {...accountLinkProps} />
        <Button {...signOutButtonProps} />
      {:else}
        <Link {...signInLinkProps} />
      {/if} -->
      {#if loading}
        <span class="animate-spin h-6 w-6 border-2 border-black border-t-white rounded-full"></span>
      {:else}
        <Link {...cartLinkProps}>
          ({$cart.cartTotalItems})
        </Link>
      {/if}
      {#if $session}
        <Button {...signOutButtonProps} />
      {:else}
        <Link {...signInLinkProps} />
      {/if}
    </div>
  </div>
  {#if pathname === '/'}
    <div class="flex flex-col flex-grow justify-center items-center gap-4 bg-cover bg-center bg-[url('/hero-compressed.webp')] px-8 py-2">
      <p class="text-white text-center text-base xl:text-xl">
        Handmade from 100% natural farm-raised ostrich feathers
      </p>
      <span class="px-4 py-2 bg-white">
        <Link {...shopNowLinkProps} />
      </span>
    </div>
  {/if}
</nav>