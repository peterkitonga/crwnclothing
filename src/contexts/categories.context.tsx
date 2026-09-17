import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

import { Product } from '@models/interfaces';

import PRODUCTS from '../data/shop-data.json';

interface CategoriesContextType {
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
}

export const CategoriesContext = createContext<CategoriesContextType>({
  products: [],
  setProducts: () => [],
});

export const CategoriesContextProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const value = { products, setProducts };

  return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>;
};
