import axios from "axios";

const getLocation = () => {
  return axios.get("https://ipinfo.io/json?token=f0585fac666470");
};

export { getLocation };
