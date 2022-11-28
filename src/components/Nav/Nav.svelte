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
  import IconStack from 'src/Icons/IconStack.svelte';
  import IconX from 'components/icons/IconX.svelte';

  // store
  import { session } from 'stores/SessionStore';
  import { cart } from 'stores/CartStore';

  // state
  let loading: boolean = true;
  let subscriptionAuthStateChange: any;

  let showMenu: boolean = false;

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
  <div class="flex items-center justify-between gap-4 px-8 py-2">
    <div class="flex flex-row flex-shrink-0">
      <Link {...logoLinkProps}>
        <div class="hover:opacity-25 transition-all">
          <img
            src="/rectangle-transparent-logo.webp"
            alt="Noureddine Feathers"
            width="128"
            height="72"
          />
        </div>
      </Link>
    </div>
    <div class="flex items-center lg:hidden">
      <Button onClick={() => showMenu = true} buttonColor="bg-gray-50" borderClass="border-none">
        <div class="p-2">
          <IconStack />
        </div>
      </Button>
    </div>
    <div class="hidden lg:flex">
      <div class="flex flex-col gap-4 flex-grow justify-center lg:flex-row">
        <Link {...featherDustersLinkProps} />
        <Link {...eggshellsLinkProps} />
        <Link {...lambskinLinkProps} />
      </div>
    </div>
    <div class="hidden lg:flex">
      <div class="flex flex-col gap-4 flex-shrink-0 lg:flex-row items-center">
        {#if $session}
          <Link {...accountLinkProps} />
          <!-- <Button {...signOutButtonProps} /> -->
        {:else}
          <Link {...signInLinkProps} />
        {/if}
        {#if loading}
          <span class="animate-spin h-6 w-6 border-2 border-black border-t-white rounded-full"></span>
        {:else}
          <Link {...cartLinkProps}>
            ({$cart.cartTotalItems})
          </Link>
        {/if}
      </div>
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

{#if showMenu}
  <div class="fixed top-0 bg-gray-50 w-full h-full">
    <div class="flex flex-col gap-4 px-8 py-2">
      <div class="flex gap-4">
        <div class="flex flex-row flex-shrink-0">
          <Link {...logoLinkProps}>
            <div class="hover:opacity-25 transition-all">
              <img
                src="/rectangle-transparent-logo.webp"
                alt="Noureddine Feathers"
                width="128"
                height="72"
              />
            </div>
          </Link>
        </div>
        <div class="flex items-center flex-1 justify-end lg:hidden">
          <Button onClick={() => showMenu = false} buttonColor="bg-gray-50" borderClass="border-none">
            <div class="p-2">
              <IconX />
            </div>
          </Button>
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-4">
          <Link {...featherDustersLinkProps} />
          <Link {...eggshellsLinkProps} />
          <Link {...lambskinLinkProps} />
        </div>
        <div class="flex flex-col gap-4">
          {#if $session}
            <Link {...accountLinkProps} />
            <!-- <Button {...signOutButtonProps} /> -->
          {:else}
            <Link {...signInLinkProps} />
          {/if}
          {#if loading}
            <span class="animate-spin h-6 w-6 border-2 border-black border-t-white rounded-full"></span>
          {:else}
            <Link {...cartLinkProps}>
              ({$cart.cartTotalItems})
            </Link>
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}