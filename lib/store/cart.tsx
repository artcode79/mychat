import { useContext, createContext, useState } from "react";

export const CartContext = createContext<any>({
  cart: [],
  setCart: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  getCartCount: 0,
  getCartTotal: 0,
  checkout: () => {},
  clearCart: () => {},
  setCartCount: () => {},
  setCartTotal: () => {},
  cartItems: [],
  setCartItems: () => {},
  cartTotal: 0,
  cartCount: 0,
});

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }: any) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product: any) => {
    const existingCartItemIndex = cartItems.findIndex(
      (item: any) => item.product.id === product.id
    );
    if (existingCartItemIndex !== -1) {
      const existingCartItem: any = cartItems[existingCartItemIndex];
      const updatedCartItem: any = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      const updatedCartItems: any = [...cartItems];
      updatedCartItems[existingCartItemIndex] = updatedCartItem;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { product, quantity: 1 }] as any);
    }
  };

  const removeFromCart = (productId: number) => {
    const updatedCartItems = cartItems.filter(
      (item: any) => item.product.id !== productId
    );
    setCartItems(updatedCartItems);
  };

  const updateCartItemQuantity = (productId: number, quantity: number) => {
    const existingCartItemIndex = cartItems.findIndex(
      (item: any) => item.product.id === productId
    );
    if (existingCartItemIndex !== -1) {
      const existingCartItem: any = cartItems[existingCartItemIndex];
      const updatedCartItem = {
        ...existingCartItem,
        quantity,
      };
      const updatedCartItems: any = [...cartItems];
      updatedCartItems[existingCartItemIndex] = updatedCartItem;
      setCartItems(updatedCartItems);
    }
  };

  const cartTotal = cartItems.reduce(
    (total: number, item: any) => total + item.product.price * item.quantity,
    0
  );

  const cartCount = cartItems.reduce(
    (count: number, item: any) => count + item.quantity,
    0
  );

  const checkout = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart: cartItems,
        setCart: setCartItems,
        updateCartItemQuantity,
        addToCart,
        removeFromCart,
        getCartCount: cartCount,
        getCartTotal: cartTotal,
        checkout,
        clearCart: checkout,
        setCartCount: setCartItems,
        setCartTotal: setCartItems,
        cartItems,
        setCartItems,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
