import React from 'react';
import { useState, useEffect} from 'react';
import apiInstance from '../../utils/axios';
import UserData from '../plugin/user_data';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';





function Invoice() {
    const [orderItems, setOrderItems] = useState([])
    const [order, setOrder] = useState({})


    const userData=UserData()
    const param = useParams()

    useEffect(() => {
        apiInstance
        .get(`customer/order/${userData?.user_id}/${param?.order_oid}`).then((res) => {
            setOrder(res.data);
            setOrderItems(res.data.orderitem);
        })
    }, [])

    console.log(order)


  return (
    <div>
        <div>
            <>
                <div className="row d-flex justify-content-center p-2">
                    <div className="receipt-main col-xs-10 col-sm-10 col-md-6 col-xs-offset-1 col-sm-offset-1 col-md-offset-3">
                        <div className="d-flex justify-content-between">
                            <div className="row">
                                <div className="receipt-header">
                                    <div className="col-xs-6 col-sm-6 col-md-6">
                                        <div className="receipt-left">
                                            <img
                                                className="img-responsive"
                                                alt="iamgurdeeposahan"
                                                src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg"
                                                style={{ width: 71, borderRadius: 43 }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xs-12 col-sm-12 col-md-12 text-left">
                                        <div className="receipt-right">
                                            <h5 className="margin-top-10">
                                                Thymallus<span className="text-warning">.</span>
                                            </h5>
                                            <p>
                                                <i className="fa fa-phone" /> +1 3649-6589
                                            </p>
                                            <p>
                                                <i className="fa fa-envelope" /> company@gmail.com
                                            </p>
                                            <p>
                                                <i className="fa fa-location-arrow" /> 123 Main Street
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="receipt-header receipt-header-mid">
                                    <div className="col-xs-12 col-sm-12 col-md-12 text-left">
                                        <div className="receipt-right">
                                            <h5>Customer Details</h5>
                                            <p>
                                                <b>
                                                    <i className="fa fa-user" />
                                                </b>
                                                {order.full_name}
                                            </p>
                                            <p>
                                                <b>
                                                    <i className="fa fa-envelope" />
                                                </b>{order.email}
                                            </p>
                                            <p>
                                                <b>
                                                    <i className="fa fa-phone" />
                                                </b>{order.mobile}
                                            </p>
                                        </div>
                                    </div>
                                    <br />
                                    <div className="col-xs-12 col-sm-12 col-md-12">
                                        <div className="receipt-left">
                                            <h6>
                                                INVOICE ID #{order.oid}
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>

                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Qty</th>
                                        <th>VAT</th>
                                        <th>Sub Total</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderItems.map((o, index)=>(

                                    
                                    <tr>
                                        <td className="col-md-5">
                                           {o.product.title}
                                        </td>
                                        <td className="col-md-2">
                                            ${o.product.price}
                                        </td>
                                        <td className="col-md-2">
                                            {o.qty}
                                        </td>
                                        <td className="col-md-2">
                                            ${o.tax_fee}
                                        </td>
                                        <td className="col-md-2">
                                           
                                            ${o.qty*o.product.price}
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="row">
                                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 d-flex justify-content-start">

                                </div>
                                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 d-flex justify-content-end">
                                    <div className="receipt-right">
                                        <h5>Summary</h5>
                                        <p className="mb-2">
                                            <b>Sub Total: </b>
                                            ${order.sub_total}
                                        </p>
                                        <p className="mb-2">
                                            <b>Shipping: </b>
                                            ${order.shipping_amount}
                                        </p>
                                        <p className="mb-2">
                                            <b>Tax: </b>
                                            ${order.tax_fee}
                                        </p>
                                        <p className="mb-2">
                                            <b>Service Fee: </b>
                                            ${order.service_fee}
                                        </p>
                                        <br />
                                        <p className="mb-2">
                                            <b>Total: </b>
                                            ${order.total}
                                        </p>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-center align-items-center">
                            <button id="printButton" className="btn btn-dark">
                                Print <i className="fas fa-print" />
                            </button>
                        </div>
                    </div>
                </div>
                {/* Print Windows */}
            </>

        </div>
    </div>
  )
}

export default Invoice
