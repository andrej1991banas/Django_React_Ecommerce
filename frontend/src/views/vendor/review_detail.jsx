import React from 'react'
import SidebarVendor from './sidebar'
import UserData from '../plugin/user_data'
import { useState, useEffect} from 'react';
import apiInstance from '../../utils/axios';
import { Line, Bar } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';





function ReviewDetail() {

    const [reviews, setReview] = useState({})
    const param = useParams()
    const [updateReview, setUpdateReview] = useState({reply : ""})   



    const handleReplyChange = (event) => {
        setUpdateReview({
            ...updateReview,
            [event.target.name]: event.target.value
        })
        console.log(updateReview)
    }


    useEffect(() => {
        apiInstance.get(`vendor/review-details/${UserData()?.vendor_id}/${param?.review_id}/`).then((res) => {
            console.log(res.data)
            setReview(res.data);
            
        })
    },[])


    const handleReplySubmit = async (e) => {
        e.preventDefault()
        const formdata = new FormData
        formdata.append('reply', updateReview.reply)

        await apiInstance.patch(`vendor/review-details/${UserData()?.vendor_id}/${param?.review_id}/`, formdata).then((res) => {
            console.log(res.data)
            setReview(res.data);
        })
    }



  return (
    <div>
        <div className="container-fluid" id="main">
        <div className="row row-offcanvas row-offcanvas-left h-100">
            {/*/col*/}
            <div className="col-md-9 col-lg-10 main mt-4">
            <h4>
                <i className="fas fa-star" /> Review and Rating Details
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
                    <div className="card mt-3 mb-3">
                    <div className="card-body m-3">
                        <div className="row">
                        <div className="col-lg-4 d-flex justify-content-center align-items-center mb-4 mb-lg-0">
                            <img
                            src={reviews.profile?.image}
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
                                {reviews.review}
                            </i>
                            </p>
                            <p className="text-dark fw-bold mb-2">
                            Reply:{reviews.reply}
                            <i>
                                {reviews.reply === "" 
                                ? <span>No Reply Yet</span>
                                : (reviews.reply)
                            }
                            </i>
                            </p>
                            <p className="fw-bold text-dark mb-2">
                            <strong>Name: {reviews.profile?.fullname}</strong>
                            </p>
                            <p className="fw-bold text-muted mb-0">
                            Product:{reviews.product?.title}
                            </p>
                            <p className="fw-bold text-muted mb-0">
                            Rating: {reviews.rating ===1 &&
                                <i className='fas fa-star'></i>}

                                {reviews.rating ===2 &&
                                  <>
                                    <i className='fas fa-star'></i>
                                    <i className='fas fa-star'></i>
                                  </>
                                }

                                 {reviews.rating ===3 &&
                                  <>
                                    <i className='fas fa-star'></i>
                                    <i className='fas fa-star'></i>
                                    <i className='fas fa-star'></i>
                                  </>
                                }

                                 {reviews.rating ===4 &&
                                  <>
                                    <i className='fas fa-star'></i>
                                    <i className='fas fa-star'></i>
                                    <i className='fas fa-star'></i>
                                    <i className='fas fa-star'></i>
                                  </>
                                }

                                {reviews.rating ===5 &&
                                  <>
                                    <i className='fas fa-star'></i>
                                    <i className='fas fa-star'></i>
                                    <i className='fas fa-star'></i>
                                    <i className='fas fa-star'></i>
                                    <i className='fas fa-star'></i>
                                  </>
                                }
                            </p>
                            <div className="mt-3">
                            <form onSubmit ={handleReplySubmit}   className="d-flex">
                                <input value={updateReview.reply} name='reply' onChange={handleReplyChange} type="text" placeholder="Write Your Reply" className='form-control'/>
                                <button className='btn btn-success ms-2' type='submit'><i className='fas fa-paper-plane mt-2'> </i></button>
                              
                            </form>
                       
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>

                </div>
                </div>
            </section>
            </div>
        </div>
        </div>
    </div>
  )
}

export default ReviewDetail
