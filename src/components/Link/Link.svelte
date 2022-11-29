<script lang="ts">
  // props
  export let customClass: string = '';
  export let href: string;
  export let ariaLabel: string;
</script>

<a class={`text-center hover:underline ${customClass}`} href={href} aria-label={ariaLabel}>
  <slot />
</a>