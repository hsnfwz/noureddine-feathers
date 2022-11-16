<script lang="ts">
  export let fill: string = 'fill-none';

  let _class = 'w-6 h-6';

  if (fill) _class = _class + ' ' + fill;
</script>

<svg
  class={_class}
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke="currentColor"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M19.5 12h-15"
  />
</svg>