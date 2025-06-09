import React from 'react'


// function that will create random string as an ID for the cart
function CartId() {
    const generateRandomString = () => {
        // define the length and characters for the randomString
        const length = 30;
        const characters = "ABCDEFGHIJKLMNOPQRSTabcdefghijklmnopqrst0123456789";
        let randomString = "";
        // for loop till the length is reached
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomString += characters.charAt(randomIndex);
        }
        // saving created RandomString into local storage 
        localStorage.setItem("randomString", randomString)
    }
    // look at local stoarage, if there is any id than fetch, otherwie create a new one 
    const existingRandomString = localStorage.getItem("randomString")
    if (!existingRandomString){
        generateRandomString()
    } else{

    }

  return existingRandomString
}

export default CartId
