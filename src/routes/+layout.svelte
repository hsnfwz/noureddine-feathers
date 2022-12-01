<script lang="ts">
  import { onMount } from 'svelte';

  // store
  import { cart } from '$stores/CartStore';

  // components
  import Nav from '$components/Nav/Nav.svelte';
  import Footer from '$components/Footer/Footer.svelte';

  // styles
  import './styles.css';

  onMount(() => cart.getCartItems());
</script>

<main>
  <Nav />
  <div class="flex flex-col gap-8 m-8">
    <slot />
  </div>
  <Footer />
</main>