import React, { useState, useEffect } from 'react';
import { getUser } from '../features/userApi/userApi';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
function ProfileCard() {
  const [user, setUser] = useState({
    name: '',
    instruments: [],
    location: '',
    profilePicture: '',
    genres: [],
  });
  const { id } = useParams();
  useEffect(() => {
    setUser(getUser(id));
  }, []);
 
  const clickHandler = () => {
    console.log('clicked');
  };
  return (
    <div className='profileList'>
    <div className='profileCard raise'>
      <img className='cardimg' src="https://source.unsplash.com/user/c_v_r/">{user.img}</img>
      <h4 className="name">{user.name}name</h4>
      <p className="details">{user.instruments}instrument</p>
      <p className="details">{user.genres}genres</p>
      <p className="details">{user.instruments}instruments</p>
      <p className="details">{user.location}location</p>
      <button onClick={clickHandler()}>Connect</button>
      <button>Chat</button>

    </div>
    </div>
  );
}

export default ProfileCard;
