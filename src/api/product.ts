
// types
import type I_ProductTableRecord from '$interfaces/I_ProductTableRecord';

// utils
import { groupBy } from '$helpers/helpers';

// config
import supabase from '$config/supabase';

/* TODO: do not fetch every attribute */
/* TODO: fetching products better (limits, separating requests within the function into their own functions) */

const getProductById = async (id: string) => {
  try {
    const [
      { data: productData, error: productError },
      { data: productPriceQuantityData, error: productPriceQuantityError },
      { data: productRatingData, error: productRatingError },
      { data: productImageData, error: productImageError },
    ] = await Promise.all([
      supabase.from('product').select('*').match({ id }),
      supabase.from('product_price_quantity').select('*').match({ product_id: id }),
      supabase.from('profile_product_rating').select('*').match({ product_id: id }),
      supabase.from('product_image').select('*').match({ product_id: id }),
    ]);

    if (productError) console.log('[getProductById] productError', productError);
    if (productPriceQuantityError) console.log('[getProductById] productPriceQuantityError', productPriceQuantityError);
    if (productRatingError) console.log('[getProductById] productRatingError', productRatingError);
    if (productImageError) console.log('[getProductById] productImageError', productImageError);

    if (!productData || !productPriceQuantityData || !productRatingData || !productImageData) return undefined;

    const groupedProductPriceQuantityData = groupBy(productPriceQuantityData, 'product_id');
    const groupedProductRatingData = groupBy(productRatingData, 'product_id');
    const groupedProductImageData = groupBy(productImageData, 'product_id');

    const result: I_ProductTableRecord[] = productData.map(product => {
      product['prices_quantities'] = groupedProductPriceQuantityData[product.id] || [];
      product['ratings'] = groupedProductRatingData[product.id] || [];
      product['images'] = groupedProductImageData[product.id] || [];
      return product;
    });
  
    return result[0];
  } catch (error) {
    console.log('[getProductById]', error);
  }
}

const getProducts = async (filters: {} = {}, sort: { key: string, value: { ascending: boolean } } = { key: 'size', value: { ascending: false } }, limit: number = 10) => {
  try {
    const [
      { data: productData, error: productError },
      { data: productPriceQuantityData, error: productPriceQuantityError },
      { data: productRatingData, error: productRatingError },
    ] = await Promise.all([
      supabase.from('product').select('*').match({ ...filters, is_hidden: false}).order(sort.key, sort.value),
      supabase.from('product_price_quantity').select('*'),
      supabase.from('profile_product_rating').select('*'),
    ]);

    if (productError) console.log('[getProducts] productError', productError);
    if (productPriceQuantityError) console.log('[getProducts] productPriceQuantityError', productPriceQuantityError);
    if (productRatingError) console.log('[getProducts] productRatingError', productRatingError);

    if (!productData || !productPriceQuantityData || !productRatingData) return undefined;

    const groupedProductPriceQuantityData = groupBy(productPriceQuantityData, 'product_id');
    const groupedProductRatingData = groupBy(productRatingData, 'product_id');

    const result: I_ProductTableRecord[] = productData.map(product => {
      product['prices_quantities'] = groupedProductPriceQuantityData[product.id] || [];
      product['ratings'] = groupedProductRatingData[product.id] || [];
      return product;
    });
  
    return result;
  } catch (error) {
    console.log('[getProducts]', error);
  }
}

export {
  getProductById,
  getProducts,
}