// api
import { getProductById } from '$api/product';

// interfaces
import type I_ProductTableRecord from '$interfaces/I_ProductTableRecord';

export async function load({ params }) {
  const product: I_ProductTableRecord | undefined = await getProductById(params.id);

  return {
    product,
  };
}