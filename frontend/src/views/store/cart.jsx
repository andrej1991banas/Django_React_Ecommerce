import React from 'react'
import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import apiInstance from '../../utils/axios';
import UserData from '../plugin/user_data';
import CartId from '../plugin/cart_id';
import GetCurrentAddress from '../plugin/user_country';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../plugin/context';



const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  // didOpen: (toast) => {
    // toast.addEventListener('mouseenter', Swal.stopTimer)
    // toast.addEventListener('mouseleave', Swal.resumeTimer)
  // }
})



function Cart() {
  // set variable and state for Cart instance 
  const [cart, setCart] = useState([])
  const [cartTotal, setCartTotal] = useState([])
  const [productQuantities, setProductQuantities] = useState('')
  const userData = UserData();
  const cart_id = CartId();
  const currentAddress = GetCurrentAddress()

  const [fullName, setFullName] = useState ("")
  const [email, setEmail] = useState ("")
  const [mobile, setMobile] = useState ("")

  const [address, setAddress] = useState ("")
  const [city, setCity] = useState ("")
  const [state, setState] = useState ("")
  const [country, setCountry] = useState ("")

  const navigate = useNavigate();


  const [cartCount, setCartCount] = useContext(CartContext);

  const fetchCartData = (cartId, userId) =>{
    const url = userId ? `cart-list/${cartId}/${userId}/` : `cart-list/${cartId}/`

    apiInstance.get(url).then((res) =>{
      console.log(res.data)
      setCart(res.data)
      setCartCount(res.data.length)
    })
  }

  const fetchCartTotalData = (cartId, userId) =>{
    const url = userId ? `cart-detail/${cartId}/${userId}/` : `cart-detail/${cartId}/`

    apiInstance.get(url).then((res) =>{
      console.log(res.data)
      setCartTotal(res.data)
    })
  }


    if (cart_id !== null || cart_id !== undefined) {
      if (userData !== undefined) {
        // send cart data with userid and cartId
        useEffect(()=> {
          fetchCartData(cart_id, userData?.user_id)
          fetchCartTotalData(cart_id, userData?.user_id)
        }, [])
      } else{
        // send cart data without userId
       useEffect(()=> {
          fetchCartData(cart_id, null)
          fetchCartTotalData(cart_id, null)
        }, [])
      }
    }

  useEffect(() => {
    const initialQuantities = {}
    cart.forEach((c) =>{
      initialQuantities [c.product?.id] = c.qty
    })
    setProductQuantities(initialQuantities)
  }, [cart])


  
  const handleQtyChange = (event, product_id) => {
    const quantity = event.target.value
  

    setProductQuantities ((prevQuantities) => ({
      ...prevQuantities,
      [product_id]: quantity
    }))
  }



  const updateCart = async (product_id, price,shipping_amount,color,size) =>{
    const qtyValue = productQuantities[product_id]
    const formData = new FormData()

    formData.append('user_id', userData?.user_id);
    formData.append('product_id', product_id);
    formData.append('cart_id', cart_id);
    formData.append('price', price);
    formData.append('shipping_amount', shipping_amount);
    formData.append('qty', qtyValue);
    formData.append('color', color);
    formData.append('size', size);
    formData.append('country', currentAddress.country);

    const response = await apiInstance.post('cart-view/', formData)

    fetchCartData(cart_id, userData?.user_id)
    fetchCartTotalData(cart_id, userData?.user_id)


    Swal.fire({
          icon: 'success',
          title: 'Cart Updated Successfully',
          timer: 1500,
          timerProgressBar: false,
          // didOpen: (toast) => {
          //   toast.addEventListener('mouseenter', Swal.stopTimer)
          //   toast.addEventListener('mouseleave', Swal.resumeTimer)
          // } 
        })
  }


  const handleDeleteCartItem = async(itemId) => {
    // define conditions for choosing what kind of url we can use, if we have user data or not 
    const url = userData?.user_id
      ? `cart-delete/${cart_id}/${itemId}/${userData.user_id}/`
      : `cart-delete/${cart_id}/${itemId}/`

    try {
       await apiInstance.delete(url)

      fetchCartData(cart_id, userData?.user_id)
      fetchCartTotalData(cart_id, userData?.user_id)


      Swal.fire({
            icon: 'success',
            title: 'Item Deleted From Cart Successfully',
            timer: 1500,
            timerProgressBar: false,
            // didOpen: (toast) => {
            //   toast.addEventListener('mouseenter', Swal.stopTimer)
            //   toast.addEventListener('mouseleave', Swal.resumeTimer)
            // } 
          })
    } catch (error) {
      console.log(error)
    }
  }


  const handleChange = (event) =>{
    const {name, value} =event.target
    
    switch (name) {
      case'fullName' :
        setFullName(value)
        break

      case'email' :
        setEmail(value)
        break

      case'mobile' :
        setMobile(value)
        break

      case'address' :
        setAddress(value)
        break

      case'city' :
        setCity(value)
        break

      case'state' :
        setState(value)
        break

      case'country' :
        setCountry(value)
        break

      default:
        break
    }
  }


  const createOrder = async() => {
    if(!fullName || !email || !mobile || !address || !city || !state || !country) {
      Swal.fire ({
        icon: 'warning',
        title: "Missing Fields",
        text: "All Fields Are Required Before Checkout"
      })
    } else{
        try{
          const formdata = new FormData()
          formdata.append("full_name", fullName)
          formdata.append("email", email)
          formdata.append("mobile", mobile)
          formdata.append("address", address)
          formdata.append("city", city)
          formdata.append("state", state)
          formdata.append("country", country)
          formdata.append("cart_id", cart_id)
          formdata.append("user_id", userData ? userData.user_id : 0)

          const response = await apiInstance.post('create-order/', formdata)

          navigate(`/checkout/${response.data.order_oid}/`);
          
        }catch (error) {
          console.log(error);
        }
      }

     
  }





  return (
    <div>
        <main className="mt-5">
          <div className="container">
            <main className="mb-6">
              <div className="container">
                <section className="">
                  <div className="row gx-lg-5 mb-5">
                    <div className="col-lg-8 mb-4 mb-md-0">
                      <section className="mb-5">
                        {cart?.map((c,index)=>(            
                        <div className="row border-bottom mb-4" key={index}>
                          <div className="col-md-2 mb-4 mb-md-0">
                            <div
                              className="bg-image ripple rounded-5 mb-4 overflow-hidden d-block"
                              data-ripple-color="light"
                            >
                              <Link to=''>
                                <img
                                  src={c.product?.image}
                                  className="w-100"
                                  alt=""
                                  style={{ height: "100px", objectFit: "cover", borderRadius: "10px" }}
                                />
                              </Link>
                              <a href="#!">
                                <div className="hover-overlay">
                                  <div
                                    className="mask"
                                    style={{
                                      backgroundColor: "hsla(0, 0%, 98.4%, 0.2)"
                                    }}
                                  />
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className="col-md-8 mb-4 mb-md-0">
                            <Link to={null} className="fw-bold text-dark mb-4">{c.product.title}</Link>
                            {c.size !== "No Size" &&
                            <p className="mb-0">
                              <span className="text-muted me-2">Size:</span>
                              <span>{c.size}</span>
                            </p>
                            }
                            {c.color !== "No Color" && 
                            <p className='mb-0'>
                              <span className="text-muted me-2">Color:</span>
                              <span>{c.color}</span>
                            </p>
                            }
                            <p className='mb-0'>
                              <span className="text-muted me-2">Price:</span>
                              <span>{c.price}</span>
                            </p>
                            {/* <p className='mb-0'>
                              <span className="text-muted me-2">Stock Qty:</span>
                              <span>{c.qty}</span>
                            </p> */}
                            {/* <p className='mb-0'>
                              <span className="text-muted me-2">Vendor:</span>
                              <span>{c.product.vendor}</span>
                            </p> */}
                            <p className="mt-3">
                              <button onClick = {() => handleDeleteCartItem (c.id)} className="btn btn-danger ">
                                <small><i className="fas fa-trash me-2" />Remove</small>
                              </button>
                            </p>
                            
                          </div>
                          <div className="col-md-2 mb-4 mb-md-0">
                            <div className="d-flex justify-content-center align-items-center">
                              <div className="form-outline">
                                <input
                                  type="number"
                                  className="form-control"
                                  value={productQuantities[c.product.id] || c.qty }
                                  min={1}
                                  onChange ={(e) => handleQtyChange(e, c.product.id)}
                                />
                              
                              </div>
                            
                              {/* <button  className='ms-2 btn btn-primary'><i className='fas fa-rotate-right'></i></button> */}
                            </div>
                            <button onClick={() => updateCart(c.product.id, c.product.price, c.product.shipping_amount,c.product.size, c.product.color)} className='ms-2 btn btn-primary'><i className='fas fa-rotate-right'></i></button>
                            {/* <h6 className="mb-2 mt-3 text-center"><span className="align-middle">Sub Total</span></h6>
                            <h5 className="mb-2 mt-3 text-center"><span className="align-middle">${c.sub_total}</span></h5> */}
                          </div>
                        </div>
                        ))}
                        <>
                          <h5>Your Cart Is Empty</h5>
                          <Link to='/'> <i className='fas fa-shopping-cart'></i> Continue Shopping</Link>
                        </>

                      </section>
                      <div>
                        <h5 className="mb-4 mt-4">Personal Information</h5>
                        {/* 2 column grid layout with text inputs for the first and last names */}
                        <div className="row mb-4">
                          <div className="col">
                            <div className="form-outline">
                              <label className="form-label" htmlFor="full_name"> <i className='fas fa-user'></i> Full Name</label>
                              <input
                                type="text"
                                id=""
                                name='fullName'
                                className="form-control"
                                value = {fullName}
                                onChange = {handleChange}
                              />
                            </div>
                          </div>

                        </div>

                        <div className="row mb-4">
                          <div className="col">
                            <div className="form-outline">
                              <label className="form-label" htmlFor="form6Example1"><i className='fas fa-envelope'></i> Email</label>
                              <input
                                type="text"
                                id="form6Example1"
                                className="form-control"
                                name='email'
                                value = {email}
                                onChange = {handleChange}

                              />
                            </div>
                          </div>
                          <div className="col">
                            <div className="form-outline">
                              <label className="form-label" htmlFor="form6Example1"><i className='fas fa-phone'></i> Mobile</label>
                              <input
                                type="text"
                                id="form6Example1"
                                className="form-control"
                                name='mobile'
                                value = {mobile}
                                onChange = {handleChange}
                              />
                            </div>
                          </div>
                        </div>

                        <h5 className="mb-1 mt-4">Shipping address</h5>

                        <div className="row mb-4">
                          <div className="col-lg-6 mt-3">
                            <div className="form-outline">
                              <label className="form-label" htmlFor="form6Example1"> Address</label>
                              <input
                                type="text"
                                id="form6Example1"
                                className="form-control"
                                name='address'
                                value ={address}
                                onChange={handleChange}

                              />
                            </div>
                          </div>
                          <div className="col-lg-6 mt-3">
                            <div className="form-outline">
                              <label className="form-label" htmlFor="form6Example1"> City</label>
                              <input
                                type="text"
                                id="form6Example1"
                                className="form-control"
                                name='city'
                                value = {city}
                                onChange={handleChange}
                              />
                            </div>
                          </div>

                          <div className="col-lg-6 mt-3">
                            <div className="form-outline">
                              <label className="form-label" htmlFor="form6Example1"> State</label>
                              <input
                                type="text"
                                id="form6Example1"
                                className="form-control"
                                name='state'
                                value = {state}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 mt-3">
                            <div className="form-outline">
                              <label className="form-label" htmlFor="form6Example1"> Country</label>
                              <input
                                type="text"
                                id="form6Example1"
                                className="form-control"
                                name='country'
                                value = {country}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 mb-4 mb-md-0">
                      {/* Section: Summary */}
                      <section className="shadow-4 p-4 rounded-5 mb-4">
                      <div className="d-flex align=items=centre">
                          <input 
                              type="text"
                              className="form-control rounded me/1"
                              placeholder="Promo Code"
                              />
                          <button 
                              type="button"
                              className="btn btn-outline-success btn-rounded overflow-visible"
                          > Apply</button>
                          
                      </div>
                                    <br/>
                        <h5 className="mb-3">Cart Summary</h5>
                        <div className="d-flex justify-content-between mb-3">
                          <span>Subtotal </span>
                          <span>${cartTotal.sub_total?.toFixed(2)}</span>
                        </div>
                        <div className="d-flex justify-content-between">
                          <span>Shipping </span>
                          <span>${cartTotal.shipping?.toFixed(2)}</span>
                        </div>
                        <div className="d-flex justify-content-between">
                          <span>Tax </span>
                          <span>${cartTotal.tax?.toFixed(2)}</span>
                        </div>
                        <div className="d-flex justify-content-between">
                          <span>Service Fee </span>
                          <span>${cartTotal.service_fee?.toFixed(2)}</span>
                        </div>
                        <hr className="my-4" />
                        <div className="d-flex justify-content-between fw-bold mb-5">
                          <span>Total </span>
                          <span>${cartTotal.total?.toFixed(2)}</span>
                        </div>
                        <button onClick = {createOrder} className="btn btn-primary btn-rounded w-100" >
                          Got to checkout
                        </button>
                      </section>
                    </div>
                  </div>
                </section>
              </div>
            </main>
          </div>
        </main>
    </div>
  )
}

export default Cart
