<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  // components
  import Link from '$components/Link/Link.svelte';
  import Button from '$components/Button/Button.svelte';
  import IconStack from '$components/icons/IconStack.svelte';
  import IconX from '$components/icons/IconX.svelte';

  // store
  import { session } from '$stores/SessionStore';
  import { cart } from '$stores/CartStore';

  // lib
  import ImageLogo from '$lib/images/logo.webp';

  // props
  let showNavMobile: boolean = false;

  // state
  let loading: boolean = true;
  let subscriptionAuthStateChange: any;
  let bodyElement: any;

  onMount(async () => {
    subscriptionAuthStateChange = session.subscribeAuthStateChange();

    await session.getSession();

    loading = false;

    bodyElement = document.querySelector('body');
  });

  onDestroy(() => session.unsubscribeAuthStateChange(subscriptionAuthStateChange));

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
    <div class="fixed top-0 bg-gray-50 w-full h-full z-50">
      <div class="flex flex-col gap-4 px-8 py-2">
        <div class="flex gap-4">
          <div class="flex flex-row flex-shrink-0">
            <Link href="/" ariaLabel="home" handleClick={() => showNavMobile = false}>
              <div class="hover:opacity-25 transition-all">
                <img
                  src={ImageLogo}
                  alt="Noureddine Feathers"
                  width="128"
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
            <Link href="/ostrich-feather-dusters" ariaLabel="ostrich feather dusters" handleClick={() => showNavMobile = false}>
              <span>Ostrich Feather Dusters</span>
            </Link>
            <Link href="/lambswool-dusters" ariaLabel="lambswool dusters" handleClick={() => showNavMobile = false}>
              <span>Lambswool Dusters</span>
            </Link>
            <Link href="/extendable-lambswool-dusters" ariaLabel="extendable lambswool dusters" handleClick={() => showNavMobile = false}>
              <span>Extendable Lambswool Dusters</span>
            </Link>
            <Link href="/ostrich-feathers" ariaLabel="ostrich feathers" handleClick={() => showNavMobile = false}>
              <span>Ostrich Feathers</span>
            </Link>
            <Link href="/ostrich-eggshells" ariaLabel="ostrich eggshells" handleClick={() => showNavMobile = false}>
              <span>Ostrich Eggshells</span>
            </Link>
          </div>
          <div class="flex flex-col gap-4">
            {#if $session}
              <Link href="/account" ariaLabel="account" handleClick={() => showNavMobile = false}>Account</Link>
            {:else}
              <Link href="/sign-in" ariaLabel="sign in" handleClick={() => showNavMobile = false}>Sign In</Link>
            {/if}
            {#if loading}
              <span class="animate-spin h-6 w-6 border-2 border-black border-t-white rounded-full"></span>
            {:else}
              <Link href="/cart" ariaLabel="cart" handleClick={() => showNavMobile = false}>
                <span>Cart ({$cart.cartTotalItems})</span>
              </Link>
            {/if}
          </div>
        </div>
      </div>
    </div>
  {:else}
    <div class={`flex flex-col w-full border-b-2 mb-8 border-b-gray-100 bg-gray-50`}>
      <div class="flex items-center justify-between gap-4 px-8 py-2">
        <div class="flex flex-row flex-shrink-0">
          <Link href="/" ariaLabel="home">
            <div class="hover:opacity-25 transition-all">
              <img
                src={ImageLogo}
                alt="Noureddine Feathers"
                width="128"
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
          <div class="flex flex-col gap-4 flex-grow justify-center lg:flex-row">
            <Link href="/ostrich-feather-dusters" ariaLabel="ostrich feather dusters">
              <span>Ostrich Feather Dusters</span>
            </Link>
            <Link href="/lambswool-dusters" ariaLabel="lambswool dusters">
              <span>Lambswool Dusters</span>
            </Link>
            <Link href="/extendable-lambswool-dusters" ariaLabel="extendable lambswool dusters">
              <span>Extendable Lambswool Dusters</span>
            </Link>
            <Link href="/ostrich-feathers" ariaLabel="ostrich feathers">
              <span>Ostrich Feathers</span>
            </Link>
            <Link href="/ostrich-eggshells" ariaLabel="ostrich-eggshells">
              <span>Ostrich Eggshells</span>
            </Link>
          </div>
        </div>
        <div class="hidden lg:flex">
          <div class="flex flex-col gap-4 flex-shrink-0 lg:flex-row items-center">
            {#if $session}
              <Link href="/account" ariaLabel="account">Account</Link>
            {:else}
              <Link href="/sign-in" ariaLabel="sign in">Sign In</Link>
            {/if}
            {#if loading}
              <span class="animate-spin h-6 w-6 border-2 border-black border-t-white rounded-full"></span>
            {:else}
              <Link href="/cart" ariaLabel="cart">
                <span>Cart ({$cart.cartTotalItems})</span>
              </Link>
            {/if}
          </div>
        </div>
      </div>
    </div>
  {/if}
</nav>