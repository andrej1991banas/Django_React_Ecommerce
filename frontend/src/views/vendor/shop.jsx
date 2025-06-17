import UserData from '../plugin/user_data'
import { useState, useEffect, useContext} from 'react';
import apiInstance from '../../utils/axios';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import { CartContext } from '../plugin/context';
import CartId from '../plugin/cart_id';
import GetCurrentAddress from '../plugin/user_country';





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



function Shop() {
    const [vendor, setVendor] = useState([])
    const [product, setproduct] = useState([])
      const [products, setProducts] = useState([]) ;
    const [categories, setCategories] = useState([]);
    // epecting data in array coming from backend


    const[colorValue, setColorValue] = useState("No Color");
    const [sizeValue, setSizeValue ] = useState("No Size");
    const [qtyValue, setQtyValue] = useState(1)
    // set default for color and size before user choose some

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedColors, setSelectedColors] = useState({});
    const [selectedSizes, setSelectedSizes] = useState({});

    const currentAddress = GetCurrentAddress();
    const userData = UserData();
    const cartId = CartId();


    const param = useParams()


    useEffect (() => {
        apiInstance.get(`vendor/shop-view/${param.slug}/`).then((res) =>{
            setVendor(res.data)
        })
    },[])


useEffect (() => {
        apiInstance.get(`vendor/products-view/${param.slug}/`).then((res) =>{
            setproduct(res.data)
        })
    },[])


  // catching productId and color of the product after choosing color in the variation menu
  const handleColorButtonClick = (event, productId, colorName) => {
    setColorValue(colorName);
    setSelectedProduct(productId);

    setSelectedColors((prevSelectedColors) =>({
      ...prevSelectedColors,
      [productId]: colorName,
    }))
  }

  // catching productId and size of the product after choosing size in the variation menu
  const handleSizeButtonClick = (event, productId, sizeName) => {
    setSizeValue(sizeName);
    setSelectedProduct(productId);
   
    setSelectedSizes((prevSelectedSizes) =>({
      ...prevSelectedSizes,
      [productId]: sizeName,
    }))
  }


  const handleQtyChange = (event, productId) => {
    setQtyValue(event.target.value)
    setSelectedProduct(productId)
  }

  const handleAddToCart = async (product_id, price, shipping_amount) => {
    // creating new object which will fetch all dat for API POST rewuest from our React Frontend
    const formData = new FormData()
    formData.append('user_id', userData?.user_id);
    formData.append('product_id', product_id);
    formData.append('cart_id', cartId);
    formData.append('price', price);
    formData.append('shipping_amount', shipping_amount);
    formData.append('qty', qtyValue);
    formData.append('color', colorValue);
    formData.append('size', sizeValue);
    formData.append('country', currentAddress.country);

    // as we have to wait for data to be posted to the page we need to go async/await method
    // grabbing the data and posting them to the url in post method
    const response = await apiInstance.post(`cart-view/`, formData)
    console.log(response.data);

    Swal.fire({
      icon: 'success',
      title: 'Product added to cart',
      timer: 1500,
      timerProgressBar: false,
      // didOpen: (toast) => {
      //   toast.addEventListener('mouseenter', Swal.stopTimer)
      //   toast.addEventListener('mouseleave', Swal.resumeTimer)
      // } 
    })

    const url = userData ? `cart-list/${cartId}/${ userData.user_id}/` : `cart-list/${cartId}/`
    apiInstance.get(url).then((res) => {
      setCartCount(res.data.length)
    }) 
  }


  const addToWishlist =  async (productId, userId) => {
   try{ const formdata = new FormData ()
    formdata.append ("product_id", productId)
    formdata.append ("user_id", userId)

    const response = await apiInstance.post(`customer/wishlist/${userId}/`, formdata)
    console.log(response.data)

    Swal.fire({
      icon: "success",
      title:response.data.message,
    })

   } catch(error) {
    console.log(error)
   }
  }


  return (
    <div>
        <main className="mt-5">
            <div className="container">
                <section className="text-center container">
                    <div className="row py-lg-5">
                        <div className="col-lg-6 col-md-8 mx-auto  align-items-center justify-content-center flex-column">
                            <img src={vendor.image} style={{ width: 200, height: 200, objectFit: "cover", borderRadius: "50%" }} alt="" />
                            <h1 className="fw-light">{vendor.name}</h1>
                            <p className="lead text-muted">{vendor.description}</p>
                        </div>
                    </div>
                </section>
                <section className="text-center">
                    <h4 className="mb-4">{product.length} Product(s) </h4>
                    <div className="row">
                   {product?.map((p) => (
                    <div className="col-lg-4 col-md-12 mb-4" key={p.slug}> {/* Added key prop */}
                      <div className="card">
                        <div className="bg-image hover-zoom ripple" data-mdb-ripple-color="light">
                          <Link to={`/detail/${p.slug}/`}>
                            <img
                              src={p.image}
                              className="w-100"
                              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                            />
                          </Link>
                          <a href="#!">
                            <div className="mask">
                              <div className="d-flex justify-content-start align-items-end h-100">
                                <h5>
                                  <span className="badge badge-primary ms-2">New</span>
                                </h5>
                              </div>
                            </div>
                            <div className="hover-overlay">
                              <div
                                className="mask"
                                style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}
                              />
                            </div>
                          </a>
                        </div>
                        <div className="card-body">
                          <Link to={`/detail/${p.slug}/`}>
                            <h5 className="card-title mb-3">{p.title}</h5>
                          </Link>
                          <a href="" className="text-reset">
                            <p>{p.category?.title}</p>
                          </a>
                          <h6 className="mb-3">${p.price}</h6>
                          <div className="btn-group">
                            <button
                              className="btn btn-primary dropdown-toggle"
                              type="button"
                              id="dropdownMenuClickable"
                              data-bs-toggle="dropdown"
                              data-bs-auto-close="false"
                              aria-expanded="false"
                            >
                              Variation
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuClickable">
                              {p.size?.length > 0 && (
                                <div className="d-flex flex-column">
                                  {/* Size Label */}
                                  <li className="p-1">
                                    <b>Size</b>: {selectedSizes[p.id] || "No Size" }
                                  </li>

                                  {/* Size Choices */}
                                  <div className="p-1 mt-1 d-flex flex-wrap">
                                    {p.size?.map((size) => (
                                      <button
                                        key={size.name} // Add a unique key
                                        onClick={(e) => handleSizeButtonClick(e, p.id, size.name)}
                                        className="btn btn-secondary btn-sm me-1 mb-1"
                                      >
                                        {size.name}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}
                              {/* COlor section */}
                                {p.color?.length > 0 && (
                                  <div className="d-flex flex-column">
                                    {/* Color Label */}
                                    <li className="p-1">
                                      <b>Color</b>: {selectedColors[p.id] || "No Color" }
                                    </li>

                                    {/* Color Choices */}
                                    <div className="p-1 mt-1 d-flex flex-wrap">
                                      {p.color?.map((color, index) => (
                                        <button
                                          key={index}
                                          className="btn btn-sm me-1 mb-1 p-2"
                                          style={{ backgroundColor: `${color.color_code}` }}
                                          onClick={(e) => handleColorButtonClick(e, p.id, color.name)}
                                        />
                                      ))}
                                    </div>
                                  </div>
                                )}


                                  {/* Quantity section */}
                                <div className="d-flex ">
                                  <li className="p-1">
                                    <b>Quantity</b>: 
                                  </li>
                                  
                                  <div className="p-1 mt-0 pt-0 d-flex flex-wrap">
                                    <li>
                                      <input
                                        className="form-control" onChange ={(e) => handleQtyChange(e, p.id)} type="number" min="1"  value={qtyValue}
                                      />
                                    </li>
                                  </div>
                                
                                </div>


                                {/* Add to cart and like it section */}
                              <div className="d-flex mt-3 p-1">
                                <button 
                                type="button" 
                                className="btn btn-primary me-1 mb-1"
                                onClick = {() => handleAddToCart(p.id, p.price, p.shipping_amount)}>
                                  <i className="fas fa-shopping-cart" />
                                </button>
                                <button type="button" className="btn btn-danger px-3 me-1 mb-1 ms-2">
                                  <i className="fas fa-heart" />
                                </button>
                              </div>
                            </ul>
                            <button type="button" className="btn btn-danger px-3 me-1 ms-2" onClick ={() => addToWishlist(p.id, userData?.user_id)} >
                              <i className="fas fa-heart" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    ))}
                    </div>
                </section>
            </div>
        </main>
    </div>
  )
}

export default Shop
