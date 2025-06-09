import { useState } from 'react';
import Login from './views/auth/login';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Register from './views/auth/register';
import Dashboard from './views/auth/dashboard';
import Logout from './views/auth/logout';
import ForgotPassword from './views/auth/forgot_password';
import CreatePassword from './views/auth/create_password';
import Store_footer from './views/base/store_footer';  
import Store_header from './views/base/store_header';
import MainWrapper from './layout/MainWrapper'
import Products from './views/store/products';
import ProductDetail from './views/store/product_details';
import Cart from './views/store/cart';
import Checkout from './views/store/checkout';

function App() {
  

  return (
  <BrowserRouter>
  <Store_header />
  
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/create-new-password" element={<CreatePassword />} />

      {/* Store components     */}
      <Route path="/" element={<Products />} />
      <Route path="/detail/:slug/" element={<ProductDetail />} />
      <Route path="/cart/" element={<Cart />} />
      <Route path="/checkout/:order_oid/" element={<Checkout />} />
      

    </Routes>
    <Store_footer />
  </BrowserRouter>
  )
}

export default App
