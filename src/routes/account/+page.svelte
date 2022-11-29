<script lang="ts">
  import { onMount } from 'svelte';

  // components
  import Button from '$components/Button/Button.svelte';
  import Heading from '$components/Heading/Heading.svelte';

  // stores
  import { session } from '$stores/SessionStore';

  onMount(() => {
    if (!$session) {
      if (window) window.location.replace('/');
    }
  });
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
{/if}