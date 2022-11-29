<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  // components
  import Link from '$components/Link/Link.svelte';
  import Button from '$components/Button/Button.svelte';

  // stores
  import { session } from '$stores/SessionStore';

  // state
  let email: string = '';
  let showSuccessMessage: boolean = false;
  let visible: boolean = false;

  let subscriptionAuthStateChange: any;

  onMount(async () => {
    subscriptionAuthStateChange = session.subscribeAuthStateChange();

    await session.getSession();

    if ($session) {
      window.location.replace('/');
      visible = false;
    } else {
      visible = true;
    }
  });

  onDestroy(() => session.unsubscribeAuthStateChange(subscriptionAuthStateChange));

  const handleSubmit = async () => {
    showSuccessMessage = true;
    await session.signInUser(email);
  }
</script>

{#if visible}
  <div class="flex flex-col justify-center items-center gap-8 my-8">
    {#if showSuccessMessage}
      <p>Check your email</p>
      <p class="text-center">
        We sent an email to you at <span class="nf-font-bold">{email}</span>. It has a magic link that will sign you in.
      </p>
    {:else}
      <form class="flex flex-col gap-4">
        <label for="user-email">Please enter your email</label>
        <input
          id="user-email"
          type="email"
          autoComplete="off"
          placeholder="Email"
          bind:value={email}
          class="p-2 border-2 border-gray-100 box-border w-full"
        />
        <Button
          handleClick={async () => await handleSubmit()}
          customClass="bg-blue-500 text-white p-2"
          disabled={email.length < 3}
        >
          <span>Sign In</span>
        </Button>
        <p>By signing in, you agree to our <span class="text-neutral-500 nf-font-bold"><Link href="/terms-and-conditions" ariaLabel="terms and conditions">Terms and Conditions.</Link></span></p>
      </form>
    {/if}
  </div>
{/if}