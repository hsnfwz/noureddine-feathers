// api
import { getProducts } from '$api/product';

// interfaces
import type I_Product from '$interfaces/I_Product';

export async function load({ params }: any) {
  const products: I_Product[] | undefined = await getProducts({ name: 'Premium Extendable Lambswool Duster' });

  return { products: products || [] };
}