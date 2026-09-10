import { useContext } from 'react';

import './shop.styles.scss';
import ProductCard from '@components/product-card/product-card.component';

import { ProductsContext } from '@contexts/products.context';

export default function Shop() {
  const { products } = useContext(ProductsContext);

  return (
    <main className={'products-container'}>
      {products.map((item) => (
        <ProductCard key={item.id} product={item}></ProductCard>
      ))}
    </main>
  );
}
