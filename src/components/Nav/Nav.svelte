<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";

  // components
  import Link from "$components/Link/Link.svelte";
  import Button from "$components/Button/Button.svelte";
  import IconStack from "$components/icons/IconStack.svelte";
  import IconX from "$components/icons/IconX.svelte";

  // stores
  import { cart } from "$stores/CartStore";

  // lib
  import ImageLogo from "$lib/images/logo.webp";

  // props
  let showNavMobile: boolean = false;

  // state
  let bodyElement: any;

  onMount(() => (bodyElement = document.querySelector("body")));

  $: {
    if (showNavMobile) {
      if (bodyElement) bodyElement.style.overflow = "hidden";
    } else {
      if (bodyElement) bodyElement.style.overflow = "auto";
    }
  }
</script>

<nav>
  {#if showNavMobile}
    <div class="fixed top-0 z-50 h-full w-full overflow-auto bg-neutral-100">
      <div class="flex flex-col gap-4 px-4 py-2">
        <div class="flex gap-4">
          <div class="flex flex-shrink-0 flex-row">
            <Link
              href="/"
              ariaLabel="home"
              handleClick={() => (showNavMobile = false)}
            >
              <div>
                <img
                  src={ImageLogo}
                  alt="Noureddine Feathers"
                  width="100"
                  height="72"
                />
              </div>
            </Link>
          </div>
          <div class="flex flex-1 items-center justify-end lg:hidden">
            <Button handleClick={() => (showNavMobile = false)}>
              <IconX />
            </Button>
          </div>
        </div>
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-4">
            <Link
              href="/products/feather-dusters"
              ariaLabel="Feather Dusters"
              handleClick={() => (showNavMobile = false)}
            >
              Feather Dusters
            </Link>
            <Link
              href="/products/lambswool-dusters"
              ariaLabel="Lambswool Dusters"
              handleClick={() => (showNavMobile = false)}
            >
              Lambswool Dusters
            </Link>
            <Link
              href="/products/feathers"
              ariaLabel="Feathers"
              handleClick={() => (showNavMobile = false)}
            >
              Feathers
            </Link>
            <Link
              href="/products/eggshells"
              ariaLabel="Eggshells"
              handleClick={() => (showNavMobile = false)}
            >
              Eggshells
            </Link>
          </div>
          <div class="flex flex-col gap-4">
            <Link
              href={`${$page.data.session ? "/account" : "/account/sign-in"}`}
              ariaLabel="account"
              handleClick={() => (showNavMobile = false)}>Account</Link
            >
            <a
              href="/cart"
              class="text-center"
              on:click={() => (showNavMobile = false)}
            >
              <span class="inline-block align-middle">Cart</span> (
              <span
                class="nf-font-bold inline-block align-middle text-xl text-orange-500"
                >{$cart.cartTotalItems}</span
              > )
            </a>
          </div>
        </div>
      </div>
    </div>
  {:else}
    <div
      class="mb-4 grid w-full grid-cols-2 bg-neutral-100 px-4 py-2 lg:grid-cols-4"
    >
      <Link href="/" ariaLabel="home">
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
          <IconStack />
        </Button>
      </div>
      <div class="hidden lg:col-span-2 lg:flex lg:justify-self-center">
        <div
          class="flex flex-grow flex-col items-center justify-center gap-4 lg:flex-row"
        >
          <Link href="/products/feather-dusters" ariaLabel="Feather Dusters">
            Feather Dusters
          </Link>
          <Link
            href="/products/lambswool-dusters"
            ariaLabel="Lambswool Dusters"
          >
            Lambswool Dusters
          </Link>
          <Link href="/products/feathers" ariaLabel="Feathers">Feathers</Link>
          <Link href="/products/eggshells" ariaLabel="eggshells">
            Eggshells
          </Link>
        </div>
      </div>
      <div class="hidden lg:flex lg:justify-self-end">
        <div class="flex flex-shrink-0 flex-col items-center gap-4 lg:flex-row">
          <Link
            href={`${$page.data.session ? "/account" : "/account/sign-in"}`}
            ariaLabel="account">Account</Link
          >
          <a href="/cart" class="text-center">
            <span class="inline-block align-middle">Cart</span> (
            <span
              class="nf-font-bold inline-block align-middle text-xl text-orange-500"
              >{$cart.cartTotalItems}</span
            > )
          </a>
        </div>
      </div>
    </div>
  {/if}
</nav>
