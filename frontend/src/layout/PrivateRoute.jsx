import { Navigate } from "react-router-dom";
import { userAuthStore } from "../store/auth";




const PrivateRoute = ( {children }) => {
    // Use the 'useAuthStore' hook to check the user's authentication status. 
    const loggedIn = userAuthStore ((state) => state.isLoggedIn)()
    // if the user is not logged in, redirect to the login page
    return loggedIn ? <>{ children }</> : <Navigate to="/login" />
    
}
// Export the 'PrivateRoute' component to make it available for use in other parts of the application.
export default PrivateRoute;