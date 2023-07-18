<!-- @format -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

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
      <div class="flex flex-col gap-4 px-4 py-2">
        <div class="flex gap-4">
          <div class="flex flex-shrink-0 flex-row">
            <Link href="/" handleClick={() => (showNavMobile = false)}>
              <img
                src={ImageLogo}
                alt="Noureddine Feathers"
                width="100"
                height="72"
              />
            </Link>
          </div>
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
    <div
      class="grid w-full grid-cols-2 bg-neutral-100 px-8 py-2 lg:grid-cols-4"
    >
      <Link href="/">
        <img
          src={ImageLogo}
          alt="Noureddine Feathers"
          width="100"
          height="72"
          class="max-w-min"
        />
      </Link>
      <div class="flex items-center justify-self-end lg:hidden">
        <Button handleClick={() => (showNavMobile = true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="h-5 w-5"
          >
            <path
              fill-rule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"
              clip-rule="evenodd"
            />
          </svg>
        </Button>
      </div>
      <div class="hidden lg:col-span-2 lg:flex lg:justify-self-center">
        <div
          class="flex flex-grow flex-col items-center justify-center gap-4 lg:flex-row"
        >
          <Link href="/products/feather-dusters">Feather Dusters</Link>
          <Link href="/products/lambswool-dusters">Lambswool Dusters</Link>
          <Link href="/products/feathers">Feathers</Link>
          <Link href="/products/eggshells">Eggshells</Link>
        </div>
      </div>
      <div class="hidden lg:flex lg:justify-self-end">
        <div class="flex flex-shrink-0 flex-col items-center gap-4 lg:flex-row">
          <Link href={`${$page.data.session ? '/account' : '/account/sign-in'}`}
            >Account</Link
          >
          <Link href="/cart" customClass="text-center">
            <span class="inline-block align-middle">Cart</span> (
            <span
              class="montserrat-bold inline-block align-middle text-xl text-orange-500"
              >{$cart.cartTotalItems}</span
            > )
          </Link>
        </div>
      </div>
    </div>
  {/if}
</nav>
