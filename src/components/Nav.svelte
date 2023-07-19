<!-- @format -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  console.log($page);

  // components
  import Link from '$components/Link.svelte';
  import Button from '$components/Button.svelte';

  // stores
  import { cart } from '$stores/CartStore';

  // lib
  import ImageLogo from '$lib/images/logo.webp';

  // props
  let showNavMobile: boolean = false;

  // state
  let bodyElement: any;

  onMount(() => (bodyElement = document.querySelector('body')));

  $: {
    if (showNavMobile) {
      if (bodyElement) bodyElement.style.overflow = 'hidden';
    } else {
      if (bodyElement) bodyElement.style.overflow = 'auto';
    }
  }
</script>

<nav>
  {#if showNavMobile}
    <div class="fixed top-0 z-50 h-full w-full overflow-auto bg-neutral-100">
      <p class="bg-white p-2 text-center text-sm uppercase">
        <span class="montserrat-bold">Free shipping</span> on orders over $600
      </p>
      <div class="flex flex-col gap-4 px-8">
        <div class="flex gap-4">
          <Link
            href="/"
            customClass="max-w-min"
            handleClick={() => (showNavMobile = false)}
          >
            <img
              src={ImageLogo}
              alt="Noureddine Feathers"
              class="h-[72px] w-[128px] max-w-min"
            />
          </Link>
          <div class="flex flex-1 items-center justify-end lg:hidden">
            <Button handleClick={() => (showNavMobile = false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="h-5 w-5"
              >
                <path
                  d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
                />
              </svg>
            </Button>
          </div>
        </div>
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-4">
            <Link
              href="/products/feather-dusters"
              handleClick={() => (showNavMobile = false)}
            >
              Feather Dusters
            </Link>
            <Link
              href="/products/lambswool-dusters"
              handleClick={() => (showNavMobile = false)}
            >
              Lambswool Dusters
            </Link>
            <Link
              href="/products/feathers"
              handleClick={() => (showNavMobile = false)}
            >
              Feathers
            </Link>
            <Link
              href="/products/eggshells"
              handleClick={() => (showNavMobile = false)}
            >
              Eggshells
            </Link>
          </div>
          <div class="flex flex-col gap-4">
            <Link
              href={`${$page.data.session ? '/account' : '/account/sign-in'}`}
              handleClick={() => (showNavMobile = false)}>Account</Link
            >
            <Link href="/cart" handleClick={() => (showNavMobile = false)}>
              <span class="inline-block align-middle">Cart</span> (
              <span
                class="montserrat-bold inline-block align-middle text-xl text-orange-500"
                >{$cart.cartTotalItems}</span
              > )
            </Link>
          </div>
        </div>
      </div>
    </div>
  {:else}
    <p class="bg-neutral-100 p-2 text-center text-sm uppercase">
      <span class="montserrat-bold">Free shipping</span> on orders over $600
    </p>
    <div
      class=" grid w-full grid-cols-2 bg-white px-8 drop-shadow-sm lg:grid-cols-4"
    >
      <Link href="/" customClass="max-w-min">
        <img
          src={ImageLogo}
          alt="Noureddine Feathers"
          class="h-[72px] w-[128px] max-w-min"
        />
      </Link>
      <div class="flex items-center self-center justify-self-end lg:hidden">
        <Button
          handleClick={() => (showNavMobile = true)}
          customClass="rounded-full p-2 hover:bg-neutral-100 transition-all "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="h-5 w-5"
          >
            <path
              fill-rule="evenodd"
              d="M2 6.75A.75.75 0 012.75 6h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 6.75zm0 6.5a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"
              clip-rule="evenodd"
            />
          </svg>
        </Button>
      </div>
      <div class="hidden lg:col-span-2 lg:flex lg:justify-self-center">
        <div class="flex flex-col text-center lg:flex-row">
          <Link
            href="/products/feather-dusters"
            customClass={`px-4 flex items-center hover:border-black border-b-2 transition-all ${
              $page.url.pathname.includes('feather-dusters')
                ? 'border-black border-b-2'
                : 'border-transparent'
            }`}>Feather Dusters</Link
          >
          <Link
            href="/products/lambswool-dusters"
            customClass={`px-4 flex items-center hover:border-black border-b-2 transition-all ${
              $page.url.pathname.includes('lambswool-dusters')
                ? 'border-black border-b-2'
                : 'border-transparent'
            }`}>Lambswool Dusters</Link
          >
          <Link
            href="/products/feathers"
            customClass={`px-4 flex items-center hover:border-black border-b-2 transition-all ${
              $page.url.pathname.includes('feathers')
                ? 'border-black border-b-2'
                : 'border-transparent'
            }`}>Feathers</Link
          >
          <Link
            href="/products/eggshells"
            customClass={`px-4 flex items-center hover:border-black border-b-2 transition-all ${
              $page.url.pathname.includes('eggshells')
                ? 'border-black border-b-2'
                : 'border-transparent'
            }`}>Eggshells</Link
          >
        </div>
      </div>
      <div class="hidden lg:flex lg:justify-self-end">
        <div class="flex flex-col text-center lg:flex-row">
          <Link
            href={`${$page.data.session ? '/account' : '/account/sign-in'}`}
            customClass={`px-4 flex items-center hover:border-black border-b-2 transition-all ${
              $page.url.pathname.includes('account')
                ? 'border-black border-b-2'
                : 'border-transparent'
            }`}>Account</Link
          >
          <Link
            href="/cart"
            customClass={`px-4 flex items-center hover:border-black border-b-2 transition-all ${
              $page.url.pathname.includes('cart')
                ? 'border-black border-b-2'
                : 'border-transparent'
            }`}
          >
            <p>
              <span class="inline-block align-middle">Cart</span> (
              <span
                class="montserrat-bold inline-block align-middle text-xl text-orange-500"
                >{$cart.cartTotalItems}</span
              > )
            </p>
          </Link>
        </div>
      </div>
    </div>
  {/if}
</nav>
