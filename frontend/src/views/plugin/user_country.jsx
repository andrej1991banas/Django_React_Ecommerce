import { useState, useEffect } from "react";

function GetCurrentAddress() {
    const [address, setAddress] = useState(""); // Use "None" as default if needed, e.g., useState("None")

    useEffect(() => {
        const fetchAddress = async () => {
            try {
                // Get the user's geolocation (wrapped in a Promise for async/await support)
                const getPosition = () =>
                    new Promise((resolve, reject) =>
                        navigator.geolocation.getCurrentPosition(resolve, reject)
                    );

                const pos = await getPosition(); // Await the user's position
                const { latitude, longitude } = pos.coords;

                // Use latitude and longitude to fetch the address
                const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

                const res = await fetch(url); // Fetch address data from OpenStreetMap
                if (!res.ok) {
                    throw new Error("Failed to fetch the address");
                }

                const data = await res.json();
                setAddress(data.display_name); // Save the address in the state
            } catch (error) {
                // Handle geolocation errors
                if (error.code === 1) {
                    console.error("Permission denied.");
                } else if (error.code === 2) {
                    console.error("Position unavailable.");
                } else if (error.code === 3) {
                    console.error("Geolocation timeout.");
                } else {
                    console.error("An unknown error occurred:", error);
                }

                // If error occurs, set the address to "None"
                setAddress("None");
            }
        };

        fetchAddress(); // Call the function
    }, []);

    return address; // Return the address or "None" in case of errors
}

export default GetCurrentAddress;