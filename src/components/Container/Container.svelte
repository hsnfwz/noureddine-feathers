<script lang="ts">
  // props
  export let customClass: string = '';
  export let isFull: boolean = false;
  export let isFlowXEnd: boolean = false;
  export let isFlowXCenter: boolean = false;
  export let isFlowY: boolean = false;
  export let isFlowYEnd: boolean = false;
  export let isFlowYCenter: boolean = false;
  export let isGapSmall: boolean = false;
  export let isGapLarge: boolean = false;
  export let isPaddingSmall: boolean = false;
  export let isPaddingMedium: boolean = false;
  export let isPaddingLarge: boolean = false;
  export let isMarginSmall: boolean = false;
  export let isMarginMedium: boolean = false;
  export let isMarginLarge: boolean = false;

  // helpers
  import { generateClass } from '$helpers/helpers';

  const _class = generateClass(
    ['flex gap-4', customClass],
    [
      { 'w-full': isFull },
      { 'justify-center': isFlowXCenter },
      { 'justify-end': isFlowXEnd },
      { 'flex-col': isFlowY },
      { 'items-center': isFlowYCenter },
      { 'items-end': isFlowYEnd },
      { 'gap-2': isGapSmall },
      { 'gap-4': isGapLarge },
      { 'gap-2': isPaddingSmall },
      { 'gap-4': isPaddingMedium },
      { 'gap-4': isPaddingLarge },
      { 'gap-2': isMarginSmall },
      { 'gap-4': isMarginMedium },
      { 'gap-4': isMarginLarge },
    ]
  );
</script>

<div class={_class}>
  <slot />
</div>