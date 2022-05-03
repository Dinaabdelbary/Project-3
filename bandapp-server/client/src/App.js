import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';




function App() {
  // const navigate = useNavigate();

  const [loggedInUser, setLoggedInUser] = React.useState(null);

  React.useEffect(() => {
    axios.get('/api/auth/loggedin')
      .then(response =>{
        console.log(response.data);
        setLoggedInUser(response.data)
      })
      .catch(err => console.log(err))
  }, [])

   return (
    <div className="App">
    <Navbar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>
      <div >
        <Routes>
          <Route path="/" element={<Home loggedInUser={loggedInUser} />} />
          <Route path="/signup" element={<SignUp setLoggedInUser={setLoggedInUser}/>} />
          <Route path="/login" element={<Login setLoggedInUser={setLoggedInUser}/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;