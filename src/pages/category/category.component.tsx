import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './category.styles.scss';
import ProductCard from '@components/product-card/product-card.component';

import { CategoriesContext } from '@contexts/categories.context';

export default function Category() {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState(categoriesMap[category!]);

  useEffect(() => {
    setProducts(categoriesMap[category!]);
  }, [category, categoriesMap]);

  return (
    <main className={'category-map-container'}>
      {products && products.map((product) => <ProductCard key={product.id} product={product} />)}
      <div></div>
    </main>
  );
}
