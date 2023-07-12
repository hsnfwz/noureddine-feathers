<script lang="ts">
  // props
  export let customClass: string = "";
  export let disabled: boolean = false;
  export let handleClick: () => void;

  // helpers
  import { generateClass } from "$helpers/helpers";

  const _class = generateClass(
    [
      "flex justify-center items-center uppercase disabled:opacity-25 disabled:pointer-events-none",
      customClass,
    ],
    [{ "bg-neutral-100": customClass === "" }]
  );
</script>

<button
  class={_class}
  type="button"
  {disabled}
  on:click={(event) => {
    event.preventDefault();
    handleClick();
  }}
>
  <slot />
</button>
