import { useContext } from 'react';

import './product-card.styles.scss';
import Button from '@components/button/button.component';

import { CartContext } from '@contexts/cart.context';
import { Product } from '@models/interfaces';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard(props: ProductCardProps) {
  const { product } = props;
  const { addItemToCart } = useContext(CartContext);

  const onAddItemToCart = () => addItemToCart(product);

  return (
    <div className={'product-card-container'}>
      <img src={product.imageUrl} alt={`${product.name} - ${product.price}`} />
      <div className={'footer'}>
        <span className={'name'}>{product.name}</span>
        <span className={'price'}>${product.price}</span>
      </div>
      <Button buttonType={'inverted'} onClick={onAddItemToCart}>
        Add to Card
      </Button>
    </div>
  );
}
