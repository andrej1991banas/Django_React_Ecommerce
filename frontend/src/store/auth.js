// #run{yarn dev} to run frotnend server


import { create } from 'zustand';
import { mountStoreDevtool  } from 'simple-zustand-devtools';






// Create a custom Zustand store named 'useAuthStore' using the 'create' function.
const userAuthStore = create((set, get) => ({
    // Define the 'allUserData' state variable and initialize it to null.
    allUserData: null, // Use this to store all user data

    // Define the 'loading' state variable and initialize it to false.
    loading: false,

    // Define the 'user' state variable and initialize it to null but expact to fill it with user-related data, 
    // picking just user_id and username from allUserData
    user:() => ({
        user_id: get().allUserData?.user_id || null,
        username: get().allUserData?.username || null,
    }),
    // Define function setUser to use the user data and setting the user state variable
    setUser: (user) => set({ allUserData: user }),
    // Define function setLoading to use the loading data and setting the loading state variable
    setLoading: (loading) => set({ loading }),
    // Define function setLoggedIn to use the loggedIn data and setting the loggedIn state variable, checking if allUserData is not null
    isLoggedIn: () => get().allUserData !== null,
}))

// Conditionally attach the DevTools only in a development environment.
if (import.meta.env.DEV){
    mountStoreDevtool('Store', userAuthStore )
}
// Export the 'useAuthStore' for use in other parts of the application.
export{ userAuthStore }







