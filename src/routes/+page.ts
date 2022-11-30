// api
import { getProducts } from '$api/product';

// interfaces
import type I_Product from '$interfaces/I_Product';

export async function load({ params }: any) {
  const products = await Promise.all([
    getProducts({ category: 'Ostrich Feather Dusters' }, undefined, 4),
    getProducts({ category: 'Extendable Lambswool Dusters' }, undefined, 4),
    getProducts({ category: 'Lambswool Dusters' }, undefined, 4),
    getProducts({ category: 'Ostrich Feathers' }, undefined, 4),
    getProducts({ category: 'Ostrich Eggshells' }, undefined, 4),
  ]);

  return {
    featherDusters: products[0] || [],
    extendableLambswoolDusters: products[1] || [],
    lambswoolDusters: products[2] || [],
    ostrichFeathers: products[3] || [],
    eggshells: products[4] || [],
  };
}