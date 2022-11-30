<script lang="ts">
  // components
  import CartCardGrid from '$components/CartCardGrid/CartCardGrid.svelte';
  import CheckoutForm from '$components/CheckoutForm/CheckoutForm.svelte';
  import Heading from '$components/Heading/Heading.svelte';
</script>

<svelte:head>
  <title>Cart | Noureddine Feathers</title>
  <meta name="description" content="Cart | Noureddine Feathers - Shop ostrich feather dusters, lambswool dusters, extendable lambswool dusters, ostrich eggshells, and ostrich feathers - handmade from 100% natural farm-raised ostrich feathers and eggshells" />
</svelte:head>

<div class="mx-8">
  <div class="flex flex-col gap-8">
    <div class="flex flex-col justify-center items-center gap-8">
      <Heading>
        <span>Cart</span>
      </Heading>
      <div class="flex flex-col lg:flex-row gap-8">
        <CartCardGrid />
        <CheckoutForm />
      </div>
    </div>
  </div>
</div>