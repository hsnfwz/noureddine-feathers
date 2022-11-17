<script lang="ts">
  export let text: string;
  export let textColor: string = '';
  export let center: boolean = false;
  export let uppercase: boolean = false;
  export let bold: boolean = false;

  let _class = 'text-x1';

  if (textColor) _class = _class + ' ' + textColor;
  if (center) _class = _class + ' ' + 'text-center';
  if (uppercase) _class = _class + ' ' + 'uppercase';
  if (bold) _class = _class + ' ' + 'font-bold';

</script>

<h1 class={_class}>
  {text}
</h1>
