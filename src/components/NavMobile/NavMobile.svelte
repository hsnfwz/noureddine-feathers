<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  // lib
  import ImageLogo from '$lib/images/logo.webp';

  // components
  import Link from '$components/Link/Link.svelte';
  import Button from '$components/Button/Button.svelte';
  import IconX from '$components/icons/IconX.svelte';

  // store
  import { session } from '$stores/SessionStore';
  import { cart } from '$stores/CartStore';

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
</script>

<nav class="fixed top-0 bg-gray-50 w-full h-full">
  <div class="flex flex-col gap-4 px-8 py-2">
    <div class="flex gap-4">
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
      <div class="flex items-center flex-1 justify-end lg:hidden">
        <Button handleClick={() => showMenu = false}>
          <IconX />
        </Button>
      </div>
    </div>
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-4">
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
      <div class="flex flex-col gap-4">
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
</nav>