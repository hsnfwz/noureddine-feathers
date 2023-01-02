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
      <div class="flex flex-col gap-4 px-8 py-2">
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
            <Link href="/premium-ostrich-feather-dusters" ariaLabel="Premium Ostrich Feather Dusters" handleClick={() => showNavMobile = false}>
              <span>Feather Dusters</span>
            </Link>
            <Link href="/premium-extendable-lambswool-dusters" ariaLabel="Premium Extendable Lambswool Dusters" handleClick={() => showNavMobile = false}>
              <span>Extendable Lambswool Dusters</span>
            </Link>
            <Link href="/premium-lambswool-dusters" ariaLabel="Premium Lambswool Dusters" handleClick={() => showNavMobile = false}>
              <span>Lambswool Dusters</span>
            </Link>
            <Link href="/ostrich-feathers" ariaLabel="Ostrich Feathers" handleClick={() => showNavMobile = false}>
              <span>Feathers</span>
            </Link>
            <Link href="/ostrich-eggshells" ariaLabel="Ostrich Eggshells" handleClick={() => showNavMobile = false}>
              <span>Eggshells</span>
            </Link>
          </div>
          <div class="flex flex-col gap-4">
            {#if currentSession}
              <Link href="/account" ariaLabel="account" handleClick={() => showNavMobile = false}>Account</Link>
            {:else}
              <Link href="/sign-in" ariaLabel="sign in" handleClick={() => showNavMobile = false}>Sign In</Link>
            {/if}
            <Link href="/cart" ariaLabel="cart" handleClick={() => showNavMobile = false}>
              <span>Cart ({$cart.cartTotalItems})</span>
            </Link>
            {#if currentProfile && currentProfile.is_admin}
              <Link href="/admin" ariaLabel="admin" handleClick={() => showNavMobile = false}>Admin</Link>
            {/if}
          </div>
        </div>
      </div>
    </div>
  {:else}
    <div class={`flex flex-col w-full mb-4 bg-neutral-100`}>
      <div class="flex items-center justify-between gap-4 px-8 py-2">
        <div class="flex flex-row flex-shrink-0">
          <Link href="/" ariaLabel="home">
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
        <div class="flex items-center lg:hidden">
          <Button handleClick={() => showNavMobile = true}>
            <IconStack />
          </Button>
        </div>
        <div class="hidden lg:flex">
          <div class="flex flex-col gap-4 flex-grow justify-center lg:flex-row items-center">
            <Link href="/premium-ostrich-feather-dusters" ariaLabel="Premium Ostrich Feather Dusters">
              <span>Feather Dusters</span>
            </Link>
            <Link href="/premium-extendable-lambswool-dusters" ariaLabel="Premium Extendable Lambswool Dusters">
              <span>Extendable Lambswool Dusters</span>
            </Link>
            <Link href="/premium-lambswool-dusters" ariaLabel="Premium Lambswool Dusters">
              <span>Lambswool Dusters</span>
            </Link>
            <Link href="/ostrich-feathers" ariaLabel="Ostrich Feathers">
              <span>Feathers</span>
            </Link>
            <Link href="/ostrich-eggshells" ariaLabel="ostrich-eggshells">
              <span>Eggshells</span>
            </Link>
          </div>
        </div>
        <div class="hidden lg:flex">
          <div class="flex flex-col gap-4 flex-shrink-0 lg:flex-row items-center">
            {#if currentSession}
              <Link href="/account" ariaLabel="account">Account</Link>
            {:else}
              <Link href="/sign-in" ariaLabel="sign in">Sign In</Link>
            {/if}
            <Link href="/cart" ariaLabel="cart">
              <span>Cart ({$cart.cartTotalItems})</span>
            </Link>
            {#if currentProfile && currentProfile.is_admin}
              <Link href="/admin" ariaLabel="admin">Admin</Link>
            {/if}
          </div>
        </div>
      </div>
    </div>
  {/if}
</nav>