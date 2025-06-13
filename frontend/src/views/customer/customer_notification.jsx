import React from 'react';
import { useState, useEffect} from 'react';
import apiInstance from '../../utils/axios';
import UserData from '../plugin/user_data';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import moment from 'moment';






function Customer_notification() {
    const [notifications, setNotifications] = useState ([])

    const userData = UserData()

    const fetchNoti= () => {
        apiInstance.get (`customer/notifications/${userData?.user_id}/`).then((res) =>{
            console.log(res.data)
            setNotifications(res.data)
    })
    }

    useEffect (() => {
        fetchNoti ()
    }, [])


    const MarkNotiAsSeen = (notiId) =>{
       apiInstance.get (`customer/notification/${userData?.user_id}/${notiId}/`).then((res) =>{
           fetchNoti ()
    })

    Swal.fire({
        icon: "success",
        text : "Notification Seen"
    })
    }

  return (
 <div>
    <main className="mt-5">
        <div className="container">
            <section className="">
                <div className="row">
                    {/* Sidebar Here */}
                
                    <div className="col-lg-9 mt-1">
                        <section className="">
                            <main className="mb-5" style={{}}>
                                <div className="container px-4">
                                    <section className="">
                                        <h3 className="mb-3">
                                            <i className="fas fa-bell" /> Notifications{" "}
                                        </h3>
                                        <table className="table table-bordered table-striped">
                                            <thead className="table-primary">
                                                <tr>
                                                    <th>#</th>
                                                    <th>Title</th>
                                                    <th>Message</th>
                                                    <th>Date</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {notifications.length === 0 ? (
                                                    <tr>
                                                    <td colSpan="5" className="text-center">
                                                        No notifications available.
                                                    </td>
                                                    </tr>
                                                ) : (
                                                    notifications.map((n, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>Order Confirmed</td>
                                                        <td>Your order has been confirmed</td>
                                                        <td>{moment(n.date).format("MM DD YYYY")}</td>
                                                        <td>
                                                        <button
                                                            onClick={() => MarkNotiAsSeen(n.id)}
                                                            className="btn btn-outline-primary"
                                                        >
                                                            <i className="fas fa-eye"></i> Viewed
                                                        </button>
                                                        </td>
                                                    </tr>
                                                    ))
                                                )}
                                            </tbody>
                                        </table>
                                    </section>
                                </div>
                            </main>
                        </section>
                    </div>
                </div>
            </section>
        </div>
    </main>
</div>
  )
}

export default Customer_notification
