import { getOrderProducts } from "$api/order-product.js";

export const load = async ({ locals: { getSession }, params }) => {
  const session = await getSession();

  let orderProducts: any = [];

  if (session) {
    orderProducts = await getOrderProducts({
      order_id: params.id,
      user_profile_id: session.user.id,
    });
  }

  return { orderProducts };
};
