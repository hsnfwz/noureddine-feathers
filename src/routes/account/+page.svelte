<script lang="ts">
  // components
  import Button from '$components/Button/Button.svelte';
  import Heading from '$components/Heading/Heading.svelte';
  import Link from '$components/Link/Link.svelte';

  // stores
  import { session } from '$stores/SessionStore';
</script>

{#if $session}
  <div class="flex flex-col gap-8 items-center">
    <Heading>
      <span>Account</span>
    </Heading>
    <div>
      <Button
        handleClick={async () => {
          await session.signOutUser();
          if (window) window.location.replace('/');
        }}
        customClass="bg-gray-100 p-2"
      >
        <span>Sign Out</span>
      </Button>
    </div>
  </div>
{:else}
  <div class="flex flex-col gap-8 items-center">
    <Heading>
      <span>Account</span>
    </Heading>
    <p><Link href="/sign-in" ariaLabel="Sign In">Sign in</Link> to view your account</p>
  </div>
{/if}