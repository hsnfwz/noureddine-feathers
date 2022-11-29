interface I_ProductPriceQuantityTableRecord {
  id: number,
  created_at: string,
  product_id: number,
  price: number,
  quantity: number,
  stripe_price_id: string,
}

export default I_ProductPriceQuantityTableRecord;