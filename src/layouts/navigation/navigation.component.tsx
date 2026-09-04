import { Fragment } from 'react';
import { Link, Outlet } from 'react-router-dom';

import './navigation.styles.scss';
import { ReactComponent as CrwnLogo } from '@assets/images/crown.svg';

export default function Navigation() {
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
          <Link to={'/auth'} className={'nav-link'}>
            Sign In
          </Link>
        </div>
      </nav>
      <Outlet />
    </Fragment>
  );
}
