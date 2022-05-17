import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setCurrentUser, storedUser } from '../features/auth/authSlice';
import { loggedin } from '../services/auth';
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
      loggedin()
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

  const handleInstrumentsChange = (event) => {
    let newArray = [...user.instruments, event.target.id];
    console.log('new array of instruments; ', newArray)
    if (user.instruments.includes(event.target.id)) {
      newArray = newArray.filter(instrument => instrument !== event.target.id);
    } 
    setUser({
      instruments: newArray
    });
  };

  const handleGenresChange = (event) => {
    let newArray = [...user.genres, event.target.id];
    console.log('new array of genres; ', newArray)
    if (user.genres.includes(event.target.id)) {
      newArray = newArray.filter(genre => genre !== event.target.id);
    } 
    setUser({
      genres: newArray
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateUser(id)
      .then((user) => {
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
        <div className='name'>Name: {userData.currentUser.name}</div>
        <input
          type='text'
          name='name'
          value={user.name}
          onChange={handleStringChange}
        />
        
        <p className='details'>Instruments: {userData.currentUser.instruments}</p>
        <label htmlFor="guitar">Guitar</label>
        <input type="checkbox" id="guitar" value="guitar"  onChange={handleInstrumentsChange}/>
        <label htmlFor="drums">Drums</label>
        <input type="checkbox" id="drums" value="drums"  onChange={handleInstrumentsChange}/>
        <label htmlFor="bass">Bass</label>
        <input type="checkbox" id="bass" value="bass"  onChange={handleInstrumentsChange}/>
        <label htmlFor="vocals">Vocals</label>
        <input type="checkbox" id="vocals" value="vocals"  onChange={handleInstrumentsChange}/>
        <label htmlFor="keyboard">Keyboard</label>
        <input type="checkbox" id="keyboard" value="keyboard"  onChange={handleInstrumentsChange}/>
        <label htmlFor="percussion">Percussion</label>
        <input type="checkbox" id="percussion" value="percussion"  onChange={handleInstrumentsChange}/>
        <label htmlFor="other">other</label>
        <input type="checkbox" id="other" value="other"  onChange={handleInstrumentsChange}/>

        
        <p className='details'>Genres: {userData.currentUser.genres}</p>
        <label htmlFor="rock">Rock</label>
        <input type="checkbox" id="rock" value="rock"  onChange={handleGenresChange}/>
        <label htmlFor="electronic">Electronic</label>
        <input type="checkbox" id="electronic" value="electronic"  onChange={handleGenresChange}/>
        <label htmlFor="metal">Metal</label>
        <input type="checkbox" id="metal" value="metal"  onChange={handleGenresChange}/>
        <label htmlFor="jazz">Jazz</label>
        <input type="checkbox" id="jazz" value="jazz"  onChange={handleGenresChange}/>
        <label htmlFor="hip hop/rap">Hip hop/Rap</label>
        <input type="checkbox" id="hip hop/rap" value="hip hop/rap"  onChange={handleGenresChange}/>
        <label htmlFor="pop">Pop</label>
        <input type="checkbox" id="pop" value="pop"  onChange={handleGenresChange}/>


        <p className='details'>Listens to: {userData.currentUser.listensto}</p>
        <input
          type='text'
          name='listensto'
          value={user.listensto}
          onChange={handleArrayChange}
        />
        <p className='details'>Bio: {userData.currentUser.bio}</p>
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
