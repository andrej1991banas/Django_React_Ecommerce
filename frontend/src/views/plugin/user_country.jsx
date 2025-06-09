import { useState, useEffect } from "react";

function GetCurrentAddress() {
    const [add, setAdd] = useState("");

    useEffect(() => {
    navigator.geolocation.getCurrentPosition(
        (pos) => {
            const { latitude, longitude } = pos.coords;
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

            fetch(url)
                .then((res) => res.json())
                .then((data) => {
                    setAdd(data.display_name);
                })
                .catch((error) => {
                    console.error("Error fetching address:", error);
                });
        },
        (error) => {
            switch (error.code) {
                case error.PERMISSION_DENIED: 
                    console.error("Permission denied. Please allow location access.");
                    alert("Error: Location access is required. Please grant permission.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    console.error("Position unavailable. Please check your GPS or network.");
                    alert("Error: Unable to determine position. Please try again later.");
                    break;
                case error.TIMEOUT:
                    console.error("Location request timed out.");
                    alert("Error: Location request timed out. Please try again.");
                    break;
                default:
                    console.error("An unknown error occurred:", error);
                    alert("Error: Unable to retrieve location.");
            }
        }
    );
}, []);

    return add
}




export default GetCurrentAddress