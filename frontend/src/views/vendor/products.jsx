import React from 'react'
import SidebarVendor from './sidebar'
import UserData from '../plugin/user_data'
import { useState, useEffect} from 'react';
import apiInstance from '../../utils/axios';
import { Line, Bar } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';
import { Link, useLocation } from 'react-router-dom';






function ProductsVendor() {

const [products, setProducts] = useState([])

useEffect(() => {
    apiInstance.get(`/vendor/dashboard/${UserData()?.vendor_id}/`).then((res) => {
        setStats(res.data[0])
    })
    apiInstance.get(`vendor/products/${UserData()?.vendor_id}/`).then ((res) =>{
        setProducts(res.data)
    })
}, [])


  return (
    <div>
        <div className="container-fluid" id="main">
        <div className="row row-offcanvas row-offcanvas-left h-100">
            {/* Side Bar Here */}
            <div className="col-md-9 col-lg-10 main mt-4">
            <div className="row mb-3 container">
                <h4>
                <i className="bi bi-grid" /> All Products
                </h4>
                <div className="dropdown">
                <button
                    className="btn btn-secondary dropdown-toggle btn-sm mt-3 mb-4"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    Filter <i className="fas fa-sliders" />
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li>
                    <a className="dropdown-item" href="#">
                        Status: Live
                    </a>
                    </li>
                    <li>
                    <a className="dropdown-item" href="#">
                        Status: In-active
                    </a>
                    </li>
                    <li>
                    <a className="dropdown-item" href="#">
                        Status: In-review
                    </a>
                    </li>
                    <hr />
                    <li>
                    <a className="dropdown-item" href="#">
                        Date: Latest
                    </a>
                    </li>
                    <li>
                    <a className="dropdown-item" href="#">
                        Date: Oldest
                    </a>
                    </li>
                </ul>
                </div>
                <table className="table">
                <thead className="table-dark">
                    <tr>
                    <th scope="col">#ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map ((p, index) => (
                    <tr key={index}>
                    <th scope="row">
                        <img src={p.image} alt="" width="50" height="50" />
                    </th>
                    <td>{p.title}</td>
                    <td>${p.price}</td>
                    <td>{p.stock_qty}</td>
                    <td>{p.status}</td>
                    <td>
                        <Link href="" className="btn btn-primary mb-1 me-2">
                        <i className="fas fa-eye" />
                        </Link>
                        <Link href="" className="btn btn-success mb-1 me-2">
                        <i className="fas fa-edit" />
                        </Link>
                        <Link href="" className="btn btn-danger mb-1 me-2">
                        <i className="fas fa-trash" />
                        </Link>
     
                    </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default ProductsVendor
