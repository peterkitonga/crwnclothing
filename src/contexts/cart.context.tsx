import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';

import { CartItemType, Product } from '@models/interfaces';

interface CartContextType {
  isCartOpen: boolean;
  cartItems: CartItemType[];
  cartItemCount: number;
  setIsCartOpen: Dispatch<SetStateAction<boolean>>;
  addItemToCart: (item: Product) => void;
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

export const CartContext = createContext<CartContextType>({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartItemCount: 0,
});

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [cartItemCount, setCartItemCount] = useState<number>(0);
  const addItemToCart = (productToAdd: Product) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };
  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartItemCount };

  useEffect(() => {
    const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    setCartItemCount(itemCount);

    return () => {};
  }, [cartItems]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
