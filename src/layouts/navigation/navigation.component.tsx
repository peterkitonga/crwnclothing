import { Fragment, useContext } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

import './navigation.styles.scss';
import CartIcon from '@components/cart-icon/cart-icon.component';
import CartDropdown from '@components/cart-dropdown/cart-dropdown.component';
import { ReactComponent as CrwnLogo } from '@assets/images/crown.svg';

import { signOutUser } from '@utils/firebase.utils';
import { UserContext } from '@contexts/user.context';
import { CartContext } from '@contexts/cart.context';
import { useClickOutside } from '@hooks/click-outside.hook';

export default function Navigation() {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const { isCartOpen, setIsCartOpen } = useContext(CartContext);

  const onSignOut = async () => {
    await signOutUser();

    navigate('/auth');
  };

  const dropdownRef = useClickOutside(() => {
    setIsCartOpen(false);
  });

  return (
    <Fragment>
      <nav className={'navigation'}>
        <Link to={'/'} className={'logo-container'}>
          <CrwnLogo className={'logo'} />
        </Link>
        <div className={'nav-links-container'}>
          <Link to={'/shop'} className={'nav-link'}>
            Shop
          </Link>
          {currentUser ? (
            <span className={'nav-link'} onClick={onSignOut}>
              Sign Out
            </span>
          ) : (
            <Link to={'/auth'} className={'nav-link'}>
              Sign In
            </Link>
          )}
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown ref={dropdownRef} />}
      </nav>
      {/* Child component routes render here */}
      <Outlet />
    </Fragment>
  );
}
