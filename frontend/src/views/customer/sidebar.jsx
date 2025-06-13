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
        <div className="col-lg-4">
        <div className="rounded shadow p-3">
            <table className="table table-bordered">
            <tbody>
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
            </tbody>
            </table>

            <h4>Quick Links</h4>
            <table className="table table-bordered">
            <tbody>
                <tr>
                <td>
                    <div className="fw-bold">
                        <Link className ="text-dark" to= '/customer/account/'> Account</Link>
                    </div>
                </td>
                </tr>
                <tr>
                <td>
                    <div className="fw-bold">
                        <Link className ="text-dark" to= '/customer/orders/'>Orders</Link>
                    </div>
                </td>
                </tr>
                <tr>
                <td>
                    <div className="fw-bold">
                        <Link to= {'/customer/wishlist/'} className="text-dark" >Wishlist</Link>
                    </div>
                </td>
                </tr>
                <tr>
                <td>
                    <div className="fw-bold">
                        <Link to= {'/customer/notifications/'} className="text-dark" >Notifications</Link>
                    </div>
                </td>
                </tr>
                <tr>
                <td>
                    <div className="fw-bold">
                        <Link to= {'/customer/settings/'} className="text-dark" >Settings</Link>
                    </div>
                </td>
                </tr>
            </tbody>
            </table>
        </div>
        </div>
    </div>
    )
}

export default Sidebar
