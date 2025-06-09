import axios from 'axios';
import { getRefreshToken, isAccessTokenExpired, setAuthUser } from './auth'; // Import authentication-related functions
import { API_BASE_URL } from './constants'; // Import the base API URL
import Cookies from 'js-cookie'; // Import the 'js-cookie' library for managing cookies


const useAxios = async() =>  {
    //setting up the data in axios instance
    const accessToken = Cookies.get('access_token');
        const refreshToken = Cookies.get('refresh_token');
       // Create an Axios instance with base URL and access token in the headers
    const axiosInstance = axios.create({
        baseURL: API_BASE_URL,
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    //check is the access token IS NOT expired
    axiosInstance.interceptors.request.use(async (req) => {
        if (!isAccessTokenExpired(accessToken)) {
            return req
        }

         //refresing access token with refresh token
        const response = await getRefreshToken(refreshToken)
        setAuthUser(response.access, response.refresh)
        // reset the user data with new acees token fromr efresh token and new refresh token 
        
        
        req.headers.Authorization = `Bearer ${response.data.access}`;
        return req
    })
   return axiosInstance
}

export default useAxios




