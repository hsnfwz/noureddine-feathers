<script lang="ts">
  // utils
  import { calculateAverageRating } from '@/src/utils/helpers';

  // components
  import StarIcon from '@/src/components/icons/StarIcon.svelte';

  // props
  export let ratings: number[] = [];
  export let id: string | number = '';

  // state
  let starIconProps: {}[] = [];

  const ratingMax = 5;
  const productRating = calculateAverageRating(ratings);
  const productRatingRoundPortion = +(productRating + '').split('.')[0] || 0;
  const productRatingDecimalPortion = +(productRating + '').split('.')[1]*10 || 0;

  let index = 0;
  while (index < ratingMax) {
    let offsetBlack = '0%';

    if (index < productRatingRoundPortion) offsetBlack = 100 + '%';
    if (index === productRatingRoundPortion) offsetBlack = productRatingDecimalPortion + '%';
    if (index > productRatingRoundPortion) offsetBlack = 0 + '%';

    starIconProps.push({
      linearGradientId: `${id}-${index}`,
      offset: offsetBlack,
    });

    index++;
  }
</script>

<div class="flex gap-2">
  <div class="flex">
    {#each starIconProps as props}
      <StarIcon {...props} />
    {/each}
  </div>
  <p>
    ({ratings.length})
  </p>
</div>