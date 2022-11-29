<script lang="ts">
  import { onMount } from 'svelte';

  // store
  import { cart } from '$stores/CartStore';

  // components
  import Container from '$components/Container/Container.svelte';
  import Nav from '$components/Nav/Nav.svelte';
  import Footer from '$components/Footer/Footer.svelte';

  // styles
  import './styles.css';

  onMount(() => cart.getCartProducts());
</script>

<main>
  <Nav />
  <!-- <Container> -->
    <slot />
  <!-- </Container> -->
  <Footer />
</main>