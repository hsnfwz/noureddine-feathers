<script lang="ts">
  export let href: string;
  export let ariaLabel: string;
  export let text: string = '';
  export let color: string = '';

  let _class = 'text-center align-middle hover:underline';

  if (color) _class = _class + ' ' + color;

</script>

<a class={_class} href={href} aria-label={ariaLabel}>
  {#if text}
    {text}
  {:else}
    <slot />
  {/if}
</a>