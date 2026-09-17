import { useContext } from 'react';

import './shop.styles.scss';
import ProductCard from '@components/product-card/product-card.component';

import { CategoriesContext } from '@contexts/categories.context';

export default function Shop() {
  const { products } = useContext(CategoriesContext);

  return (
    <main className={'products-container'}>
      {products.map((item) => (
        <ProductCard key={item.id} product={item}></ProductCard>
      ))}
    </main>
  );
}
