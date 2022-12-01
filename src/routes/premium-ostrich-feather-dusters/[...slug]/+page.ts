import { error } from '@sveltejs/kit';

// api
import { getProductById } from '$api/product';
import { getProductImagePublicUrls } from '$api/storage';

// interfaces
import type I_Product from '$interfaces/I_Product';

export async function load({ params }: any) {
  const id = params.slug.split('-')[0];

  const product: I_Product | undefined = await getProductById(id);

  if (!product) {
    throw error(404, 'Not Found');
  }

  const productImagePublicUrls: string[] | undefined = await getProductImagePublicUrls(`${product.name} - ${product.color} - ${product.size} ${product.size_unit}`);

  if (!productImagePublicUrls) {
    throw error (404, 'Not Found');
  }
    
  return { product, productImagePublicUrls };
}