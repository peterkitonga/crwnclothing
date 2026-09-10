import './cart-item.styles.scss';

import { CartItemType } from '@models/interfaces';

interface CartItemProps {
  cartItem: CartItemType;
}

export default function CartItem(props: CartItemProps) {
  const { cartItem } = props;

  return (
    <div className={'cart-item-container'}>
      <img src={cartItem.imageUrl} alt={`${cartItem.name} - ${cartItem.price * cartItem.quantity}`} />
      <div className={'item-details'}>
        <span className={'name'}>{cartItem.name}</span>
        <span className={'price'}>
          {cartItem.quantity} x ${cartItem.price}
        </span>
      </div>
    </div>
  );
}
