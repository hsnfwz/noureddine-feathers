<script lang="ts">
  // components
  import Button from '$components/Button/Button.svelte';
  import Heading from '$components/Heading/Heading.svelte';
  import Link from '$components/Link/Link.svelte';

  // supabase
  import supabase from '$config/supabase';

  // stores
  import { session } from '$stores/SessionStore';

  // state
  let currentSession: any = undefined;

  session.subscribe((value) => currentSession = value);
</script>

<div class="flex flex-col items-center gap-4">
  <Heading>
    <span>Account</span>
  </Heading>
  {#if currentSession}
    <button
      class="px-4 py-2 bg-neutral-100 rounded nf-font-bold"
      type="button"
      on:click={async () => await supabase.auth.signOut()}
    >
      Sign Out
    </button>
  {:else}
    <p><Link href="/sign-in" ariaLabel="Sign In" customClass="text-blue-500">Sign in</Link> to view your account</p>
  {/if}
</div>