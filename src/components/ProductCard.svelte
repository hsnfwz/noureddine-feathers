<script lang="ts">
  // utils
  import { calculateSalePrice, formatCurrency, getMinPrice, getMaxPrice, formatCategory } from 'utils/helpers';

  // types
  import type ProductType from 'types/ProductType';
  import type LinkPropsType from 'types/props/LinkPropsType';

  // components
  import Stars from 'components/shared/Stars.svelte';
  import Link from 'components/shared/Link.svelte';

  // props
  export let product: ProductType;

  const productLinkProps: LinkPropsType = {
    href: `/${formatCategory(product.category)}/${product.id}`,
    ariaLabel: product.name,
  }

  const starsProps = {
    ratings: product.ratings.map((rating: any) => rating.rating),
    id: product.id,
  }
</script>

<div class="flex flex-col border-2 border-gray-100 rounded-sm">
  <Link {...productLinkProps}>
    <div class="text-center p-2 bg-gray-100 hover:opacity-25 transition-all">
      <img
        src={product.thumbnail}
        alt={product.name}
        width="500"
        height="500"
      />
    </div>
  </Link>
  <div class="flex flex-col gap-2 p-4">
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