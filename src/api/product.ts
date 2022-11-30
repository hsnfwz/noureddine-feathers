// interfaces
import type I_Product from '$interfaces/I_Product';

// helpers
import { groupBy } from '$helpers/helpers';

// config
import supabase from '$config/supabase';

const getProductById = async (id: string): Promise<I_Product | undefined> => {
  let product: I_Product | undefined = undefined;

  const productQuery = supabase
  .from('product')
  .select('id, thumbnail_url, name, description, color, size, size_unit, category')
  .match({ id });

  const productPriceQuery = supabase
  .from('product_price')
  .select('id, price, quantity, product_id, stripe_price_id')
  .match({ product_id: id });

  const productRatingQuery = supabase
  .from('product_rating')
  .select('id, rating, product_id')
  .match({ product_id: id });

  const [
    { data: productData, error: productError },
    { data: productPriceData, error: productPriceError },
    { data: productRatingData, error: productRatingError },
  ] = await Promise.all([
    productQuery,
    productPriceQuery,
    productRatingQuery
  ]);

  if (productError || productPriceError || productRatingError) {
    console.log('[getProductById]:[error]', productError, productPriceError, productRatingError);
    return product;
  }

  if (!productData || !productPriceData || !productRatingData) {
    console.log('[getProductById]:[null]', productData, productPriceData, productRatingData);
    return product;
  }

  const groupedProductPriceData = groupBy(productPriceData, 'product_id');
  const groupedProductRatingData = groupBy(productRatingData, 'product_id');

  product = productData.map((productRecord: any) => {
    const product: I_Product = {
      ...productRecord,
      prices: groupedProductPriceData[productRecord.id] || [],
      ratings: groupedProductRatingData[productRecord.id] || [],
    };

    return product;
  })[0];

  return product;
}

const getProducts = async (filters: {} = {}, sort: { key: string, value: { ascending: boolean } } = { key: 'size', value: { ascending: false } }, limit: number = 10): Promise<I_Product[] | undefined> => {
  let products: I_Product[] = [];

  const productQuery = supabase
  .from('product')
  .select('id, thumbnail_url, name, color, size, size_unit, category')
  .match({ ...filters, is_hidden: false })
  .order(sort.key, sort.value);

  const productPriceQuery = supabase
  .from('product_price')
  .select('id, price, quantity, product_id, stripe_price_id');

  const productRatingQuery = supabase
  .from('product_rating')
  .select('id, rating, product_id');

  const [
    { data: productData, error: productError },
    { data: productPriceData, error: productPriceError },
    { data: productRatingData, error: productRatingError },
  ] = await Promise.all([
    productQuery,
    productPriceQuery,
    productRatingQuery
  ]);

  if (productError || productPriceError || productRatingError) {
    console.log('[getProducts]:[error]', productError, productPriceError, productRatingError);
    return products;
  }

  if (!productData || !productPriceData || !productRatingData) {
    console.log('[getProducts]:[null]', productData, productPriceData, productRatingData);
    return products;
  }

  const groupedProductPriceData = groupBy(productPriceData, 'product_id');
  const groupedProductRatingData = groupBy(productRatingData, 'product_id');

  products = productData.map((productRecord: any) => {
    const product: I_Product = {
      ...productRecord,
      prices: groupedProductPriceData[productRecord.id] || [],
      ratings: groupedProductRatingData[productRecord.id] || [],
    };

    return product;
  });

  return products;
}

export {
  getProductById,
  getProducts,
}