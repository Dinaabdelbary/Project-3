import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setCurrentUser, storedUser } from '../features/auth/authSlice';
import { getLocation } from '../services/locationApi';
import { updateUser } from '../services/userApi';

function ProfileForm() {
  const userData = useSelector(storedUser);

  const { id } = useParams();
  const [user, setUser] = useState({
    name: '',
    instruments: [],
    location: '',
    profilePicture: '',
    coverPhoto: '',
    listensto: [],
    genres: [],
    bio: '',
    currentBands: [],
    friendList: [],
  });

  if (!userData.currentUser) {
    useEffect(() => {
      getUser(id)
        .then((response) => {
          setUser(response.data);
          dispatch(setCurrentUser(response.data));
          return response.data;
        })
        .catch((error) => {
          return error.response.data;
        });
    }, []);
  }

  const handleStringChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleArrayChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: [...[name], value],
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    updateUser(id)
      .then((user) => {
        console.log(user);
        setUser(user);
        dispatch(setCurrentUser(user));
        navigate('/');
      })
      .catch((error) => {
        console.log(error, 'Error when trying to update profile');
      });
  };
  const getCurrentLocation = (event) => {
    event.preventDefault();
    const location = getLocation()
      .then((response) => {
        const { city, country } = response.data;
        setUser({
          ...user,
          location: `${city},${country}`,
        });
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <img className='CoverImage' src='' alt='cover photo' />
        <input type='file' />
        <div className='name'>Name: {user.name}</div>
        <input
          type='text'
          name='name'
          value={user.name}
          onChange={handleStringChange}
        />
        <p className='details'>Instruments: {user.instruments}</p>
        <input
          type='text'
          name='instruments'
          value={user.instruments}
          onChange={handleArrayChange}
        />
        <p className='details'>Genres: {user.genres}</p>
        <input
          type='text'
          name='genres'
          value={user.genres}
          onChange={handleArrayChange}
        />
        <p className='details'>Listens to: {user.listensto}</p>
        <input
          type='text'
          name='listensto'
          value={user.listensto}
          onChange={handleArrayChange}
        />
        <p className='details'>Bio: {user.bio}</p>
        <textarea
          name='bio'
          value={user.bio}
          onChange={handleStringChange}
          rows='3'
          cols='30'
        />
        {/* <input type='textarea' name='bio' value={user.bio} onChange={handleChange} /> */}
        <div className='details'>
          <input
            type='text'
            placeholder='location'
            onChange={handleStringChange}
            value={user.location}
          />
          <button className='raise' onClick={getCurrentLocation}>
            Use your current location
          </button>
        </div>
        <button>Update</button>
      </form>
    </div>
  );
}

export default ProfileForm;
