<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  // components
  import Link from 'components/shared/Link.svelte';
  import Heading from 'components/shared/Heading.svelte';
  import Button from 'components/shared/Button.svelte';

  // types
  import type LinkPropsType from 'types/props/LinkPropsType';
  import type HeadingPropsType from 'types/props/HeadingPropsType';
  import type ButtonPropsType from 'types/props/ButtonPropsType';

  // stores
  import { session } from 'stores/SessionStore';

  // state
  let email: string = '';
  let showSuccessMessage: boolean = false;
  let showRedirectMessage: boolean = false;
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
    if ($session) showRedirectMessage = true;
  }

  const logoLinkProps: LinkPropsType = {
    href: '/',
    ariaLabel: 'home',
  }

  const checkHeadingProps: HeadingPropsType = {
    text: 'Check your email',
  }

  const redirectHeadingProps: HeadingPropsType = {
    text: 'Successfully Signed In!',
  }

  const signInHeadingProps: HeadingPropsType = {
    text: 'Sign In',
    bold: true,
    uppercase: true,
  }

  let buttonProps: ButtonPropsType = {
    text: 'Sign In',
    onClick: async () => await handleSubmit(),
    disabled: true,
    uppercase: true,
  }

  const redirectLinkProps: LinkPropsType = {
    href: '/',
    ariaLabel: 'home',
    text: 'Home',
  }

  $: buttonProps.disabled = email === '';
</script>

{#if visible}
  <div class="flex flex-col justify-center items-center gap-8 my-8">
    <div class="flex justify-center items-center">
      <Link {...logoLinkProps}>
        <div class="hover:opacity-25 transition-all">
          <img
            src="/rectangle-transparent-logo.webp"
            alt="Noureddine Feathers"
            width="150"
            height="84"
          />
        </div>
      </Link>
    </div>
    {#if showSuccessMessage}
      <Heading {...checkHeadingProps} />
      <p class="text-center">
        We sent an email to you at <span class="font-bold">{email}</span>. It has a magic link that will sign you in.
      </p>
    {:else if showRedirectMessage}
      <Heading {...redirectHeadingProps} />
      <p class="text-center">
        You have been signed in. Return <Link {...redirectLinkProps} />
      </p>
    {:else}
      <!-- <Heading {...signInHeadingProps} /> -->
      <form class="flex flex-col gap-4">
        <label for="user-email">Please enter your email to sign in*</label>
        <input
          id="user-email"
          type="text"
          autoComplete="off"
          placeholder="Email"
          bind:value={email}
          class="p-2 border-2 border-gray-100 box-border w-full"
        />
        <Button {...buttonProps} />
        <p>By signing in, you agree to our <span class="text-neutral-500 font-bold"><Link href="/terms-and-conditions" ariaLabel="terms and conditions">Terms and Conditions.</Link></span></p>
      </form>
    {/if}
  </div>
{/if}