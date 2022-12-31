import { error } from '@sveltejs/kit';
 
// api
import { getOrders } from '$api/order';
import { getOrderProducts } from '$api/order-product';

export async function load({ params }: any) {
  const { id } = params;

  const orders: any = await getOrders({ id });
  const orderProducts: any = await getOrderProducts({ order_id: id });

 
  if (orders && orderProducts) {
    return { order: orders[0], orderProducts };
  }
 
  throw error(404, 'Not found');
}