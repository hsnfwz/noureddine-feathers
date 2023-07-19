<!-- @format -->
<script lang="ts">
  // styles
  import './styles.css';

  import { invalidate } from '$app/navigation';
  import { onMount } from 'svelte';

  export let data;

  let { supabase, session } = data;
  $: ({ supabase, session } = data);

  onMount(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, _session) => {
      if (_session?.expires_at !== session?.expires_at) {
        invalidate('supabase:auth');
      }
    });

    return () => subscription.unsubscribe();
  });

  // store
  import { cart } from '$stores/CartStore';

  // components
  import Nav from '$components/Nav.svelte';
  import Footer from '$components/Footer.svelte';

  onMount(() => cart.getCartItems());
</script>

<main class="min-h-screen bg-white">
  <Nav />
  <slot />
  <Footer />
</main>
