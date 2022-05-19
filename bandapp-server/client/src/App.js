import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import UserProfile from './components/Geolocation';
import IsLoggedIn from '../src/components/IsLoggedin';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import ProfileCard from './components/ProfileCard';
import ProfileForm from './components/ProfileForm';
import ProfilePage from './components/ProfilePage';
import SearchResult from './components/SearchResult';
import SignUp from './components/SignUp';
import { storedUser } from './features/auth/authSlice';

function App() {
  const userData = useSelector(storedUser); // gets user from global state

  return (
    <div className='App'>
      {userData.currentUser ? <Navbar /> : ''}
      <div>
        <Routes>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          {/* <Route
            path='/'
            element={userData.currentUser ? <Home /> : <Landing />}
          /> */}
          <Route element={<IsLoggedIn />}>
            <Route path='/' element={<Home />} />
            <Route path='/location' element={<UserProfile />} />
            <Route path='/:id' element={<ProfilePage />} />
            <Route path='/ListOfUsers' element={<ProfileCard />} />
            <Route path='/search' element={<SearchResult />} />
            <Route path='/editprofile' element={<ProfileForm />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;