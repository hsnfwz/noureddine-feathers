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
    subscriptionAuthStateChange = supabase.auth.onAuthStateChange((event: any, sbSession: any) => {
      if (event === 'SIGNED_OUT' || event === 'USER_DELETED') {
        session.set(undefined);
        profile.set(undefined);
        console.log('SIGNED OUT');
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        console.log('SIGNED IN');
      } else if (event === 'USER_UPDATED') {
        session.set({ userId: sbSession.user.id, userEmail: sbSession.user.email });
        console.log('USER UPDATED', session);
      }
    });

    const currentSession = await supabase.auth.getSession();

    if (currentSession && currentSession.data && currentSession.data.session) {
      session.set({ userId: currentSession.data.session.user.id, userEmail: currentSession.data.session.user.email });

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
    <div class="text-center p-2"><p class="uppercase"><span class="nf-font-bold">Free shipping</span> on orders over $600</p></div>
    <Nav />
    <div class="flex flex-col gap-4 m-4">
      <slot />
    </div>
    <Footer />
  </main>
{/if}

<!-- 

  todo:
  - customize stripe checkout page
  - look into redirecting user after signing in after clicking "sign in to checkout"
  - fix scroll on product details - edge and chrome act differently
  - combine lamsbwool dusters with extendables
  - make items on display smaller or show more at a time
  - can you display the package for each item on the checkout page
  - compress images below 100kb
  - user reviews (uncomment out the stars)
  - user display name
  - filter, sort, search
  - replace localstorage cart with db cart

 -->