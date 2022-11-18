<script lang="ts">
  // props
  export let href: string;
  export let ariaLabel: string;
  export let text: string = '';
  export let color: string = '';

  let _class = 'text-center hover:underline';

  if (color) _class = _class + ' ' + color;
</script>

<a class={_class} href={href} aria-label={ariaLabel}>
  {text}
  <slot />
</a>