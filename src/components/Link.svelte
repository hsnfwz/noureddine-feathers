<!-- @format -->
<script lang="ts">
  // props
  export let customClass: string = '';
  export let href: string;
  export let handleClick: any = undefined;
</script>

<a
  class={`${customClass}`}
  {href}
  aria-label={href}
  on:click={() => handleClick && handleClick()}
>
  <slot />
</a>
