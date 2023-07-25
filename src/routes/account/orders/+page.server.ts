/** @format */

import { getOrders } from '$api/order';

export const load = async ({ locals: { getSession } }) => {
  const session = await getSession();

  let orders: any = [];

  if (session) {
    orders = await getOrders({ user_profile_id: session.user.id });
  }

  return { orders };
};
