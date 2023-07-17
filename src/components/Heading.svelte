<!-- @format -->
<script lang="ts">
  // props
  export let customClass: string = '';
</script>
<h1 class={`montserrat-bold text-xl uppercase ${customClass}`}>
  <slot />
</h1>
