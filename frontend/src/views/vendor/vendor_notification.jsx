import React from 'react';
import { useState, useEffect} from 'react';
import apiInstance from '../../utils/axios';
import UserData from '../plugin/user_data';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import moment from 'moment';


function Notification() {

    const [notifications, setNotifications] = useState([])
    const [stats, setStats] = useState([])


    const fetchNoti =async () => {
        await apiInstance.get(`vendor/vendor-noti/${UserData()?.vendor_id}/`).then((res)=>{
            setNotifications(res.data)
        })
    }


    console.log(notifications)

     const fetchNotiStats =async () => {
        await apiInstance.get(`vendor/noti-summary/${UserData()?.vendor_id}/`).then((res)=>{
            setStats(res.data[0])
        })
    }


    useEffect(() => {
        fetchNotiStats()
        fetchNoti()
    },[])

    const markAsSeen =async (notiId) => {
        await apiInstance.get(`vendor/noti-mark-as-seen/${UserData()?.vendor_id}/${notiId}/`).then((res) => {
            fetchNotiStats()
            fetchNoti()
        })
    }

  return (
    <div>
        <div className="container-fluid" id="main">
        <div className="row row-offcanvas row-offcanvas-left h-100">
            {/* Add Sidebar Here */}
            
            <div className="col-md-9 col-lg-10 main mt-4">
            <div className="row mb-3">
                <div className="col-xl-4 col-lg-6 mb-2">
                <div className="card card-inverse card-success">
                    <div className="card-block bg-danger p-3">
                    <div className="rotate">
                        <i className="bi bi-tag fa-5x" />
                    </div>
                    <h6 className="text-uppercase">Un-read Notification</h6>
                    <h1 className="display-1">{stats.unread_noti}</h1>
                    </div>
                </div>
                </div>
                <div className="col-xl-4 col-lg-6 mb-2">
                <div className="card card-inverse card-success">
                    <div className="card-block bg-success p-3">
                    <div className="rotate">
                        <i className="bi bi-tag fa-5x" />
                    </div>
                    <h6 className="text-uppercase">Read Notification</h6>
                    <h1 className="display-1">{stats.read_noti}</h1>
                    </div>
                </div>
                </div>
                <div className="col-xl-4 col-lg-6 mb-2">
                <div className="card card-inverse card-success">
                    <div className="card-block bg-primary p-3">
                    <div className="rotate">
                        <i className="bi bi-tag fa-5x" />
                    </div>
                    <h6 className="text-uppercase">All Notification</h6>
                    <h1 className="display-1">{stats.all_noti}</h1>
                    </div>
                </div>
                </div>
            </div>
            <hr />
            <div className="row  container">
                <div className="col-lg-12">
                <h4 className="mt-3 mb-1">
                    {" "}
                    <i className="fas fa-bell" /> Notifications
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
                        Date: Latest
                        </a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="#">
                        Date: Oldest
                        </a>
                    </li>
                    <hr />
                    <li>
                        <a className="dropdown-item" href="#">
                        Status: Read
                        </a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="#">
                        Status: UnRead
                        </a>
                    </li>
                    </ul>
                </div>
                <table className="table">
                    <thead className="table-dark">
                    <tr>
                        <th scope="col">S/N</th>
                        <th scope="col">Type</th>
                        <th scope="col">Message</th>
                        <th scope="col">Status</th>
                        <th scope="col">Date</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                         {notifications.map((n, index) => (       
                    <tr key={index}>
                        <th>{n.id}</th>
                        <td>New Order</td>
                        <td>
                        You've got a new order for <b>{n.order_item.product.title}</b>
                        </td>
                        <td>
                            {n.seen === true &&
                                <> 
                                    Read <i className="fas fa-eye" />
                                </>
                            }
                            {n.seen === false &&
                                <> 
                                    Unread <i className="fas fa-eye-slash" />
                                </>
                            }
                        </td>
                        <td>{moment(n.date).format("DD.MM.YY")}</td>
                        <td>
                        <a onClick ={() => markAsSeen(n.id)} href="#" className="btn btn-secondary mb-1">
                            <i className="fas fa-eye" />
                        </a>
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
    </div>
  )
}

export default Notification
