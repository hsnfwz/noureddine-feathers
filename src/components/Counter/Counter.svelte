<script lang="ts">
  // components
  import Button from "$components/Button/Button.svelte";
  import MinusIcon from "$components/icons/IconMinus.svelte";
  import PlusIcon from "$components/icons/IconPlus.svelte";

  // props
  export let value: number = 1;

  const incrementQuantity = () => {
    value = value + 1;

    if (value > 100) value = 100;
  };

  const decrementQuantity = () => {
    value = value - 1;

    if (value < 1) value = 1;
  };
</script>

<div class="flex rounded-sm">
  <div class="flex items-center justify-center">
    <Button handleClick={() => decrementQuantity()} disabled={value === 1}>
      <div class="cursor-pointer rounded bg-neutral-100 p-2">
        <div class="h-6 w-6">
          <MinusIcon />
        </div>
      </div>
    </Button>
  </div>
  <div class="flex items-center justify-center">
    <p class="w-16 text-center">{value}</p>
  </div>
  <div class="flex items-center justify-center">
    <Button handleClick={() => incrementQuantity()} disabled={value === 100}>
      <div class="cursor-pointer rounded bg-neutral-100 p-2">
        <div class="h-6 w-6">
          <PlusIcon />
        </div>
      </div>
    </Button>
  </div>
</div>
