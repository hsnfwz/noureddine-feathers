import { error } from '@sveltejs/kit';

// api
import { getProducts } from '$api/product';

export async function load({ params }: any) {
  const products = await Promise.all([
    getProducts({ name: 'Premium Ostrich Feather Duster' }, undefined, 4),
    getProducts({ name: 'Premium Extendable Lambswool Duster' }, undefined, 4),
    getProducts({ name: 'Premium Lambswool Duster' }, undefined, 4),
    getProducts({ name: 'Ostrich Feather' }, undefined, 4),
    getProducts({ name: 'Ostrich Eggshell' }, undefined, 4),
  ]);

  if (!products) {
    throw error(404, 'Not Found');
  }

  return {
    premiumOstrichfeatherDusters: products[0] || [],
    premiumExtendableLambswoolDusters: products[1] || [],
    premiumLambswoolDusters: products[2] || [],
    ostrichFeathers: products[3] || [],
    ostrichEggshells: products[4] || [],
  };
}