<script lang="ts">
  import { onMount, onDestroy, afterUpdate } from 'svelte';

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

  onMount(async () => {
    subscriptionAuthStateChange = session.subscribeAuthStateChange();

    await session.getSession();

    loading = false;
  });

  onDestroy(() => session.unsubscribeAuthStateChange(subscriptionAuthStateChange));

  // const signOutButtonProps: ButtonPropsType = {
  //   text: 'Sign Out',
  //   uppercase: true,
  //   handleClick: () => session.signOutUser(),
  // }
</script>

<nav>
  {#if showNavMobile}
    <div class="absolute top-0 bg-gray-50 w-full h-full overflow-hidden z-50">
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
            <Link href="/feather-dusters" ariaLabel="feather dusters" handleClick={() => showNavMobile = false}>
              <span>Feather Dusters</span>
            </Link>
            <Link href="/eggshells" ariaLabel="eggshells" handleClick={() => showNavMobile = false}>
              <span>Eggshells</span>
            </Link>
            <Link href="/lambskin" ariaLabel="lambskin" handleClick={() => showNavMobile = false}>
              <span>Lambskin</span>
            </Link>
          </div>
          <div class="flex flex-col gap-4">
            {#if $session}
              <Link href="/account" ariaLabel="account" handleClick={() => showNavMobile = false}>Account</Link>
              <!-- <Button {...signOutButtonProps} /> -->
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
            <Link href="/feather-dusters" ariaLabel="feather dusters">
              <span>Feather Dusters</span>
            </Link>
            <Link href="/eggshells" ariaLabel="eggshells">
              <span>Eggshells</span>
            </Link>
            <Link href="/lambskin" ariaLabel="lambskin">
              <span>Lambskin</span>
            </Link>
          </div>
        </div>
        <div class="hidden lg:flex">
          <div class="flex flex-col gap-4 flex-shrink-0 lg:flex-row items-center">
            {#if $session}
              <Link href="/account" ariaLabel="account">Account</Link>
              <!-- <Button {...signOutButtonProps} /> -->
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