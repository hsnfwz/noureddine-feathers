<script lang="ts">
  // components
  import Heading from '$components/Heading/Heading.svelte';

  // interfaces
  import type I_Profile from '$interfaces/I_Profile';

  // stores
  import { profile } from '$stores/ProfileStore';
  import { session } from '$stores/SessionStore';

  // supabase
  import supabase from '$config/supabase';

  // state
  let currentSession: any;
  let currentProfile: I_Profile | undefined;
  let email: string = '';
  let showSuccessMessage: boolean = false;
  let showErrorMessage: boolean = false;
  let showUpdateEmailError: boolean = false;

  profile.subscribe(async (value) => currentProfile = value);
  session.subscribe(async (value) => {
    if (value) {
      email = value.userEmail;
    }

    currentSession = value;
  });

  const handleSubmit = async () => {
    if (email.length < 3) {
      showErrorMessage = true;
    } else {
      const { data, error } = await supabase.auth.updateUser({ email });

      if (error) {
        showUpdateEmailError = true;
      } else {
        console.log(data, error);
        showSuccessMessage = true;
      }
    }
  }

  $: {
    if (showErrorMessage) setTimeout(() => showErrorMessage = false, 2000);
    if (showUpdateEmailError) setTimeout(() => showUpdateEmailError = false, 2000);
  }
</script>

<div class="flex flex-col items-center gap-4">
  <Heading>
    <span>Account</span>
  </Heading>
  {#if currentSession && currentProfile}
    <div class="flex flex-col items-center gap-4">
      <a href="/account/orders" class="text-blue-500">Orders</a>
      <a href="/account/reviews" class="text-blue-500">Reviews</a>
    </div>
    {#if showSuccessMessage}
      <div class="flex flex-col gap-4 w-60">
        <p class="text-center">
          We sent an email to you at <span class="nf-font-bold">{email}</span>. It has a magic link that will update your email.
        </p>
      </div>
    {:else}
      <form class="flex flex-col gap-4 w-60 bg-neutral-100 p-4 rounded-lg">
        <div class="flex flex-col gap-2">
          <label for="user-email" class={`${showErrorMessage ? 'text-red-500' : ''}`}>* Email</label>
          <input
            id="user-email"
            type="email"
            autoComplete="off"
            bind:value={email}
            class={`${showErrorMessage ? 'border-red-500' : 'border-white'} p-2 box-border border-2 w-full rounded`}
            placeholder="Email"
          />
        </div>
        {#if showErrorMessage}
          <p class="text-red-500">Email must be between 3 and 320 characters</p>
        {/if}
        {#if showUpdateEmailError}
          <p class="text-red-500">An account with email {email} already exists</p>
        {/if}
        <button
          class="rounded px-4 py-2 bg-blue-500 text-white nf-font-bold disabled:opacity-50"
          on:click={async () => await handleSubmit()}
          disabled={showErrorMessage || (currentSession.userEmail === email)}
        >
          Update
        </button>
      </form>
    {/if}
    <button
      class="px-4 py-2 bg-neutral-100 rounded nf-font-bold"
      type="button"
      on:click={async () => await supabase.auth.signOut()}
    >
      Sign Out
    </button>
  {:else}
    <p><a href="/sign-in" class="text-blue-500">Sign in</a> to view your account</p>
  {/if}
</div>