import React from 'react';
import { setCurrentUser } from '../features/auth/authSlice';

function ProfileForm() {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    updateUser(id)
      .then((user) => {
        // props.setLoggedInUser(user)
        dispatch(setCurrentUser(user));
        navigate('/');
      })
      .catch((error) => {
        console.log(error, 'Error when trying to update profile');
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit()}>
        <img className="CoverImage" src="" alt="cover photo" />
        <input type="file" />
        <div className="name">Name: {user.name}</div>
        <input type="text"></input>
        <p className="details">Instruments: {user.instruments}</p>
        <input type="text"></input>
        <p className="details">Genres: {user.genres}</p>
        <input type="text"></input>
        <p className="details">Listens to: {user.listensto}</p>
        <input type="text"></input>
        <p className="details">Bio: {user.bio}</p>
        <input type="text"></input>
        <div class="details">
          <i className="">Location</i>
          {user.location}
        </div>
        <button>Update</button>
      </form>
    </div>
  );
}

export default ProfileForm;
