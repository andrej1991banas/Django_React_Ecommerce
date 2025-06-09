import { useEffect, useState } from 'react';
import { login } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { userAuthStore } from '../../store/auth';
import { Link } from 'react-router-dom';




function Dashboard() {
    const [isLoggedIn, user] = userAuthStore((state) => [
        state.isLoggedIn,
        state.user,
    ])
   

   return (
        <>
            {isLoggedIn()
            // the ? sign is representing "if" condition 
               ?  <div> 
                <h2>Dashboard logged in</h2>
                <Link to= '/logout'>Logout</Link>
                </div> 

                 // the : sign representing "else" condition
               :  <div> 
                    <h2>Homepage not Loggedin</h2><br/>
                    <div className="d-d-grid gap-2 d-md-flex justify-content-md-left">
                    <Link className='btn btn-outline-success' to={'/login'} >Login</Link>
                    <br/><br/>
                    <Link className='btn btn-outline-info' to={'/register'} >Register</Link>
                </div>
                </div> 
            }
        </>
    
  )
}

export default Dashboard






