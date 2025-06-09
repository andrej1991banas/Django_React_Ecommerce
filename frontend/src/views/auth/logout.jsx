import React, { useEffect } from 'react'
import { logout } from '../../utils/auth'
import { Link } from 'react-router-dom';


function Logout() {
    useEffect(()=> {
        logout()
    }, [])
  return (
    <div>
     <main className="" style={{ marginBottom: 100, marginTop: 50 }}>
          <div className="container">
              {/* Section: Login form */}
              <section className="">
                  <div className="row d-flex justify-content-center">
                      <div className="col-xl-5 col-md-8">
                          <div className="card rounded-5">
                              <div className="card-body p-4 text-center">
                                <h3> You Have been Logged Out</h3>
                                <Link to='/register' className='btn btn-outline-success'>Register <i className="fas fa-user-plus" /></Link>
                                <Link to='/login' className='btn btn-outline-warning'>Login <i className="fas fa-sign-in" /></Link>
                                  <div className="tab-content">
                                      <div
                                          className="tab-pane fade show active"
                                          id="pills-login"
                                          role="tabpanel"
                                          aria-labelledby="tab-login"
                                      >
                                      </div>
                                  </div>
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

export default Logout
