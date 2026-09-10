import { useContext } from 'react';

import './cart-icon.styles.scss';
import { ReactComponent as ShoppingBagIcon } from '@assets/images/shopping-bag.svg';
import { CartContext } from '@contexts/cart.context';

export default function CartIcon() {
  const { isCartOpen, setIsCartOpen, cartItemCount } = useContext(CartContext);

  const onToggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <div className={'cart-icon-container'} onClick={onToggleCart}>
      <ShoppingBagIcon className={'shopping-icon'} />
      <span className={'item-count'}>{cartItemCount}</span>
    </div>
  );
}
