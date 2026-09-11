import { Route, Routes } from 'react-router-dom';

import Navigation from '@layouts/navigation/navigation.component';
import Home from '@pages/home/home.component';
import Shop from '@pages/shop/shop.component';
import Auth from '@pages/auth/auth.component';
import Checkout from '@pages/checkout/checkout.component';

export default function App() {
  return (
    <Routes>
      <Route path={'/'} element={<Navigation />}>
        <Route index element={<Home />}></Route>
        <Route path={'shop'} element={<Shop />}></Route>
        <Route path={'auth'} element={<Auth />}></Route>
        <Route path={'checkout'} element={<Checkout />}></Route>
      </Route>
    </Routes>
  );
}
