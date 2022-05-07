import React, {} from 'react'

const Geolocation = () => {

    fetch("https://ipinfo.io/json?token=f0585fac666470").then(
  (response) => response.json()
).then(
  (jsonResponse) => console.log(jsonResponse)
)
  return (
    <div>Geolocation</div>
  )
}

export default Geolocation