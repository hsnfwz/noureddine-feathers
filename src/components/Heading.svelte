<!-- @format -->
<script lang="ts">
  // props
  export let customClass: string = '';
</script>

<h1 class={`montserrat-bold text-2xl uppercase ${customClass}`}>
  <slot />
</h1>
