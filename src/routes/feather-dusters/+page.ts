// api
import { getProducts } from '$api/product';

// interfaces
import type I_ProductTableRecord from '$interfaces/I_ProductTableRecord';

export async function load({ params }) {
  const products: I_ProductTableRecord[] | undefined = await getProducts({ category: 'Feather Dusters' });

  return {
    products,
  };
}