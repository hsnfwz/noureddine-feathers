
// types
import type ProductPriceQuantityType from 'types/ProductPriceQuantityType';

type ProductType = {
  id: number,
  created_at: string,
  thumbnail: string,
  sale_percent: number,
  sale_start_at: string,
  sale_end_at: string,
  name: string,
  description: string,
  serial_number: string,
  size: number,
  color: string,
  is_new: boolean,
  is_coming_soon: boolean,
  is_on_sale: boolean,
  is_out_of_stock: boolean,
  images: { url: string }[],
  ratings: [],
  prices_quantities: ProductPriceQuantityType[],
  category: string,
  is_hidden: boolean,
  stripe_product_id: string,
  size_unit: string,
}

export default ProductType;
