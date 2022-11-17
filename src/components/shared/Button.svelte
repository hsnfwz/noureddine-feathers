<script lang="ts">
  export let text: string = '';
  export let disabled: boolean = false;
  export let buttonColor: string = '';
  export let textColor: string = '';
  export let uppercase: boolean = false;
  export let onClick: () => void;

  let _class = '';

  $: {
    _class = '';
    
    if (disabled) {
      _class = _class + ' ' + 'opacity-25 pointer-events-none';
    } else {
      _class = _class + ' ' + 'hover:brightness-75 transition-all'
    }

    if (text) {
      _class = _class + ' ' + 'px-4 py-2 rounded-sm';

      if (textColor) {
        _class = _class + ' ' + textColor;
      } else {
        _class = _class + ' ' + 'text-white';
      }

      if (buttonColor) {
        _class = _class + ' ' + buttonColor;
      } else {
        _class = _class + ' ' + 'bg-blue-500';
      }

      if (uppercase) _class = _class + ' ' + 'uppercase';
    }
  }
</script>

<button
  class={_class}
  type="button"
  disabled={disabled}
  on:click={() => onClick()}
>
  {#if text}
    {text}
  {:else}
    <slot />
  {/if}
</button>