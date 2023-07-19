<!-- @format -->
<script lang="ts">
  export let customClass: string | undefined = '';
  export let type: 'button' | 'submit' | 'reset' | null | undefined = 'button';
  export let disabled: boolean | undefined = false;
  export let selected: boolean | undefined = false;
  export let handleClick: any = undefined;
</script>

<!-- todo: hover and focus state styling -->
<button
  {type}
  {disabled}
  on:click={handleClick}
  class={`montserrat-bold flex items-center justify-center rounded border-2 p-2 disabled:pointer-events-none ${
    selected ? 'pointer-events-none border-black' : 'border-transparent'
  } ${customClass}`}
>
  <slot />
</button>
