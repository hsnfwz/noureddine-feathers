// api
import { getProductById } from '$api/product';
import { getProductImagePublicUrls } from '$api/storage';

// interfaces
import type I_Product from '$interfaces/I_Product';

export async function load({ params }: any) {
  const product: I_Product | undefined = await getProductById(params.id);

  let productImagePublicUrls: string[] | undefined = [];

  if (product) {
    productImagePublicUrls = await getProductImagePublicUrls(`${product.name} - ${product.color} - ${product.size} ${product.size_unit}`);
  }

  return { product, productImagePublicUrls: productImagePublicUrls || [] };
}