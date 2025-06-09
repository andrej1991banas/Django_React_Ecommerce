import { userAuthStore } from '../store/auth';
import axios from './axios';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';


const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  // didOpen: (toast) => {
    // toast.addEventListener('mouseenter', Swal.stopTimer)
    // toast.addEventListener('mouseleave', Swal.resumeTimer)
  // }
})


//creatig authentication data
//function for storing the login data from user
export const login = async (email, password) => {
    try {
        // define const which will store user data for token, and refresh token, and all part of the script wil be waiting for the result
        const {data, status} = await axios.post("user/token/",{
            //set the variables we want to reach and catch from API with http rewuest POST
            email,
            password,
        })
            //using data from API, token access, token refresh
        if (status==200){
            setAuthUser(data.access, data.refresh)

            Toast.fire({
                icon: 'success',
                title: 'Logged in successfully'
            })
        }
        return { data, error: null }

    } catch (error) {
            return{
                data: null,
                error: error.response.data?.detail || 'Something went worng'
            };
    }
}

// sete the constant for storing the register data and data for logging in
export const register = async(fullname, email, mobile, password, password2) =>{
    try {
        //post request for register data
        // defining the required data for register
        const { data } = await axios.post('user/register/', {
            fullname, 
            email, 
            mobile, 
            password,
            password2,
        })

        
            //sending register data to log in page, "user/token/" url tfor log in the user automaticaly
        await login(email, password)

            Toast.fire({
                icon: 'success',
                title: 'Account Created successfully'
            })
        
        return { data, error: null }
    } catch (error) {
        // Handling errors and returning data and error information
        return {
            data: null,
            error: error.response?.data || 'Something went wrong',
        };
    }
}


export const logout = () => {
    Cookies.remove("access_token")
    Cookies.remove("refresh_token")
    // reseting user data instance to null, as it is in setUser function and setting the user to hardcored Null
    userAuthStore.getState().setUser(null)

    Toast.fire({
                icon: 'success',
                title: 'Logout Was Successful'
            })
}


export const setUser = async () => {
    const accessToken = Cookies.get("access_token")
    const refreshToken = Cookies.get("refresh_token")

    if (!accessToken || !refreshToken) {
        return;
    }
    //method checking if the access token is still valid
    if (isAccessTokenExpired(accessToken)){
        //calling the getRefreshToken function to transfomr refreh token to access token
        const response = await getRefreshToken(refreshToken)
        setAuthUser(response.access, response.refresh)
    } else{
        setAuthUser(accessToken, refreshToken)
    }
}



export const setAuthUser =(access_token, refresh_token) => {
    //set the name for the data we will call in logout functon to remove and set mepty user data
    Cookies.set('access_token', access_token,{
        expires:1,
        secure:true,
    })

    Cookies.set('refresh_token', refresh_token,{
        expires:7,
        secure:true,
    })

    const user= jwt_decode(access_token) ?? null
    if (user){
        userAuthStore.getState().setUser(user)

    }
    userAuthStore.getState().setLoading(false)
};


export const getRefreshToken = async () =>{
    const refresh_token = Cookies.get("refresh_token")
    const response = await axios.post('user/token/refresh/', {
        refresh: refresh_token
    })

    return response.data
};


export const isAccessTokenExpired = (accessToken) => {
    try {
        const decodedToken = jwt_decode(accessToken)
        return decodedToken.exp < Date.now() / 100
     } catch (err) {
        // Returning true if the token is invalid or expired
        return true;
    }
};


