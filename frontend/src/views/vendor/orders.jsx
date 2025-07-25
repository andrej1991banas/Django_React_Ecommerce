import React, { useState, useEffect } from 'react';
import UserData from '../plugin/user_data';
import apiInstance from '../../utils/axios';
import moment from 'moment';
import { Link } from 'react-router-dom';




function OrdersVendor() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    apiInstance
      .get(`vendor/orders/${UserData()?.vendor_id}/`)
      .then((res) => {
        setOrders(res.data);
      });
  }, []);


  const handleFilterOrder = async (filter) => {
        console.log(filter);

        const response = await apiInstance.get(`vendor/filter/orders/${UserData()?.vendor_id}?filter=${filter}`)
        setOrders(response.data)

  }




  return (
    <div className="container-fluid mt-4">
      <h2 className="mb-4">Vendor Orders</h2>

      <div className="dropdown mb-3">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Filter <i className="fas fa-sliders" />
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li><a className="dropdown-item" onClick={() => handleFilterOrder("paid")}>Payment Status: Paid</a></li>
          <li><a className="dropdown-item" onClick={() => handleFilterOrder("processing")}>Payment Status: Proccesing</a></li>
          <li><a className="dropdown-item" onClick={() => handleFilterOrder("pending")} >Payment Status: Pending</a></li>
          <hr />
          <li><a className="dropdown-item" onClick={() => handleFilterOrder("latest")} >Date: Latest</a></li>
          <li><a className="dropdown-item" onClick={() => handleFilterOrder("oldest")} >Date: Oldest</a></li>
          <hr />
          <li><a className="dropdown-item" onClick={() => handleFilterOrder("fullflled")} >Delivery Status: Shipped</a></li>
          <li><a className="dropdown-item" onClick={() => handleFilterOrder("cancelled")} >Delivery Status: Cancelled</a></li>
          <li><a className="dropdown-item" onClick={() => handleFilterOrder("pending")} >Delivery Status: Pendig</a></li>
          {/* <li><a className="dropdown-item" onClick={() => handleFilterOrder("latest")} >Delivery Status: Delivered</a></li> */}
        </ul>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>#Order ID</th>
              <th>Total</th>
              <th>Payment Status</th>
              <th>Delivery Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o, index) => (
              <tr key={index}>
                <th scope="row">#{o.oid}</th>
                <td>{o.total} $</td>
                <td>{o.payment_status}</td>
                <td>{o.order_status}</td>
                <td>{moment(o.date).format("MM/DD/YYYY")}</td>
                <td>
                  <Link to ={`/vendor/order/${o.oid}/`} className="btn btn-outline-primary me-2 mb-1">
                    <i className="fas fa-eye"></i> View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrdersVendor;
