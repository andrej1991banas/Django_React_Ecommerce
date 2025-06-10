import React from 'react'
import apiInstance from '../../utils/axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'





function Payment_success() {
    const [order, setOrder] = useState([])
    const [status, setStatus] = useState("Veryfing")

    const axios = apiInstance
    const param = useParams()
   
    
    const urlParam = new URLSearchParams(window.location.search)
    const sessionId= urlParam.get("session_id")
    const [postRequestMade, setPostRequestMade] = useState(false);



    useEffect(() => {
    // Fetch order details
    apiInstance.get(`checkout/${param.order_oid}/`).then((res) => {
        setOrder(res.data);
        
    });
    }, [param.order_oid]); // Runs only when `order_oid` changes

    useEffect(() => {
    // Ensure `order` and `sessionId` exist before making the POST request
        if (order.oid && sessionId && !postRequestMade) {
            const formdata = new FormData();
            formdata.append("order_oid", order.oid);
            formdata.append("session_id", sessionId);

            setPostRequestMade(true);
            setStatus("Veryfing");

            apiInstance.post(`payment-success/${order.oid}/`, formdata).then((res) => {
                if (res.data.message === "Payment Successful")
                    setStatus("Payment Successful");

                if (res.data.message === "Already Paid")
                    setStatus("Already Paid");

                if (res.data.message === "Your Invoice Is Unpaid")
                    setStatus("Your Invoice Is Unpaid");

                if (res.data.message === "Your Order Was Cancelled")
                    setStatus("Your Order Was Cancelled");
                
            });
        }
    }, [order]); // Runs only when `order`  change


    return (
    <main className="mb-4 mt-4 h-100">
        <div className="container">
        {/* Section: Checkout form */}
        <section className="">
            <div className="gx-lg-5">
            <div className="row pb50">
                <div className="col-lg-12">

                </div>
            </div>
            <div className="row">
                <div className="col-xl-12">
                <div className="application_statics">
                    <div className="account_user_deails dashboard_page">
                        {status === "Veryfing" &&
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="col-lg-12">
                                <div className="border border-3 border-success" />
                                <div className="card bg-white shadow p-5">
                                    <div className="mb-4 text-center">
                                    <i
                                        className="fas fa-spinner fa-spin text-warning"
                                        style={{ fontSize: 100, color: "green" }}
                                    />
                                    </div>
                                    <div className="text-center">
                                    <h1>Payment Verifying <i className ='fas fa-spinner fa-spin'></i></h1>
                                    <p>
                                        <b className ='text-success'>Please hold on while we verify your payment </b> <br/>
                                        <b className='text-danger'> Do not leave or reaload the page</b>
                                    </p>
                                  
                                    </div>
                                </div>
                                </div>
                            </div>
                        }

                        {status === "Your Invoice Is Unpaid" &&
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="col-lg-12">
                                <div className="border border-3 border-success" />
                                <div className="card bg-white shadow p-5">
                                    <div className="mb-4 text-center">
                                    <i
                                        className="fas fa-check-circle text-success"
                                        style={{ fontSize: 100, color: "green" }}
                                    />
                                    </div>
                                    <div className="text-center">
                                    <h1>Unpaid Invoice <i className ='fas fa-ban'></i></h1>
                                    <p>
                                        
                                        <b className='text-danger'> Please Try Make The Payment Again</b>
                                    </p>
                                  
                                    </div>
                                </div>
                                </div>
                            </div>
                        }

                         {status === "Already Paid" &&
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="col-lg-12">
                                <div className="border border-3 border-success" />
                                <div className="card bg-white shadow p-5">
                                    <div className="mb-4 text-center">
                                    <i
                                        className="fas fa-check-circle text-success"
                                        style={{ fontSize: 100, color: "green" }}
                                    />
                                    </div>
                                    <div className="text-center">
                                    <h1>Already Paid <i className ='fas fa-ban'></i></h1>
                                    <p>
                                        
                                        <b className='text-success'> You Already Paid For Your Invoice</b>
                                    </p>
                                  
                                    </div>
                                </div>
                                </div>
                            </div>
                        }

                         {status === "Payment Successful" &&
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="col-lg-12">
                                <div className="border border-3 border-success" />
                                <div className="card bg-white shadow p-5">
                                    <div className="mb-4 text-center">
                                    <i
                                        className="fas fa-check-circle text-success"
                                        style={{ fontSize: 100, color: "green" }}
                                    />
                                    </div>
                                    <div className="text-center">
                                    <h1>Thank You !</h1>
                                    <p>
                                        Your checkout for order #<b> {order.oid}</b> was successfull, we have sent the
                                        order detail to your email{order.email}
                                    </p>
                                    <button
                                        className="btn btn-success mt-3"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                    >
                                        View Order <i className="fas fa-eye" />{" "}
                                    </button>
                                    <a
                                        href="/"
                                        className="btn btn-primary mt-3 ms-2"
                                    >
                                        Download Invoice{" "}
                                        <i className="fas fa-file-invoice" />{" "}
                                    </a>
                                    <a
                                        className="btn btn-secondary mt-3 ms-2"
                                    >
                                        Go Home <i className="fas fa-fa-arrow-left" />{" "}
                                    </a>
                                    </div>
                                </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>
        </div>
        <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
    >
        <div className="modal-dialog">
        <div className="modal-content">
            <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
                Order Summary
            </h5>
            <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
            />
            </div>
            <div className="modal-body">
            <div className="modal-body text-start text-black p-4">
                <h5
                className="modal-title text-uppercase "
                id="exampleModalLabel"
                >
                {order.full_name}
                </h5>
                <h6>{order.email}</h6>
                <h6>{order.mobile}</h6>
                <h6 className="mb-5">{order.address} - {order.city} - {order.state} - {order.country}</h6>
                <p className="mb-0" style={{ color: "#35558a" }}>
                Payment summary
                </p>
                <hr
                className="mt-2 mb-4"
                style={{
                    height: 0,
                    backgroundColor: "transparent",
                    opacity: ".75",
                    borderTop: "2px dashed #9e9e9e"
                }}
                />
                <div className="d-flex justify-content-between">
                <p className="fw-bold mb-0">Subtotal</p>
                <p className="text-muted mb-0">{order.sub_total}$</p>
                </div>
                <div className="d-flex justify-content-between">
                <p className="small mb-0">Shipping Fee</p>
                <p className="small mb-0">{order.shipping_amount}$</p>
                </div>
                <div className="d-flex justify-content-between">
                <p className="small mb-0">Service Fee</p>
                <p className="small mb-0">{order.service_fee}$</p>
                </div>
                <div className="d-flex justify-content-between">
                <p className="small mb-0">Tax</p>
                <p className="small mb-0">{order.tax_fee}$</p>
                </div>
                <div className="d-flex justify-content-between">
                <p className="small mb-0">Discount</p>
                <p className="small mb-0">{order.saved}$</p>
                </div>
                <div className="d-flex justify-content-between mt-4">
                <p className="fw-bold">Total</p>
                <p className="fw-bold" style={{ color: "#35558a" }}>
                    {order.total} $
                </p>
                </div>
            </div>

            </div>
        </div>
        </div>
    </div>
    </main>
    
    )
}

export default Payment_success
