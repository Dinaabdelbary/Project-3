import React, { useEffect, useState } from "react";
import { getLocation } from "../services/locationApi";

const UserProfile = () => {
  const [userData, setUserData] = useState({
    location:''
  });

  const getCurrentLocation = (event) => {
    event.preventDefault();
    const location = getLocation()
    .then((response) => {
        const {city, country} = response.data;
        setUserData({
          ...userData,
          location: `${city},${country}`
        })

      })
      .catch((error) => console.error(error))

  }
  // getLocation()
  // .then((response) => consoleresponse.json())
  // .then((jsonResponse) => console.log(jsonResponse));



  return (
    <>
      <div>UserProfile</div>
      <h1> Edit Profile: </h1>
      <form>
        <label>Name:</label>
        <input type="text" placeholder="location" onChange={(e) => setUserData(e.target.value)} value={userData.location} />
        <button onClick={getCurrentLocation}>Use your current location</button>
      </form>
    </>
  );
};

export default UserProfile;
