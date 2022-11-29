<script lang="ts">
  import { onMount } from 'svelte';

  // store
  import { cart } from '$stores/CartStore';

  // components
  import Nav from '$components/Nav/Nav.svelte';
  import Footer from '$components/Footer/Footer.svelte';

  // styles
  import './styles.css';

  onMount(() => cart.getCartProducts());
</script>

<main>
  <Nav />
  <slot />
  <Footer />
</main>