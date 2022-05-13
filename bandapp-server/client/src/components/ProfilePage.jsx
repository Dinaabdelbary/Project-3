import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { currentUser, storedUser } from "../features/auth/authSlice";
import { getUser } from "../features/userApi/userApi";

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
  const userData = useSelector(storedUser);
  const { id } = useParams();
  const isOwner = id === currentUser._id;

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
    // useNavigate(<ProfileForm/>)
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
    { isOwner  ?
     <div> <button className="raise" onClick={clickHandler()}>edit</button></div> 
     : 
     <div>
      <button className="raise" >Connect</button>
      <button className="raise">Chat</button>
      </div> }
    </div>
  );
}

export default ProfilePage;


