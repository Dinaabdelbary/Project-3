import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {

  return (
    <div>
      <h1>Find other musicians. Connect. Play.</h1>
      <h3>
        No one to play music with? Find musicians in your area, connect with
        them and jam!
      </h3>
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
