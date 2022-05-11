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
      <img className="CoverImage" src="" alt="cover photo" />
      <div className="name">Name: {user.name}</div>
      <p className="details">Instrument I play: {user.instruments}</p>
      <p className="details">Genres: {user.genres}</p>
      <p className="details">Music I like: {user.listensto}</p>
      <p className="details">About me: {user.history}</p>
      <div class="details">
  <i class="">place</i>{user.location}</div>
      <button className="raise" onClick={clickHandler()}>Connect</button>
      <button className="raise">Chat</button>
    </div>
  );
}

export default ProfilePage;
