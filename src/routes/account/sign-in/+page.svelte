<!-- @format -->
<script lang="ts">
  import { enhance } from '$app/forms';
  import { page } from '$app/stores';
  export let form;

  // components
  import Heading from '$components/Heading.svelte';
  import Button from '$components/Button.svelte';
  import Link from '$components/Link.svelte';
</script>

<svelte:head>
  <title>Sign In | Noureddine Feathers</title>
  <meta
    name="description"
    content="Sign In | Noureddine Feathers - Shop premium ostrich feather dusters, premium extendable lambswool dusters, premium lambswool dusters, ostrich feathers, and ostrich eggshells - handmade from 100% natural farm-raised ostrich feathers and eggshells"
  />
</svelte:head>

<div class="flex w-full flex-col gap-8 p-8 lg:w-3/5">
  <Heading>
    <span>Sign In</span>
  </Heading>
  {#if $page.data.session}
    <p>You are signed in!</p>
  {:else if form?.success === true}
    <div class="flex flex-col gap-8">
      <p>{form?.message}</p>
    </div>
  {:else}
    <form
      method="post"
      use:enhance
      class="flex flex-col gap-8 rounded bg-neutral-100 p-4"
    >
      <div class="flex flex-col gap-4">
        <label
          for="email"
          class={`${form?.success === false ? 'text-rose-500' : ''}`}
          >* Email</label
        >
        <input
          id="email"
          name="email"
          autoComplete="off"
          value={form?.email ?? ''}
          class={`${
            form?.success === false ? 'border-rose-500' : 'border-white'
          } box-border w-full rounded border-2 p-2`}
          placeholder="Email"
        />
      </div>
      {#if form?.success === false}
        <p class="text-rose-500">{form?.message}</p>
      {/if}
      <Button
        customClass="bg-sky-400 text-white px-8 py-4 hover:bg-sky-500 transition-all rounded-full"
        type="submit">Sign In</Button
      >
      <p>
        By signing in, you agree to our <Link
          customClass="text-sky-500 hover:underline transition-all"
          href="/info/terms-of-service">Terms of Service.</Link
        >
      </p>
    </form>
  {/if}
</div>
