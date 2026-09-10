import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

import { Product } from '@models/interfaces';

import PRODUCTS from '../data/shop-data.json';

interface ProductsContextType {
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
}

export const ProductsContext = createContext<ProductsContextType>({
  products: [],
  setProducts: () => [],
});

export const ProductsContextProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const value = { products, setProducts };

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
};
