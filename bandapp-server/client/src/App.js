import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { loggedin } from "./features/auth/authApi";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./services/auth";
import { storedUser, currentUser } from "./features/auth/authSlice";
import UserProfile from "./components/Geolocation";
import ProfileCard from './components/ProfileCard';
import ProfilePage from "./components/ProfilePage";

function App() {
  const userData = useSelector(storedUser); // gets user from global state
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    loggedin()
      .then((response) => {
        dispatch(currentUser(response.data)); //retrieve current user and send to global state
      })
      .catch((error) =>
        console.log(
          error.message,
          "Error when trying to get info from loggedin axios request"
        )
      );
  }, [dispatch]);

  
  return (
    <div className="App">
      
      {userData.currentUser ? (
        <Navbar />
      ) : (
        <div>
        <h1>Find other musicians. Connect. Play.</h1>
        </div>
      )}
      <div>
        <Routes>
          <Route path="/" element={<Home loggedInUser={loggedInUser} />} />
          <Route
            path="/signup"
            element={<SignUp setLoggedInUser={setLoggedInUser} />}
          />
          <Route
            path="/login"
            element={<Login setLoggedInUser={setLoggedInUser} />}
          />
          <Route path="/location" element={<UserProfile />} />
          <Route path="/:id" element={<ProfilePage />} />
          <Route path="/ListOfUsers" element={<ProfileCard/>} />  
        </Routes>
        {/* <div>
          <ProfileCard/>
        </div> */}
      </div>
    </div>
  );
}

export default App;

const searchParams = new URLSearchParams("name=test1");

// axios.get("localhost:3005/search" + searchParams)
