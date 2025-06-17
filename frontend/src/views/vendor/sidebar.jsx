
import React, { useContext, useState, useEffect } from 'react'
import { userAuthStore } from '../../store/auth';
import { Link, useLocation } from 'react-router-dom';
// import { CartContext } from '../plugin/Context';
import apiInstance from '../../utils/axios';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../plugin/context';



function SidebarVendor() {

const location =useLocation()
const isActiveLink = (currentPath, LinkPath) => {
    return currentPath.includes(LinkPath)
}



  return (
    <div>

            <div
            className="col-md-3 col-lg-2 sidebar-offcanvas bg-dark navbar-dark"
            id="sidebar"
            role="navigation"
            >
            <ul className="nav nav-pills flex-column mb-auto nav flex-column pl-1 pt-2">
                <li className="mb-3">
            <Link to="/vendor/dashboard/" className={"nav-link text-white active"}>
                <i className="bi bi-speedometer" /> Dashboard{" "}
            </Link>
                </li>
                <li className="mb-3">
            <Link to="/vendor/products/" className={isActiveLink(location.pathname, '/vendor/products/') 
                ? "nav-link text-white active" 
                : "nav-link text-white"
            }>
                <i className="bi bi-grid" /> Products{" "}
            </Link>
                </li>
                <li className="mb-3">
            <Link to="/vendor/orders/" className={isActiveLink(location.pathname, '/vendor/orders/') 
                ? "nav-link text-white active" 
                : "nav-link text-white"
            }>
                <i className="bi bi-cart-check" /> Orders{" "}
            </Link>
                </li>
                <li className="mb-3">
            <Link to="/vendor/earning/" className={"nav-link text-white"}>
                <i className="bi bi-currency-dollar" /> Earning{" "}
            </Link>
                </li>
                <li className="mb-3">
            <Link to="/vendor/reviews/" className={"nav-link text-white"}>
                <i className="bi bi-star" /> Reviews{" "}
            </Link>
                </li>
                <li className="mb-3">
                <a href="faqs.html" className="nav-link text-white">
                    <i className="bi bi-patch-question" /> FAQs{" "}
                </a>
                </li>
                <li className="mb-3">
            <Link to={`/vendor/coupon/`} className={"nav-link text-white"}>
                <i className="bi bi-tag" /> Coupon &amp; Discount{" "}
            </Link>
                </li>
                <li className="mb-3">
            <Link to="/vendor/product/new/" className={"nav-link text-white"}>
                <i className="bi bi-plus-circle" /> Add Product{" "}
            </Link>
                </li>
                <li className="mb-3">
            <Link to={`/vendor/notifications/`} className={"nav-link text-white"}>
                <i className="bi bi-bell" /> Notifications{" "}
            </Link>
                </li>
                <li className="mb-3">
            <Link to="/vendor/settings/" className={"nav-link text-white"}>
                <i className="bi bi-gear-fill" /> Settings{" "}
            </Link>
                </li>
                <li className="mb-3">
            <Link to="/logout" className={"nav-link text-white"}>
                <i className="bi bi-box-arrow-left" /> Logout{" "}
            </Link>
                </li>
                <li className="mt-4">
                <div className="row p-1">
                    <div className="col-lg-3">
                    <img
                        src="https://cdn4.buysellads.net/uu/1/134955/1683580549-designdev.jpg"
                        style={{ width: 70, height: 70, objectFit: "cover", borderRadius: "50%" }}
                        alt=""
                    />
                    </div>
                    <div className="col lg-9">
                    <h4 className="text-white">FlyFishing Thymallus</h4>
                    <p className="text-white">@andrej</p>
                    </div>
                </div>
                </li>
            </ul>
            <hr />
            </div>

    </div>
  )
}

export default SidebarVendor
