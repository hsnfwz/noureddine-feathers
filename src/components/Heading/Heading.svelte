<script lang="ts">
  // props
  export let customClass: string = '';
</script>

<h1 class={`text-xl font-bold uppercase ${customClass}`}>
  <slot />
</h1>