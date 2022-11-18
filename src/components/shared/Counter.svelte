<script lang="ts">
  // components
  import Button from 'components/shared/Button.svelte';
  import MinusIcon from 'components/icons/MinusIcon.svelte';
  import PlusIcon from 'components/icons/PlusIcon.svelte';

  // props
  export let label: string = '';
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

<div class="flex gap-2">
  <p class="flex flex-grow items-center">{label}</p>
  <div class="flex rounded-sm">
    <div class="flex justify-center items-center">
      <Button
        onClick={() => decrementQuantity()}
        disabled={value === 1}
      >
        <div class="px-4 py-2 bg-gray-100 hover:border-black cursor-pointer">
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
        onClick={() => incrementQuantity()}
        disabled={value === 100}
      >
        <div class="px-4 py-2 bg-gray-100 hover:border-black cursor-pointer">
          <div class="w-6 h-6">
            <PlusIcon />
          </div>
        </div>
      </Button>
    </div>
  </div>
</div>