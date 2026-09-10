import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserContextProvider } from '@contexts/user.context';
import { CartContextProvider } from '@contexts/cart.context';
import { ProductsContextProvider } from '@contexts/products.context';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <ProductsContextProvider>
          <CartContextProvider>
            <App />
          </CartContextProvider>
        </ProductsContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
