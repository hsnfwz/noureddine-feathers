<script lang="ts">
  // components
  import SignInForm from '$components/SignInForm/SignInForm.svelte';
  import Heading from '$components/Heading/Heading.svelte';
</script>

<svelte:head>
  <title>Sign In | Noureddine Feathers</title>
  <meta name="description" content="Sign In | Noureddine Feathers - Shop premium ostrich feather dusters, premium extendable lambswool dusters, premium lambswool dusters, ostrich feathers, and ostrich eggshells - handmade from 100% natural farm-raised ostrich feathers and eggshells" />
</svelte:head>

<div class="mx-8">
  <Heading customClass="text-center">
    <span>Sign In</span>
  </Heading>
  <div class="flex flex-col gap-8">
    <SignInForm />
  </div>
</div>