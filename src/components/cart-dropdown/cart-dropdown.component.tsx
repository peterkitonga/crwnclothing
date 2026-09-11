import { RefObject, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import './cart-dropdown.styles.scss';
import Button from '@components/button/button.component';
import CartItem from '@components/cart-item/cart-item.component';

import { CartContext } from '@contexts/cart.context';

interface CartDropdownType {
  ref: RefObject<HTMLDivElement | null>;
}

export default function CartDropdown(props: CartDropdownType) {
  const { ref } = props;
  const navigate = useNavigate();
  const { cartItems, setIsCartOpen } = useContext(CartContext);

  const onCheckout = () => {
    navigate('/checkout');

    setIsCartOpen(false);
  };

  return (
    <div ref={ref} className={'cart-dropdown-container'}>
      <div className={'cart-items'}>
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Button onClick={onCheckout}>Go To Checkout</Button>
    </div>
  );
}
