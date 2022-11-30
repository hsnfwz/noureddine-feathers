import { writable } from 'svelte/store';

// interfaces
import type I_CartItem from '$interfaces/I_CartItem';
import type I_ProductPriceTableRecord from '$interfaces/I_ProductPriceTableRecord';
import type I_ProductTableRecord from '$interfaces/I_ProductTableRecord';

function createCart() {
	const { subscribe, set, update } = writable<{ cartItems: I_CartItem[], cartTotalPrice: number, cartTotalItems: number }>({ cartItems: [], cartTotalPrice: 0, cartTotalItems: 0 });

  const calculateTotals = (cart: I_CartItem[]) => {
    let _cartTotalPrice: number = 0;
    let _cartTotalItems: number = 0;

    cart.forEach((cartProduct: I_CartItem) => {
      _cartTotalPrice = _cartTotalPrice + (cartProduct.price * cartProduct.cart_item_quantity);
      _cartTotalItems = _cartTotalItems + (cartProduct.cart_item_quantity);
    })

    return { cartTotalPrice: _cartTotalPrice, cartTotalItems: _cartTotalItems };
  }

  const getCartItems = () => {
    let _cart: I_CartItem[] = [];

    const cart: string | null = localStorage.getItem('cart');
    
    if (cart) {
      _cart = JSON.parse(cart);
    } else {
      localStorage.setItem('cart', JSON.stringify([]));
    }

    const { cartTotalPrice, cartTotalItems } = calculateTotals(_cart);

    set({ cartItems: _cart, cartTotalPrice, cartTotalItems });

    return _cart;
  }

  const addCartItem = (product: I_ProductTableRecord, productPrice: I_ProductPriceTableRecord, cartProductQuantity: number) => {
    const _cartProducts: I_CartItem[] = getCartItems();

    const _cartProductIndex: number = _cartProducts.findIndex((_cartProduct: I_CartItem) => _cartProduct.product_price_id === productPrice.id);

    if (_cartProductIndex !== -1) {
      let _cardProductQuantity = _cartProducts[_cartProductIndex].cart_item_quantity + cartProductQuantity;

      if (_cardProductQuantity > 100) _cardProductQuantity = 100;

      _cartProducts[_cartProductIndex].cart_item_quantity = _cardProductQuantity;
    } else {
      const _cartProduct = {
        product_id: product.id,
        product_price_id: productPrice.id,
        stripe_price_id: productPrice.stripe_price_id,
        thumbnail_url: product.thumbnail_url,
        name: product.name,
        color: product.color,
        category: product.category,
        size: product.size,
        price: productPrice.price,
        quantity: productPrice.quantity,
        cart_item_quantity: cartProductQuantity,
      };

      _cartProducts.push(_cartProduct);
    }

    localStorage.setItem('cart', JSON.stringify(_cartProducts));

		getCartItems();
  }

  const removeCartItem = (cartProductIndex: number) => {
    const _cartProducts = getCartItems();

    _cartProducts.splice(cartProductIndex, 1);

    localStorage.setItem('cart', JSON.stringify(_cartProducts));
		
		getCartItems();
  }

  const updateCartItem = (cartProductIndex: number, cartProductQuantity: number) => {
    const _cartProducts = getCartItems();

    _cartProducts[cartProductIndex].cart_item_quantity = cartProductQuantity;

    localStorage.setItem('cart', JSON.stringify(_cartProducts));

		getCartItems();
  }

  const clearCart = () => {
    localStorage.setItem('cart', JSON.stringify([]));

    set({ cartItems: [], cartTotalPrice: 0, cartTotalItems: 0 });
  }

	return {
		subscribe,
    getCartItems,
		addCartItem,
		removeCartItem,
		updateCartItem,
    clearCart,
	};
}

export const cart = createCart();