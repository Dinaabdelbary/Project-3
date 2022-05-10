import React from "react";
import axios from "axios";
import { Link } from"react-router-dom";
import ProfileCard from "./ProfileCard";

const UsersList = () => {
  const [listOfUsers, setListOfUsers] = React.useState([]);

  const handleConnect = (id) => {
      axios.get(`/connect/${id}`)
  }

  React.useEffect(() => {
    axios
      .get("/api/user/list")
      .then((response) => {
        const users = response.data;
        console.log('This is the list of users:', users)
        setListOfUsers(users)
      })
      .catch((error) => console.log(error));
  }, []);
  const allUsers = listOfUsers.map((user) =>{
      return  <div>
        <Link to={`/${user._id}`}>profileid</Link>
        <ProfileCard user={user}/>
      {user.name}
      <button onClick={() => handleConnect(user._id) }>
          Connect
      </button>
      </div>
  })


  return (
<div> {allUsers} </div>
   

  )
  

};

export default UsersList;
