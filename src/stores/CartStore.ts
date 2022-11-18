import { writable } from 'svelte/store';

// types
import type CartProductType from 'types/CartProductType';
import type ProductPriceQuantityType from 'types/ProductPriceQuantityType';
import type ProductType from 'types/ProductType';

function createCart() {
	const { subscribe, set, update } = writable<{ cartItems: CartProductType[], cartTotalPrice: number, cartTotalItems: number }>({ cartItems: [], cartTotalPrice: 0, cartTotalItems: 0 });

  const calculateTotals = (cart: CartProductType[]) => {
    let _cartTotalPrice: number = 0;
    let _cartTotalItems: number = 0;

    cart.forEach((cartProduct: CartProductType) => {
      _cartTotalPrice = _cartTotalPrice + (cartProduct.price * cartProduct.cart_product_quantity);
      _cartTotalItems = _cartTotalItems + (cartProduct.cart_product_quantity);
    })

    return { cartTotalPrice: _cartTotalPrice, cartTotalItems: _cartTotalItems };
  }

  const getCartProducts = () => {
    let _cart: CartProductType[] = [];

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

  getCartProducts()

  const addCartProduct = (product: ProductType, productPriceQuantity: ProductPriceQuantityType, cartProductQuantity: number) => {
    const _cartProducts: CartProductType[] = getCartProducts();

    const _cartProductIndex: number = _cartProducts.findIndex((_cartProduct: CartProductType) => _cartProduct.product_price_quantity_id === productPriceQuantity.id);

    if (_cartProductIndex !== -1) {
      let _cardProductQuantity = _cartProducts[_cartProductIndex].cart_product_quantity + cartProductQuantity;

      if (_cardProductQuantity > 100) _cardProductQuantity = 100;

      _cartProducts[_cartProductIndex].cart_product_quantity = _cardProductQuantity;
    } else {
      const _cartProduct = {
        product_id: product.id,
        product_price_quantity_id: productPriceQuantity.id,
        stripe_price_id: productPriceQuantity.stripe_price_id,
        thumbnail: product.thumbnail,
        name: product.name,
        color: product.color,
        category: product.category,
        size: product.size,
        price: productPriceQuantity.price,
        quantity: productPriceQuantity.quantity,
        cart_product_quantity: cartProductQuantity,
      };

      _cartProducts.push(_cartProduct);
    }

    localStorage.setItem('cart', JSON.stringify(_cartProducts));

		getCartProducts();
  }

  const removeCartProduct = (cartProductIndex: number) => {
    const _cartProducts = getCartProducts();

    _cartProducts.splice(cartProductIndex, 1);

    localStorage.setItem('cart', JSON.stringify(_cartProducts));
		
		getCartProducts();
  }

  const updateCartProduct = (cartProductIndex: number, cartProductQuantity: number) => {
    const _cartProducts = getCartProducts();

    _cartProducts[cartProductIndex].cart_product_quantity = cartProductQuantity;

    localStorage.setItem('cart', JSON.stringify(_cartProducts));

		getCartProducts();
  }

	return {
		subscribe,
		addCartProduct,
		removeCartProduct,
		updateCartProduct,
	};
}

export const cart = createCart();