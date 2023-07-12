<script lang="ts">
  import { page } from "$app/stores";

  // components
  import Heading from "$components/Heading/Heading.svelte";
  import Link from "$components/Link/Link.svelte";

  // state
  // let email: string = '';
  // let showSuccessMessage: boolean = false;
  // let showErrorMessage: boolean = false;
  // let showUpdateEmailError: boolean = false;

  // const handleSubmit = async () => {
  //   if (email.length < 3) {
  //     showErrorMessage = true;
  //   } else {
  //     const { data, error } = await supabase.auth.updateUser({ email });

  //     if (error) {
  //       showUpdateEmailError = true;
  //     } else {
  //       console.log(data, error);
  //       showSuccessMessage = true;
  //     }
  //   }
  // }

  // $: {
  //   if (showErrorMessage) setTimeout(() => showErrorMessage = false, 2000);
  //   if (showUpdateEmailError) setTimeout(() => showUpdateEmailError = false, 2000);
  // }
</script>

<svelte:head>
  <title>Account | Noureddine Feathers</title>
  <meta
    name="description"
    content="Noureddine Feathers - Shop premium ostrich feather dusters, premium extendable lambswool dusters, premium lambswool dusters, ostrich feathers, and ostrich eggshells - handmade from 100% natural farm-raised ostrich feathers and eggshells"
  />
</svelte:head>

<div class="flex flex-col items-center gap-4">
  <Heading>
    <span>Account</span>
  </Heading>
  {#if $page.data.session}
    <div class="flex flex-col items-center gap-4">
      <a href="/account/orders" class="text-blue-500">Orders</a>
      <a href="/account/reviews" class="text-blue-500">Reviews</a>
    </div>
    <button
      class="nf-font-bold rounded bg-neutral-100 px-4 py-2"
      type="button"
      on:click={async () => await $page.data.supabase.auth.signOut()}
    >
      Sign Out
    </button>
  {:else}
    <Link href="/account/sign-in" ariaLabel="account">Sign In</Link>
  {/if}
</div>
