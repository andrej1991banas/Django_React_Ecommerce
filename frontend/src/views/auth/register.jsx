import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { register } from '../../utils/auth' //importing login funcionality from file
import { useNavigate } from 'react-router-dom'
import { userAuthStore } from '../../store/auth' //import useAuthStore zustand store for user datas




function Register() {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [isLoading, setIsLoading] = useState(false); //rendering the loading page during "empty page situation"
    const isLoggedIn = userAuthStore ( (state) => state.isLoggedIn); //hook for the zustand store
    const navigate = useNavigate(); //variable for initianting package  


    useEffect(() =>{
        if(isLoggedIn()){
            navigate("/")
        }
    }, [])

    const resetForm = () => {
        setFullname('');
        setEmail('');
        setMobile('');
        setPassword('');
        setPassword2('');
    };

    const handleSubmit = async (e) => {
            e.preventDefault();
    
            // Set isLoading to true when the form is submitted
            setIsLoading(true);
    
            // Call the register function and handle responses
        const { error } = await register(fullname, email, mobile, password, password2);
                if (error) {
                    alert(JSON.stringify(error));
                } else {
                    navigate('/');
                    resetForm();
                }

        setIsLoading(false); // Hide loading state
    };
    

    return (
        <div>
            <h2>Register</h2>

                <main className="" style={{ marginBottom: 100, marginTop: 50 }}>
                            <div className="container">
                                {/* Section: Login form */}
                                <section className="">
                                    <div className="row d-flex justify-content-center">
                                        <div className="col-xl-5 col-md-8">
                                            <div className="card rounded-5">
                                                <div className="card-body p-4">
                                                    <h3 className="text-center">Register Account</h3>
                                                    <br />

                                                    <div className="tab-content">
                                                        <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                                                            <form onSubmit={handleSubmit}>
                                                                <div className="form-outline mb-4">
                                                                    <label className="form-label" htmlFor="Full Name">
                                                                        Full Name
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        id="username"
                                                                        placeholder="Full Name"
                                                                        required
                                                                        className="form-control"
                                                                        onChange={(e) => setFullname(e.target.value)}

                                                                    />
                                                                </div>
                                                                <div className="form-outline mb-4">
                                                                    <label className="form-label" htmlFor="Email">
                                                                       Email
                                                                    </label>
                                                                    <input
                                                                        type="email"
                                                                        id="email"
                                                                        placeholder="Email"
                                                                        required
                                                                        className="form-control"
                                                                        onChange={(e) => setEmail(e.target.value)}

                                                                    />
                                                                </div>
                                                                <div className="form-outline mb-4">
                                                                    <label className="form-label" htmlFor="Mobile">
                                                                        Phone Number
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        id="mobile"
                                                                        placeholder=" Phone Number"
                                                                        required
                                                                        className="form-control"
                                                                        onChange={(e) => setMobile(e.target.value)}
                                                                    />
                                                                </div>
                                                                {/* Password input */}
                                                                <div className="form-outline mb-4">
                                                                    <label className="form-label" htmlFor="loginName">
                                                                        Password
                                                                    </label>
                                                                    <input
                                                                        type="password"
                                                                        id="password"
                                                                        placeholder=" Password"
                                                                        required
                                                                        className="form-control"
                                                                        onChange={(e) => setPassword(e.target.value)}
                                                                    />
                                                                </div>

                                                                <div className="form-outline mb-4">
                                                                    <label className="form-label" htmlFor="loginName">
                                                                        Confirm Password
                                                                    </label>
                                                                    <input
                                                                        type="password"
                                                                        id="confirm-password"
                                                                        placeholder="Confirm Password"
                                                                        required
                                                                        className="form-control"
                                                                        onChange={(e) => setPassword2(e.target.value)}
                                                                    />
                                                                </div>
                                                                {/* Password Check */}
                                                                {/* <p className='fw-bold text-danger'>
                                                                            {password2 !== password ? 'Passwords do not match' : ''}
                                                                        </p> */}

                                                                <div className="d-flex justify-content-center">
                                                                    {isLoading === true
                                                                        
                                                                        ? <button 
                                                                            type="submit" 
                                                                            className="btn btn-outline-success btn-block w-100 text-center" >
                                                                    
                                                                            Registering...  <i className="spinner-grow spinner-grow-sm ms-2" role="status"></i> 
                                                                            
                                                                        </button>

                                                                        :<button 
                                                                            type="submit" 
                                                                            className="btn btn-outline-success btn-block w-100 text-center" >
                                                                    
                                                                            Register  <i className="fas fa-user-plus" />
                                                                        </button>
                                                                    }
                                                                </div>

                                                                <div className="text-center">
                                                                    <p className='mt-4'>
                                                                        Already have an account? <Link to="/login/">Login</Link>
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
    );
}

export default Register;








