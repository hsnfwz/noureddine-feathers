<script lang="ts">
  // styles
  import './styles.css';

  import { onMount, onDestroy } from 'svelte';

  // store
  import { cart } from '$stores/CartStore';

  // components
  import Nav from '$components/Nav/Nav.svelte';
  import Footer from '$components/Footer/Footer.svelte';

  // interfaces
  import type I_Profile from '$interfaces/I_Profile';

  // api
  import { getProfileByUserId, insertProfile } from '$api/profile';

  // stores
  import { session } from '$stores/SessionStore';
  import { profile } from '$stores/ProfileStore';

  // config
  import supabase from '$config/supabase';

  // state
  let isLoading = true;
  let subscriptionAuthStateChange: any;

  onMount(() => cart.getCartItems());

  onMount(async () => {
    subscriptionAuthStateChange = supabase.auth.onAuthStateChange((event, currentSession) => {
      if (event === 'SIGNED_OUT' || event === 'USER_DELETED') {
        session.set(undefined);
        profile.set(undefined);
      }
    });

    const currentSession = await supabase.auth.getSession();

    if (currentSession && currentSession.data && currentSession.data.session) {
      session.set({ userId: currentSession.data.session.user.id });

      let profileRecord: I_Profile | undefined = await getProfileByUserId(currentSession.data.session.user.id);

      if (!profileRecord) {
        profileRecord = await insertProfile({ userId: currentSession.data.session.user.id });
      }

      profile.set(profileRecord);
    }

    isLoading = false;
  });

  onDestroy(() => subscriptionAuthStateChange?.data?.subscription?.unsubscribe());
</script>

{#if !isLoading}
  <main class="bg-white min-h-screen">
    <Nav />
    <div class="flex flex-col gap-4 m-4">
      <slot />
    </div>
    <Footer />
  </main>
{/if}