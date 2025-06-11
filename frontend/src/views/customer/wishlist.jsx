import React from 'react';
import { useState, useEffect} from 'react';
import apiInstance from '../../utils/axios';
import UserData from '../plugin/user_data';
import { Link } from 'react-router-dom';
import Sidebar from './sidebar';
import Swal from 'sweetalert2';






function Wishlist() {
    const [wishlist, setWishlist] = useState ([])
    const userData = UserData()

    const fetchWIshlist = async () => {
        await apiInstance.get (`customer/wishlist/${userData?.user_id}/`).then((res) =>{
            setWishlist(res.data)
    })
}


    useEffect(() => {
        fetchWIshlist ()
    }, [])


    const addToWishlist =  async (productId, userId) => {
        try{ const formdata = new FormData ()
            formdata.append ("product_id", productId)
            formdata.append ("user_id", userId)

            const response = await apiInstance.post(`customer/wishlist/${userId}/`, formdata)
            console.log(response.data)
            fetchWIshlist ()

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
        <section className="">
            <div className="row">
                {/* Sidebar Here */}


                <div className="col-lg-9 mt-1">
                    <section className="">
                        <main className="mb-5" style={{}}>
                            <div className="container">
                                <section className="">
                                    <div className="row">
                                        <h3 className="mb-3">
                                            <i className="fas fa-heart text-danger" /> Wishlist
                                        </h3>
                   {wishlist?.map((p) => (
                    <div className="col-lg-4 col-md-12 mb-4" key={p.slug}> {/* Added key prop */}
                      <div className="card">
                        <div className="bg-image hover-zoom ripple" data-mdb-ripple-color="light">
                          <Link to={`/detail/${p.product.slug}/`}>
                            <img
                              src={p.product.image}
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
                          <Link to={`/detail/${p.product.slug}/`}>
                            <h5 className="card-title mb-3">{p.product.title}</h5>
                          </Link>
                          <a href="" className="text-reset">
                            <p>{p.product.category?.title}</p>
                          </a>
                          <h6 className="mb-3">${p.product.price}</h6>
                          <div className="btn-group">

                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuClickable">
                            </ul>
                            <button type="button" className="btn btn-danger px-3 me-1 ms-2" onClick={() => addToWishlist(p.product.id, userData?.user_id)}>
                              <i className="fas fa-heart" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    ))}

                                        {/* Show This if there are no item in wishlist */}
                                        <h6 className='container'>Your wishlist is Empty </h6>


                                    </div>
                                </section>
                            </div>
                        </main>
                    </section>
                </div>
            </div>
        </section>
    </div>
</main>
    </div>
  )
}

export default Wishlist
