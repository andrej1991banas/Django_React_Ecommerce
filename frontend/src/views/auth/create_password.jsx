import React from 'react';
import { use } from 'react';
import { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import apiInstance from '../../utils/axios';





function CreatePassword() {
    const [password, setPassword]= useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false); //rendering the loading page during "empty page situation"

    const [serachParam] = useSearchParams()
    const navigate = useNavigate()
    const otp = serachParam.get("otp")
    const uidb64 = serachParam.get("uidb64")


    const handlePasswordSubmit =async (e) => {
        e.preventDefault()
        setIsLoading(true)
        if (password !== confirmPassword) {
            alert("Passwords do not Match")

            setIsLoading(false)
        } else {
            const formdata = new FormData()
            formdata.append('password',password);
            formdata.append('otp',otp);
            formdata.append('uidb64',uidb64);
            
            try{
                await apiInstance.post('user/password-change/', formdata).then(res => {
                    console.log(res.data);
                    alert("Password Changed Successfully")
                    navigate("/login")
                    setIsLoading(false)
                })
            }catch (error){
               alert ("An Error occured while changing the password")
               setIsLoading(false)
            }

        }
    }

  return (
    <div>
      <h1> Create New Password</h1>
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
                                            <form onSubmit={handlePasswordSubmit}>
                                                {/* Email input */}
                                                <div className="form-outline mb-4">
                                                    <label className="form-label" htmlFor="New Password">
                                                        New Password
                                                    </label>
                                                    <input
                                                        type="password"
                                                        id="password"
                                                        name="password"
                                                        value={password}
                                                        className="form-control"
                                                        onChange={(e) => setPassword(e.target.value) }

                                                    />
                                                </div>
                                                 <div className="form-outline mb-4">
                                                    <label className="form-label" htmlFor="Confirm New Password">
                                                        Confirm New Password
                                                    </label>
                                                    <input
                                                        type="password"
                                                        id="confirmPassword"
                                                        name="confirmPassword"
                                                        value={confirmPassword}
                                                        className="form-control"
                                                        onChange={(e) => setConfirmPassword(e.target.value) }

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
                                                       
                                                        type="submit" 
                                                        className="btn btn-outline-success btn-block w-100 text-center" >
                                                
                                                        Save New Password <i className="fas fa-paper-plane" />
                                                    </button>
                                                    }
                                                    
                                                  </div>

                                            </form>
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

export default CreatePassword
