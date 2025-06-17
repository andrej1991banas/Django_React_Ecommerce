import React, { useState, useEffect } from 'react';
import UserData from '../plugin/user_data';
import apiInstance from '../../utils/axios';
import moment from 'moment';
import { Link, useParams } from 'react-router-dom';





function OrderDetailVendor() {
    const [orders, setOrders] = useState({});
    const [orderItems, serOrderItems] = useState([]);

    const param = useParams();

    useEffect(() => {
        apiInstance
        .get(`vendor/orders/${UserData()?.vendor_id}/${param.order_oid}/`)
        .then((res) => {
            setOrders(res.data)
            serOrderItems(res.data.orderitem)
            
        })
    }, [])

    
    




  return (
    <div>
        <main className="mt-5">
            <div className="container">
                <section className="">
                    <div className="row">
                        {/* Sidebar Here */}


                        <div className="col-lg-9 mt-1">
                            <main className="mb-5">
                                <div className="container px-4">
                                    <section className="mb-5">
                                        <h3 className="mb-3">
                                            {" "}
                                            <i className="fas fa-shopping-cart text-primary" />Order ID: #{orders.oid}
                                        </h3>
                                        <div className="row gx-xl-5">
                                            <div className="col-lg-3 mb-4 mb-lg-0">
                                                <div
                                                    className="rounded shadow"
                                                    style={{ backgroundColor: "#B2DFDB" }}
                                                >
                                                    <div className="card-body">
                                                        <div className="d-flex align-items-center">
                                                            <div className="">
                                                                <p className="mb-1">Total</p>
                                                                <h2 className="mb-0">
                                                                    ${orders.total}
                                                                    <span
                                                                        className=""
                                                                        style={{ fontSize: "0.875rem" }}
                                                                    ></span>
                                                                </h2>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 mb-4 mb-lg-0">
                                                <div
                                                    className="rounded shadow"
                                                    style={{ backgroundColor: "#D1C4E9" }}
                                                >
                                                    <div className="card-body">
                                                        <div className="d-flex align-items-center">
                                                            <div className="">
                                                                <p className="mb-1">Payment Status</p>
                                                                <h2 className="mb-0">
                                                                    {orders.payment_status}
                                                                    <span
                                                                        className=""
                                                                        style={{ fontSize: "0.875rem" }}
                                                                    ></span>
                                                                </h2>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 mb-4 mb-lg-0">
                                                <div
                                                    className="rounded shadow"
                                                    style={{ backgroundColor: "#BBDEFB" }}
                                                >
                                                    <div className="card-body">
                                                        <div className="d-flex align-items-center">
                                                            <div className="">
                                                                <p className="mb-1">Order Status</p>
                                                                <h2 className="mb-0">
                                                                    {orders.order_status}
                                                                    <span
                                                                        className=""
                                                                        style={{ fontSize: "0.875rem" }}
                                                                    ></span>
                                                                </h2>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 mb-4 mb-lg-0">
                                                <div
                                                    className="rounded shadow"
                                                    style={{ backgroundColor: "#bbfbeb" }}
                                                >
                                                    <div className="card-body">
                                                        <div className="d-flex align-items-center">
                                                            <div className="">
                                                                <p className="mb-1">Shipping Amount</p>
                                                                <h2 className="mb-0">
                                                                    ${orders.shipping_amount}
                                                                    <span
                                                                        className=""
                                                                        style={{ fontSize: "0.875rem" }}
                                                                    ></span>
                                                                </h2>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 mb-4 mb-lg-0 mt-5">
                                                <div
                                                    className="rounded shadow"
                                                    style={{ backgroundColor: "#bbf7fb" }}
                                                >
                                                    <div className="card-body">
                                                        <div className="d-flex align-items-center">
                                                            <div className="">
                                                                <p className="mb-1">VAT Tax</p>
                                                                <h2 className="mb-0">
                                                                    ${orders.tax_fee}
                                                                    <span
                                                                        className=""
                                                                        style={{ fontSize: "0.875rem" }}
                                                                    ></span>
                                                                </h2>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 mb-4 mb-lg-0 mt-5">
                                                <div
                                                    className="rounded shadow"
                                                    style={{ backgroundColor: "#eebbfb" }}
                                                >
                                                    <div className="card-body">
                                                        <div className="d-flex align-items-center">
                                                            <div className="">
                                                                <p className="mb-1">Service Fee</p>
                                                                <h2 className="mb-0">
                                                                    ${orders.service_fee}
                                                                    <span
                                                                        className=""
                                                                        style={{ fontSize: "0.875rem" }}
                                                                    ></span>
                                                                </h2>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 mb-4 mb-lg-0 mt-5">
                                                <div
                                                    className="rounded shadow"
                                                    style={{ backgroundColor: "#bbc5fb" }}
                                                >
                                                    <div className="card-body">
                                                        <div className="d-flex align-items-center">
                                                            <div className="">
                                                                <p className="mb-1">Discount Fee</p>
                                                                <h2 className="mb-0 ">
                                                                    - ${orders.saved}
                                                                    <span
                                                                        className=""
                                                                        style={{ fontSize: "0.875rem" }}
                                                                    ></span>
                                                                </h2>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    <section className="">
 
                                        <div className="row rounded shadow p-3">
                                            <div className="col-lg-12 mb-4 mb-lg-0">
                                                <table className="table align-middle mb-0 bg-white">
                                                    <thead className="bg-light">
                                                                                                   
                                                        <tr>
                                                            
                                                            <th>Product</th>
                                                            <th>Price</th>
                                                            <th>Qty</th>
                                                            <th>Total</th>
                                                        </tr>
                                                        
                                                    </thead>
                                                    
                                                    {orderItems.map((oi, index) => (
                                                    <tbody key={index}>                                  

                                                        <tr>
                                                            <td>
                                                                <div className="d-flex align-items-center">
                                                                    <img
                                                                        src={oi.product.image}
                                                                        style={{ width: 80 }}
                                                                        alt=""
                                                                    />
                                                                    <p className="text-muted mb-0">
                                                                        {moment(oi.created_at).format("DD MMM YYYY")}
                                                                    </p>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <p className="fw-normal mb-1">${oi.price}</p>
                                                            </td>
                                                            <td>
                                                                <p className="fw-normal mb-1">{oi.qty}</p>
                                                            </td>
                                                            <td>
                                                                <span className="fw-normal mb-1">${oi.sub_total}</span>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                    ))}
                                                </table>
                                            </div>
                                       
                                            </div>
                                            
                                    </section>
                                </div>
                            </main>
                        </div>
                    </div>
                </section>
                {/*Section: Wishlist*/}
            </div>
        </main>
    </div>
  )
}

export default OrderDetailVendor
