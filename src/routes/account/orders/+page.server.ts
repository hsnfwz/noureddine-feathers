import { getOrders } from "$api/order";

export const load = async ({ locals: { getSession } }) => {
  const session = await getSession();

  let fulfilledOrders: any = [];
  let unfulfilledOrders: any = [];

  if (session) {
    const orders = await getOrders({ user_profile_id: session.user.id });

    if (orders) {
      orders.forEach((order) => {
        if (order.is_fulfilled) {
          fulfilledOrders.push(order);
        } else {
          unfulfilledOrders.push(order);
        }
      });

      fulfilledOrders.sort((a: any, b: any) => a.created_at < b.created_at);
      unfulfilledOrders.sort((a: any, b: any) => a.created_at < b.created_at);
    }
  }

  return { fulfilledOrders, unfulfilledOrders };
};
