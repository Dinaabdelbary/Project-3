import React, { Component } from 'react'
import { currentUser } from '../features/auth/authSlice';

 class ProfilePage extends Component {
     state = {
         img:'',
         coverphoto:"",
         name:"",
         instruments:"",
         genres:"",
         listensto:"",
         history:"",
         location:""
     }

     clickHandler = () =>{
        console.log("clicked")
      }

  render() {
    return (
      <div>
          <img src=''></img>
          <imgs src="">cover photo</imgs>
          <h4>{User.name}</h4>
          <p>{User.instruments}</p>
          <p>{User.genres}</p>
          <p>{User.listensto}</p>
          <p>{User.instruments}</p>
          <p>{User.history}</p>
          <p>{User.location}</p>
          
          <button onClick={this.clickHandler}>Connect</button>
        <button>Chat</button>


      </div>
    )
  }
}

export default ProfilePage;