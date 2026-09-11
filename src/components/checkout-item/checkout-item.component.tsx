import { useContext } from 'react';

import './checkout-item.styles.scss';
import { CartItemType } from '@models/interfaces';
import { CartContext } from '@contexts/cart.context';

interface CheckoutItemProps {
  cartItem: CartItemType;
}

export default function CheckoutItem(props: CheckoutItemProps) {
  const { cartItem } = props;
  const { addItemToCart, removeItemFromCart } = useContext(CartContext);

  const onIncrementItem = () => addItemToCart(cartItem);
  const onDecrementItem = () => removeItemFromCart(cartItem);
  const onRemoveItem = () => removeItemFromCart({ ...cartItem, quantity: 1 });

  return (
    <div className={'checkout-item-container'}>
      <div className={'image-container'}>
        <img src={cartItem.imageUrl} alt={`${cartItem.name} - ${cartItem.price} x ${cartItem.quantity}`} />
      </div>
      <span className={'name'}>{cartItem.name}</span>
      <span className={'quantity'}>
        <span className={'arrow'} onClick={onDecrementItem}>
          &#10094;
        </span>
        <span className={'value'}>{cartItem.quantity}</span>
        <span className={'arrow'} onClick={onIncrementItem}>
          &#10095;
        </span>
      </span>
      <span className={'price'}>${cartItem.price}</span>
      <span className={'remove-button'} onClick={onRemoveItem}>
        &#10005;
      </span>
    </div>
  );
}
