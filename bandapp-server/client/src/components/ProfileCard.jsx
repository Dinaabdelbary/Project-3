import React, { useState, useEffect } from 'react';
import { getUser } from '../features/userApi/userApi';
import { useParams } from 'react-router-dom';

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
  //  const clickHandler = () =>{
  //     console.log("clicked")
  //   }
  //   return (
  //     <div className='profileCard'>
  //         <img src='this.{User.img}'></img>
  //         <p>{this.User.name}</p>
  //         <p>{this.User.instrument}</p>
  //         <p>{this.User.genre}</p>
  //         <button onClick={clickHandler}>Connect</button>
  //         <button>Chat</button>
  //     </div>
  //   )
  // }
  /////MIGHT NEED TO DISPLAY IF IT'S OUR PROFILE
  // pendingSentRequests: [{type: Schema.Types.ObjectId, ref: "User"}],
  // pendingReceivedRequests: [{type: Schema.Types.ObjectId, ref: "User"}],

  // export default ProfileCard;
  const clickHandler = () => {
    console.log('clicked');
  };
  console.log(id);
  return (
    <div>
      <img src=""></img>
      <h4>{user.name}name</h4>
      <p>{user.instruments}instrument</p>
      <p>{user.genres}genres</p>
      <p>{user.instruments}instruments</p>
      <p>{user.location}location</p>

      <button onClick={clickHandler()}>Connect</button>
      <button>Chat</button>
    </div>
  );
}

export default ProfileCard;
