import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';

import { Product } from '@models/interfaces';
import { getCategoriesAndDocuments } from '@utils/firebase.utils';

interface CategoriesContextType {
  categoriesMap: { [key: string]: Product[] };
  setCategoriesMap: Dispatch<SetStateAction<{ [key: string]: Product[] }>>;
}

export const CategoriesContext = createContext<CategoriesContextType>({
  categoriesMap: {},
  setCategoriesMap: () => {},
});

export const CategoriesContextProvider = ({ children }: { children: ReactNode }) => {
  const [categoriesMap, setCategoriesMap] = useState<{ [key: string]: Product[] }>({});
  const value = { categoriesMap, setCategoriesMap };

  useEffect(() => {
    (async () => {
      const categoriesMap = await getCategoriesAndDocuments();

      setCategoriesMap(categoriesMap);
    })();

    return () => {};
  }, []);

  return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>;
};
