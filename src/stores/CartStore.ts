import { writable } from 'svelte/store';

// interfaces
import type I_CartItem from '$interfaces/I_CartItem';
import type I_ProductPriceTableRecord from '$interfaces/I_ProductPriceTableRecord';
import type I_ProductTableRecord from '$interfaces/I_ProductTableRecord';

function createCart() {
	const { subscribe, set, update } = writable<{ cartItems: I_CartItem[], cartTotalPrice: number, cartTotalItems: number, isLoadingCartItems: boolean }>({ cartItems: [], cartTotalPrice: 0, cartTotalItems: 0, isLoadingCartItems: true });

  const calculateTotals = (cart: I_CartItem[]) => {
    let _cartTotalPrice: number = 0;
    let _cartTotalItems: number = 0;

    cart.forEach((cartItem: I_CartItem) => {
      _cartTotalPrice = _cartTotalPrice + (cartItem.price * cartItem.cart_item_quantity);
      _cartTotalItems = _cartTotalItems + (cartItem.cart_item_quantity);
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

    set({ cartItems: _cart, cartTotalPrice, cartTotalItems, isLoadingCartItems: false });

    return _cart;
  }

  const addCartItem = (product: I_ProductTableRecord, productPrice: I_ProductPriceTableRecord, cartItemQuantity: number) => {
    const _cartItems: I_CartItem[] = getCartItems();

    const _cartItemIndex: number = _cartItems.findIndex((_cartItem: I_CartItem) => _cartItem.product_price_id === productPrice.id);

    if (_cartItemIndex !== -1) {
      let _cardItemQuantity = _cartItems[_cartItemIndex].cart_item_quantity + cartItemQuantity;

      if (_cardItemQuantity > 100) _cardItemQuantity = 100;

      _cartItems[_cartItemIndex].cart_item_quantity = _cardItemQuantity;
    } else {
      const _cartItem = {
        product_id: product.id,
        product_price_id: productPrice.id,
        stripe_price_id: productPrice.stripe_price_id,
        thumbnail_url: product.thumbnail_url,
        name: product.name,
        color: product.color,
        size: product.size,
        size_unit: product.size_unit,
        price: productPrice.price,
        quantity: productPrice.quantity,
        cart_item_quantity: cartItemQuantity,
      };

      _cartItems.push(_cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(_cartItems));

		getCartItems();
  }

  const removeCartItem = (cartItemIndex: number) => {
    const _cartItems = getCartItems();

    _cartItems.splice(cartItemIndex, 1);

    localStorage.setItem('cart', JSON.stringify(_cartItems));
		
		getCartItems();
  }

  const updateCartItem = (cartItemIndex: number, cartItemQuantity: number) => {
    const _cartItems = getCartItems();

    _cartItems[cartItemIndex].cart_item_quantity = cartItemQuantity;

    localStorage.setItem('cart', JSON.stringify(_cartItems));

		getCartItems();
  }

  const clearCart = () => {
    localStorage.setItem('cart', JSON.stringify([]));

    set({ cartItems: [], cartTotalPrice: 0, cartTotalItems: 0, isLoadingCartItems: false });
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