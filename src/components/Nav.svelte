<script lang="ts">
  export let pathname: string = '/';

  // types
  import type LinkPropsType from '@/src/types/props/LinkPropsType';

  // components
  import Link from '@/src/components/shared/Link.svelte';

  const logoLinkProps: LinkPropsType = {
    href: '/',
    ariaLabel: 'home',  
  }

  const featherDustersLinkProps: LinkPropsType = {
    href: '/feather-dusters',
    ariaLabel: 'feather dusters',  
  }

  const eggshellsLinkProps: LinkPropsType = {
    href: '/eggshells',
    ariaLabel: 'eggshells',  
  }

  const lambskinLinkProps: LinkPropsType = {
    href: '/lambskin',
    ariaLabel: 'lambskin',  
  }

  const cartLinkProps: LinkPropsType = {
    href: '/cart',
    ariaLabel: 'cart',  
  }
</script>

<nav class={`flex flex-col w-full border-b-2 mb-8 border-b-gray-100 bg-gray-50 ${pathname === '/' && 'h-screen'}`}>
  <div class="flex flex-col items-center justify-between gap-4 px-8 py-2 lg:flex-row">
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
    <div class="hidden flex-row gap-4 flex-grow justify-center lg:flex">
      <Link {...featherDustersLinkProps} />
      <Link {...eggshellsLinkProps} />
      <Link {...lambskinLinkProps} />
    </div>
    <div class="hidden flex-row gap-4 flex-shrink-0 lg:flex">
      <!-- {!authContext.isLoading && !authContext.email && (
        <>
          <LinkButton
            href="/sign-in"
            text="Sign In"
          />
          <LinkButton
            href="/sign-up"
            text="Sign Up"
          />
        </>
      )}
      {!authContext.isLoading && authContext.email && (
        <LinkButton
          href="/account"
          text="Account"
        />
      )} -->
      <!-- <LinkButton
        href="/cart"
        text={`Cart (${cartContext.cartProductsCount})`}
      /> -->
    </div>
  </div>
  {#if pathname === '/'}
    <div class="flex flex-col flex-grow justify-center items-center gap-4 bg-cover bg-center bg-[url('/hero.webp')] px-8 py-2">
      <p class="text-white text-center text-base xl:text-xl">
        Handmade from 100% natural farm-raised ostrich feathers
      </p>
      <Link {...featherDustersLinkProps}>
        <div class="px-4 py-2 bg-white hover:cursor-pointer hover:brightness-75 transition-all">
          <p class="text-center uppercase">Shop Now</p>
        </div>
      </Link>
    </div>
  {/if}
</nav>