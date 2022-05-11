import React, { useState, useEffect } from "react";
// import { currentUser } from '../features/auth/authSlice';
import { getUser } from "../features/userApi/userApi";
import { useParams } from "react-router-dom";

function ProfilePage() {
  const [user, setUser] = useState({
    name: "",
    instruments: [],
    location: "",
    profilePicture: "",
    coverPhoto: "",
    listensto: [],
    genres: [],
    history: "",
    currentBands: [],
    friendList: [],
  });

  const { id } = useParams();

  useEffect(() => {
    getUser(id)
      .then((response) => {
        setUser(response.data);
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }, []);
  /////MIGHT NEED TO DISPLAY IF IT'S OUR PROFILE
  // pendingSentRequests: [{type: Schema.Types.ObjectId, ref: "User"}],
  // pendingReceivedRequests: [{type: Schema.Types.ObjectId, ref: "User"}],


  const clickHandler = () => {
  };
  return (
    <div>
      <img src="" alt="cover photo" />
      <h4>Name: {user.name}</h4>
      <p>Instrument I play: {user.instruments}</p>
      <p>Genres: {user.genres}</p>
      <p>Music I like: {user.listensto}</p>
      <p>About me: {user.history}</p>
      <p>Location: {user.location}</p>

      <button onClick={clickHandler()}>Connect</button>
      <button>Chat</button>
    </div>
  );
}

export default ProfilePage;
