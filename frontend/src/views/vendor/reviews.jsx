import React from 'react'
import SidebarVendor from './sidebar'
import UserData from '../plugin/user_data'
import { useState, useEffect} from 'react';
import apiInstance from '../../utils/axios';
import { Line, Bar } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';
import { Link } from 'react-router-dom';
import moment from 'moment';



function Reviews() {
  const [reviews, setReviews] = useState([])
  const [updateReviews, setUpdateReviews] = useState({ reply: "" })

  const axios = apiInstance
  const userData = UserData()

  if (UserData()?.vendor_id === 0) {
    window.location.href = '/vendor/register/'
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(`vendor/reviews/${userData?.vendor_id}/`)
      setReviews(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

console.log(reviews)



  return (
    <div>
        <div className="container-fluid" id="main">
        <div className="row row-offcanvas row-offcanvas-left h-100">

            {/*/col*/}
            <div className="col-md-9 col-lg-10 main mt-4">
            <h4>
                <i className="fas fa-star" /> Reviews and Rating
            </h4>

            <section
                className="p-4 p-md-5 text-center text-lg-start shadow-1-strong rounded"
                style={{
                backgroundImage:
                    "url(https://mdbcdn.b-cdn.net/img/Photos/Others/background2.webp)"
                }}
            >
                <div className="row d-flex justify-content-center align-items-center">
                <div className="col-md-10">
                    {reviews.map((r, index) => (
                    <div className="card mt-3 mb-3">
                    <div className="card-body m-3">
                        

                        
                        <div className="row" key={index}>
                        <div className="col-lg-4 d-flex justify-content-center align-items-center mb-4 mb-lg-0">
                          
                            <img
                            src={r.profile?.image}
                            className="rounded-circle img-fluid shadow-1"
                            alt="woman avatar"
                            width={200}
                            height={200}
                            />
                        </div>
                        <div className="col-lg-8">
                            <p className="text-dark fw-bold mb-4">
                            Review:{" "}
                            <i>
                               {r.review}
                            </i>
                            </p>
                            <p className="text-dark fw-bold mb-2">
                            Reply:{r.reply}
                            <i>
                                {r.reply === "" 
                                ? <span>No Reply Yet</span>
                                : (r.reply)
                            }
                            </i>
                            </p>
                            <p className="fw-bold text-dark mb-2">
                            <strong>Name: {r.profile?.fullname}</strong>
                            </p>
                            <p className="fw-bold text-muted mb-0">
                            Product: {r.product?.title}
                            </p>
                            <p className="fw-bold text-muted mb-0">
                            Rating:
                             {r.rating ===1 &&
                                <i className='fas fa-star'></i>}

                                {r.rating ===2 &&
                                  <>
                                    <i className='fas fa-star'></i>
                                    <i className='fas fa-star'></i>
                                  </>
                                }

                                 {r.rating ===3 &&
                                  <>
                                    <i className='fas fa-star'></i>
                                    <i className='fas fa-star'></i>
                                    <i className='fas fa-star'></i>
                                  </>
                                }

                                 {r.rating ===4 &&
                                  <>
                                    <i className='fas fa-star'></i>
                                    <i className='fas fa-star'></i>
                                    <i className='fas fa-star'></i>
                                    <i className='fas fa-star'></i>
                                  </>
                                }

                                {r.rating ===5 &&
                                  <>
                                    <i className='fas fa-star'></i>
                                    <i className='fas fa-star'></i>
                                    <i className='fas fa-star'></i>
                                    <i className='fas fa-star'></i>
                                    <i className='fas fa-star'></i>
                                  </>
                                }
                            </p>
                            <div className="d-flex mt-3">
                            <p className="fw-bold text-muted mb-0">
                                <Link to={`/vendor/reviews/${r.id}/`} 
                                className="btn btn-primary">
                                Reply <i className="fas fa-pen" />
                                </Link>
                            </p>
                         
                            </div>
                        </div>
                        </div>
                        
                    </div>
                    </div>

))}
                </div>
                </div>
            </section>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Reviews
