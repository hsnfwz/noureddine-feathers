<script lang="ts">
  import { onMount } from 'svelte';

  // utils
  import { calculateSalePrice, formatCurrency, getMinPrice, getMaxPrice, formatCategory } from 'utils/helpers';

  // types
  import type ProductType from 'types/ProductType';
  import type LinkPropsType from 'types/props/LinkPropsType';

  // components
  import Stars from 'components/shared/Stars.svelte';
  import Link from 'components/shared/Link.svelte';
  import ProductCardSkeleton from 'components/ProductCard/ProductCardSkeleton.svelte';

  // props
  export let product: ProductType;

  // state
  let loading: boolean = true;

  onMount(() => loading = false);

  const productLinkProps: LinkPropsType = {
    href: `/${formatCategory(product.category)}/${product.id}`,
    ariaLabel: product.name,
  }

  const starsProps = {
    ratings: product.ratings.map((rating: any) => rating.rating),
    id: product.id,
  }
</script>

{#if loading}
  <ProductCardSkeleton />
{:else}
  <div class="flex flex-col">
    <Link {...productLinkProps}>
      <div class="flex justify-center p-2 bg-gray-100 hover:opacity-25 transition-all">
        <img
          src={product.thumbnail}
          alt={product.name}
          width="500"
          height="500"
        />
      </div>
    </Link>
    <div class="flex flex-col gap-2 pt-4">
      <p>{product.name}</p>
      <p class="text-gray-500">{product.color} &#183; {product.size}&#8243;</p>
      <div class="flex gap-2">
        <p>
          {formatCurrency(calculateSalePrice(getMinPrice(product.prices_quantities), product.sale_percent))} - {formatCurrency(calculateSalePrice(getMaxPrice(product.prices_quantities), product.sale_percent))}
        </p>
      </div>
      <Stars {...starsProps} />
    </div>
  </div>
{/if}