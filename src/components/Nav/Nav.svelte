<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  // components
  import Link from '$components/Link/Link.svelte';
  import Button from '$components/Button/Button.svelte';
  import IconStack from '$components/icons/IconStack.svelte';
  import IconX from '$components/icons/IconX.svelte';

  // stores
  import { page } from '$app/stores';
  import { session } from '$stores/SessionStore';
  import { profile } from '$stores/ProfileStore';
  import { cart } from '$stores/CartStore';

  // state
  let currentSession: any = undefined;
  let currentProfile: any = undefined;

  session.subscribe((value) => currentSession = value);
  profile.subscribe((value) => currentProfile = value);

  // lib
  import ImageLogo from '$lib/images/logo.webp';

  // props
  let showNavMobile: boolean = false;

  // state
  let bodyElement: any;

  onMount(() => bodyElement = document.querySelector('body'));

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
    <div class="fixed top-0 bg-neutral-100 w-full h-full z-50 overflow-auto">
      <div class="flex flex-col gap-4 px-4 py-2">
        <div class="flex gap-4">
          <div class="flex flex-row flex-shrink-0">
            <Link href="/" ariaLabel="home" handleClick={() => showNavMobile = false}>
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
          <div class="flex items-center flex-1 justify-end lg:hidden">
            <Button handleClick={() => showNavMobile = false}>
              <IconX />
            </Button>
          </div>
        </div>
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-4">
            <Link href="/feather-dusters" ariaLabel="Feather Dusters" handleClick={() => showNavMobile = false}>
              Feather Dusters
            </Link>
            <Link href="/lambswool-dusters" ariaLabel="Lambswool Dusters" handleClick={() => showNavMobile = false}>
              Lambswool Dusters
            </Link>
            <Link href="/feathers" ariaLabel="Feathers" handleClick={() => showNavMobile = false}>
              Feathers
            </Link>
            <Link href="/eggshells" ariaLabel="Eggshells" handleClick={() => showNavMobile = false}>
              Eggshells
            </Link>
          </div>
          <div class="flex flex-col gap-4">
            {#if currentSession}
              <Link href="/account" ariaLabel="account" handleClick={() => showNavMobile = false}>Account</Link>
            {:else}
              <Link href="/sign-in" ariaLabel="sign in" handleClick={() => showNavMobile = false}>Sign In</Link>
            {/if}
            <a href="/cart" class="text-sm text-center" on:click={() => showNavMobile = false}>
              <span class="inline-block align-middle">Cart</span> ( <span class="inline-block align-middle text-xl text-orange-500 nf-font-bold">{$cart.cartTotalItems}</span> )
            </a>
            {#if currentProfile && currentProfile.is_admin}
              <Link href="/admin" ariaLabel="admin" customClass="nf-font-bold" handleClick={() => showNavMobile = false}>Admin</Link>
            {/if}
          </div>
        </div>
      </div>
    </div>
  {:else}
    <div class="grid grid-cols-2 lg:grid-cols-4 px-4 py-2 w-full mb-4 bg-neutral-100">
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
        <Button handleClick={() => showNavMobile = true}>
          <IconStack />
        </Button>
      </div>
      <div class="hidden lg:flex lg:justify-self-center lg:col-span-2">
        <div class="flex flex-col gap-4 flex-grow justify-center lg:flex-row items-center">
          <Link href="/feather-dusters" ariaLabel="Feather Dusters">
            Feather Dusters
          </Link>
          <Link href="/lambswool-dusters" ariaLabel="Lambswool Dusters">
            Lambswool Dusters
          </Link>
          <Link href="/feathers" ariaLabel="Feathers">
            Feathers
          </Link>
          <Link href="/eggshells" ariaLabel="eggshells">
            Eggshells
          </Link>
        </div>
      </div>
      <div class="hidden lg:flex lg:justify-self-end">
        <div class="flex flex-col gap-4 flex-shrink-0 lg:flex-row items-center">
          {#if currentSession}
            <Link href="/account" ariaLabel="account">Account</Link>
          {:else}
            <Link href="/sign-in" ariaLabel="sign in">Sign In</Link>
          {/if}
          <a href="/cart" class="text-sm text-center">
            <span class="inline-block align-middle">Cart</span> ( <span class="inline-block align-middle text-xl text-orange-500 nf-font-bold">{$cart.cartTotalItems}</span> )
          </a>
          {#if currentProfile && currentProfile.is_admin}
            <Link href="/admin" ariaLabel="admin" customClass="nf-font-bold">Admin</Link>
          {/if}
        </div>
      </div>
    </div>
  {/if}
</nav>