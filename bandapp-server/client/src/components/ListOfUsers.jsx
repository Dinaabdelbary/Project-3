import React from "react";
import axios from "axios";

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
      return <div>
      {user.name}
      <button onClick={() => handleConnect(user._id) }>
          Connect
      </button>
      </div>
  })


  return (
<div>
    <h2>List of users</h2>
    {allUsers}
</div>

  )
  

};

export default UsersList;
