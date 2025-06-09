import React, {useState, useEffect} from 'react'
//using extension
import { login } from '../../utils/auth' //importing login funcionality from file
import { useNavigate } from 'react-router-dom'
import { userAuthStore } from '../../store/auth' //import useAuthStore zustand store for user datas
import { Link } from 'react-router-dom';





function Login() {
    const [email, setEmail] = useState(""); //hook for the useState and data used for log in
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false); //rendering the loading page during "empty page situation"
    const isLoggedIn = userAuthStore ( (state) => state.isLoggedIn); //hook for the zustand store
    const navigate = useNavigate(); //variable for initianting package
    

    useEffect( () => {
        if(isLoggedIn()){
            navigate("/");
        }
    }, [])

    const resetForm = () =>{
        setEmail("");
        setPassword("");
    }

    const handleLogin = async (e) =>{
        e.preventDefault();
        setIsLoading(true)

        const{error} = await login(email, password)
        if (error) {
            alert(error);
             setIsLoading(false);
        } else{
            navigate("/");
            resetForm();
            setIsLoading(false);
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
                                    <h3 className="text-center">Login</h3>
                                    <br />

                                    <div className="tab-content">
                                        <div
                                            className="tab-pane fade show active"
                                            id="pills-login"
                                            role="tabpanel"
                                            aria-labelledby="tab-login"
                                        >
                                            <form onSubmit={handleLogin}>
                                                {/* Email input */}
                                                <div className="form-outline mb-4">
                                                    <label className="form-label" htmlFor="Full Name">
                                                        Email Address
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="email"
                                                        name="email"
                                                        value={email}
                                                        className="form-control"
                                                        onChange={(e) => setEmail(e.target.value) }

                                                    />
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <label className="form-label" htmlFor="loginPassword">
                                                        Password
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

                                                <div className="d-flex justify-content-center">
                                                    {isLoading === true
                                                
                                                        ? <button 
                                                            type="submit" 
                                                            className="btn btn-outline-success btn-block w-100 text-center" >
                                                    
                                                            Signing In...  <i className="spinner-grow spinner-grow-sm ms-2" role="status"></i> 
                                                            
                                                        </button>

                                                        :<button 
                                                            type="submit" 
                                                            className="btn btn-outline-success btn-block w-100 text-center" >
                                                    
                                                            Sign In  <i className="fas fa-sign-in" />
                                                        </button>
                                                    }
                                                 </div>

                                                <div className="text-center">
                                                    <p className='mt-4'>
                                                        Don't have an account? <Link to="/register">Register</Link>
                                                    </p>
                                                    <p className='mt-0'>
                                                        <Link to="/forgot-password/" className='text-danger'>Forgot Password?</Link>
                                                    </p>
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

export default Login








