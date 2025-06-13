import React from 'react';
import Sidebar from './sidebar';
import { useState, useEffect } from 'react';
import apiInstance from '../../utils/axios';
import UserData from '../plugin/user_data';
import { Link } from 'react-router-dom';



function Account() {

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
      <main className="mt-5">
        <div className="container">
          <section>
            <div className="row">
              {/* Sidebar */}
              
              <Sidebar/>

              {/* Main Content */}
              <div className="col-lg-8">
                <div className="rounded shadow p-3">
                  <h2>Hi {profile.fullname},</h2>
                  <div className="mt-4">
                    From your account dashboard, you can easily check & view your{" "}
                    <a href="#">orders</a>, manage your{" "}
                    <a href="#">shipping</a>, and{" "}
                    <a href="#">edit account</a>.
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
    )
}

export default Account
