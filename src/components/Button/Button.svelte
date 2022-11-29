<script lang="ts">
  // props
  export let customClass: string = '';
  export let disabled: boolean = false;
  export let handleClick: () => void;

  // helpers
  import { generateClass } from '$helpers/helpers';

  const _class = generateClass(
    ['flex justify-center items-center uppercase hover:brightness-75 transition-all cursor-pointer disabled:opacity-25 disabled:pointer-events-none', customClass],
    [
      { 'bg-gray-50': customClass === '' },
    ]
  );
</script>

<button
  class={_class}
  type="button"
  disabled={disabled}
  on:click={(event) => {
    event.preventDefault();
    handleClick();
  }}
>
  <slot />
</button>