import { useNavigate } from 'react-router-dom';

import './category-preview.styles.scss';
import ProductCard from '@components/product-card/product-card.component';

import { Product } from '@models/interfaces';

interface CategoryPreviewProps {
  title: string;
  products: Product[];
}

export default function CategoryPreview(props: CategoryPreviewProps) {
  const navigate = useNavigate();
  const { title, products } = props;

  const onNavigateToCategory = () => {
    navigate(`/shop/${title}`);
  };

  return (
    <main className={'category-preview-container'}>
      <h2>
        <span className={'title'} onClick={onNavigateToCategory}>
          {title.toUpperCase()}
        </span>
      </h2>
      <div className={'preview'}>
        {products
          .filter((_, index) => index < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </main>
  );
}
