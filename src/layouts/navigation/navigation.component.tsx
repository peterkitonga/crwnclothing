import { Fragment, useContext } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

import './navigation.styles.scss';
import { signOutUser } from '@utils/firebase.utils';
import { UserContext } from '@contexts/user.context';
import { ReactComponent as CrwnLogo } from '@assets/images/crown.svg';

export default function Navigation() {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const onSignOut = async () => {
    await signOutUser();

    navigate('/auth');
  };

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
        </div>
      </nav>
      {/* Child component routes render here */}
      <Outlet />
    </Fragment>
  );
}
