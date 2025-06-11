import React from 'react';
import { useState, useEffect} from 'react';
import apiInstance from '../../utils/axios';
import UserData from '../plugin/user_data';
import { Link } from 'react-router-dom';


function Sidebar() {

    const [profile, setProfile] = useState({})
    const userData=UserData()

    useEffect (() => {
       apiInstance
        .get(`user/profile/${userData.user_id}/`)
        .then((res) => {
          setProfile(res.data);
        })
    }, [])


    return (
    <div>
        <div className="col-lg-5">
        <div className="d-flex justify-content-center align-items-center flex-column mb-2 shadow rounded-3">
            <img
            src={profile.image}
            style={{ width: 120 }}
            alt=""
            />
            <div className="text-center">
            <h3 className="mb-0">{profile.fullname}</h3>
            <p className="mt-0">
                <a href="">Edit Account</a>
            </p>
            </div>
        </div>
        <ol className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
                <div className="fw-bold">
                    <Link className ="text-dark" to= '/customer/account/'> Account</Link>
                </div>
            </div>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
                <div className="fw-bold">
                    <Link className ="text-dark" to= '/customer/orders/'>Orders</Link>
                </div>
            </div>
            <span className="badge bg-primary rounded-pill">14</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
                <div className="fw-bold">
                    <Link to= '/customer/wishlist/' className="text-dark" >Wishlist</Link>
                </div>
            </div>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
                <div className="fw-bold">Notification</div>
            </div>
            <span className="badge bg-primary rounded-pill">14</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
                <div className="fw-bold">Setting</div>
            </div>
            </li>
        </ol>
        </div>
    </div>
    )
}

export default Sidebar
