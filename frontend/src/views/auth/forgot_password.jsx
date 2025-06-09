import React from 'react'
import { useState } from 'react'
import apiInstance from '../../utils/axios'
import { useNavigate, Link } from 'react-router-dom'






function ForgotPassword() {
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false); //rendering the loading page during "empty page situation"
    const navigate = useNavigate()

    const handleSubmit = async() => {
      setIsLoading(true)
      try{
          await apiInstance.get(`user/password-reset/${email}/`).then((res) =>{
           alert ("An Email Has Been Sent To you")
           setIsLoading(false)
          //  navigate("/create-new-password")
          })
      }catch (error) {
        alert("Email Does No Exists")
        setIsLoading(false)
      }
        
        }
    

  return (
    <div>
        <main className="" style={{ marginBottom: 100, marginTop: 50 }}>
            <div className="container">
                {/* Section: Login form */}
                <section className="">
                    <div className="row d-flex justify-content-center">
                        <div className="col-xl-5 col-md-8">
                            <div className="card rounded-5">
                                <div className="card-body p-4">
                                    <h3 className="text-center">Forgotten Password</h3>
                                    <br />

                                    <div className="tab-content">
                                        <div
                                            className="tab-pane fade show active"
                                            id="pills-login"
                                            role="tabpanel"
                                            aria-labelledby="tab-login"
                                        >
                                            <div>
                                                {/* Email input */}
                                                <div className="form-outline mb-4">
                                                    <label className="form-label" htmlFor="Email Address">
                                                        Email Address
                                                    </label>
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        value={email}
                                                        
                                                        onChange={(e) => setEmail(e.target.value) }

                                                    />
                                                </div>

                                                <div className="d-flex justify-content-center">
                                                    {isLoading===true
                                                    ?<button 
                                                        disabled 
                                                        type="button"
                                                        className="btn btn-outline-success btn-block w-100 text-center" >
                                                
                                                        Processing .... 
                                                    </button>

                                                    :<button 
                                                        onClick={handleSubmit}
                                                        type="button" 
                                                        className="btn btn-outline-success btn-block w-100 text-center" >
                                                
                                                        Send Email  <i className="fas fa-paper-plane" />
                                                    </button>
                                                    }
                                                    
                                                  </div>

                                            </div>
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

export default ForgotPassword
