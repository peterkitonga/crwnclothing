import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';

import { CartItemType, Product } from '@models/interfaces';

interface CartContextType {
  isCartOpen: boolean;
  cartItems: CartItemType[];
  cartItemCount: number;
  cartItemTotal: number;
  setIsCartOpen: Dispatch<SetStateAction<boolean>>;
  addItemToCart: (item: Product) => void;
  removeItemFromCart: (item: CartItemType) => void;
}

const addCartItem = (cartItems: CartItemType[], productToAdd: Product): CartItemType[] => {
  const existingItem = cartItems.find((item) => item.id === productToAdd.id);

  if (existingItem) {
    return cartItems.map((item) => {
      if (item.id === productToAdd.id) {
        return { ...item, quantity: item.quantity + 1 };
      }

      return item;
    });
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems: CartItemType[], itemToRemove: CartItemType) => {
  if (itemToRemove.quantity <= 1) {
    return cartItems.filter((item) => item.id !== itemToRemove.id);
  }

  return cartItems.map((item) => {
    if (item.id === itemToRemove.id) {
      return { ...item, quantity: item.quantity - 1 };
    }

    return item;
  });
};

export const CartContext = createContext<CartContextType>({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  cartItemCount: 0,
  cartItemTotal: 0,
});

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [cartItemCount, setCartItemCount] = useState<number>(0);
  const [cartItemTotal, setCartItemTotal] = useState(0);
  const addItemToCart = (productToAdd: Product) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };
  const removeItemFromCart = (itemToRemove: CartItemType) => {
    setCartItems(removeCartItem(cartItems, itemToRemove));
  };
  const value = {
    isCartOpen,
    cartItems,
    cartItemCount,
    cartItemTotal,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
  };

  useEffect(() => {
    const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    setCartItemCount(itemCount);

    return () => {};
  }, [cartItems]);

  useEffect(() => {
    const cartTotal = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);

    setCartItemTotal(cartTotal);

    return () => {};
  }, [cartItems]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
