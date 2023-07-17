<!-- @format -->
<script lang="ts">
  import { page } from '$app/stores';
  import Button from '$components/Button.svelte';

  // components
  import Heading from '$components/Heading.svelte';
  import Link from '$components/Link.svelte';

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

<div class="m-8 flex flex-col items-center gap-8">
  <Heading>
    <span>Account</span>
  </Heading>
  {#if $page.data.session}
    <div class="flex flex-col items-center gap-8">
      <Link href="/account/orders" customClass="text-sky-500">Orders</Link>
      <Link href="/account/reviews" customClass="text-sky-500">Reviews</Link>
    </div>
    <Button
      customClass="bg-sky-500 text-white"
      handleClick={async () => await $page.data.supabase.auth.signOut()}
    >
      Sign Out
    </Button>
  {:else}
    <Link href="/account/sign-in">Sign In</Link>
  {/if}
</div>
