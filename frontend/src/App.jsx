import { useState, useEffect } from 'react';
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
import Payment_success from './views/store/payment_success';
import Search from './views/store/search';
import { CartContext } from './views/plugin/context';  
import CartId from './views/plugin/cart_id';
import UserData from './views/plugin/user_data';
import apiInstance from './utils/axios';
import Account from './views/customer/account';
import PrivateRoute from './layout/PrivateRoute';
import Orders from './views/customer/orders';
import Order_detail from './views/customer/order_detail';
import Wishlist from './views/customer/wishlist';
import Customer_notification from './views/customer/customer_notification';
import  CustomerSettings from './views/customer/settings';
import Invoice  from './views/customer/invoice';
import DashboardVendor from './views/vendor/dashboard';
import ProductsVendor from './views/vendor/products';
import OrdersVendor from './views/vendor/orders';
import OrderDetailVendor from './views/vendor/order_detail';






function App() {
  const [count, setCount] = useState(0);
  const [cartCount, setCartCount] = useState();

  const cart_id=CartId()
  const userData=UserData()


  useEffect (() => {
    // if statment if user exists grab user data and use them in url or else not use None user data
    const url = userData ? `cart-list/${cart_id}/${ userData.user_id}/` : `cart-list/${cart_id}/`
    apiInstance.get(url).then((res) => {
      setCartCount(res.data.length)
    }) 
  })

  


  return (
    <CartContext.Provider value={[cartCount, setCartCount]}> 
      <BrowserRouter>
        <Store_header />
          <MainWrapper>
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
              <Route path="/payment-success/:order_oid/" element={<Payment_success />} />
              <Route path="/search/" element={<Search />} />

              {/* Customer components */}
              {/* private route will close pages from not logged in users */}
              <Route path="/customer/account/" element={<PrivateRoute> <Account /> </PrivateRoute>} />
              <Route path="/customer/orders/" element={<PrivateRoute> <Orders /> </PrivateRoute>} />
              <Route path="/customer/orders/:order_oid/" element={<PrivateRoute> <Order_detail /> </PrivateRoute>} />
              <Route path="/customer/wishlist/" element={<PrivateRoute> <Wishlist /> </PrivateRoute>} />
              <Route path="/customer/notifications/" element={<PrivateRoute> <Customer_notification /> </PrivateRoute>} />
              <Route path="/customer/settings/" element={<PrivateRoute> <CustomerSettings /> </PrivateRoute>} />
              <Route path="/customer/invoice/:order_oid/" element={<PrivateRoute> <Invoice /> </PrivateRoute>} />
              
              {/* Vendor components */}
              <Route path="/vendor/dashboard/" element={<PrivateRoute> <DashboardVendor /> </PrivateRoute>} />   
              <Route path="/vendor/products/" element={<PrivateRoute> <ProductsVendor /> </PrivateRoute>} /> 
              <Route path="/vendor/orders/" element={<PrivateRoute> <OrdersVendor /> </PrivateRoute>} /> 
              <Route path="/vendor/order/:order_oid/" element={<PrivateRoute> <OrderDetailVendor /> </PrivateRoute>} /> 


            </Routes>
          </MainWrapper>
        <Store_footer />
      </BrowserRouter>
    </CartContext.Provider>

  )
}

export default App
