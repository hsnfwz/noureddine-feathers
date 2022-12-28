<script lang="ts">
  // components
  import Button from '$components/Button/Button.svelte';
  import MinusIcon from '$components/icons/IconMinus.svelte';
  import PlusIcon from '$components/icons/IconPlus.svelte';

  // props
  export let value: number = 1;

  const incrementQuantity = () => {
    value = value + 1;

    if (value > 100) value = 100;
  }

  const decrementQuantity = () => {
    value = value - 1;

    if (value < 1) value = 1;
  }
</script>

<div class="flex rounded-sm">
  <div class="flex justify-center items-center">
    <Button
      handleClick={() => decrementQuantity()}
      disabled={value === 1}
    >
      <div class="px-4 py-2 bg-neutral-100 cursor-pointer rounded">
        <div class="w-6 h-6">
          <MinusIcon />
        </div>
      </div>
    </Button>
  </div>
  <div class="flex justify-center items-center">
    <p class="w-16 text-center">{value}</p>
  </div>
  <div class="flex justify-center items-center">
    <Button
      handleClick={() => incrementQuantity()}
      disabled={value === 100}
    >
      <div class="px-4 py-2 bg-neutral-100 cursor-pointer rounded">
        <div class="w-6 h-6">
          <PlusIcon />
        </div>
      </div>
    </Button>
  </div>
</div>