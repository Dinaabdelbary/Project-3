import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import UserProfile from "./components/Geolocation";
import ProfileCard from './components/ProfileCard';
import ProfilePage from "./components/ProfilePage";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { useNavigate } from "react-router-dom";
import { loggedin } from "./features/auth/authApi";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./services/auth";
import { storedUser, currentUser } from "./features/auth/authSlice";
import SearchResult from "./components/SearchResult";
import ProfileForm from "./components/ProfileForm"

function App() {
  const userData = useSelector(storedUser); // gets user from global state
  const dispatch = useDispatch();

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
    <></>
      
      {userData.currentUser ? (
        <Navbar />
      ) : ''}
      <div>
        <Routes>
          <Route
            path="/signup"
            element={<SignUp/>}
          />
          <Route
            path="/login"
            element={<Login/>}
          />
          <Route path="/location" element={<UserProfile />} />
          <Route path="/:id" element={<ProfilePage />} />
          <Route path="/ListOfUsers" element={<ProfileCard/>} />  
          <Route path="/" element={userData.currentUser ? <Home/> : <Landing/>}/>
          <Route path="/search" element={<SearchResult/>}/>
          <Route path="/editprofile" element={<ProfileForm/>}/>
        </Routes>
       
      </div>
    </div>
  );
}

export default App;

const searchParams = new URLSearchParams("name=test1");

// axios.get("localhost:3005/search" + searchParams)
