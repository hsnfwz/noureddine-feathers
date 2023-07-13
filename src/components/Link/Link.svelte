<script lang="ts">
  // props
  export let customClass: string = "";
  export let href: string;
  export let ariaLabel: string;
  export let handleClick: (() => void) | undefined = undefined;
</script>

<a
  class={`text-center ${customClass}`}
  {href}
  aria-label={ariaLabel}
  on:click={() => {
    if (handleClick) handleClick();
  }}
>
  <slot />
</a>
