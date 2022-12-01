interface I_CartItem {
  product_id: number,
  product_price_id: number,
  stripe_price_id: string,
  thumbnail_url: string,
  name: string,
  color: string,
  size: number,
  size_unit: string,
  price: number,
  quantity: number,
  cart_item_quantity: number,
}

export default I_CartItem;