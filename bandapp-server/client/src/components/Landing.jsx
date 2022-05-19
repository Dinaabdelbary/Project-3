import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

//   const handleLogin = () => {
//     navigate('/login');
//   };
//   const handleSignup = () => {
//     navigate('/signup');
//   };

  return (
    <div>
      <div className='project-name'>
      <h1>PROJECT NAME</h1>
      <h3>
      Find musicians in your area, connect, and jam!
      </h3>
      </div>
      <div className='form'>
        <div className='container'>
          <Link to='/login' className='form-button raise'>
            Login
          </Link>
        </div>
        <div className='container'>
          <Link to='/signup' className='form-button raise'>
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
