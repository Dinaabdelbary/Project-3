// import React from 'react'
// import { getUser } from "../services/userApi";
// import { useSelector, useDispatch } from "react-redux";
// import { storedUser, setCurrentUser } from "./features/auth/authSlice";

// function ProfileForm() {
//         const [user, setUser] = useState({
//           name: "",
//           instruments: [],
//           location: "",
//           profilePicture: "",
//           coverPhoto: "",
//           listensto: [],
//           genres: [],
//           history: "",
//           currentBands: [],
//           friendList: [],
//         }
//     }

//    const handleSubmit = (event) => {
//     event.preventDefault();
//   axios.put("/api/user/:id")
//     .then((user) => {
//       // props.setLoggedInUser(user)
//       dispatch(setCurrentUser(user));
//       navigate("/");
//     })
//     .catch((error) => {
//       console.log(error, "Error when trying to send login request");
//     });
// };

//   return (

//     <div>
//      <form onSubmit={handleSubmit()}>
// <img className="CoverImage" src="" alt="cover photo" />
// <input type='file' />
// <div className="name">Name: {user.name}</div>
// <input type="text"></input>
// <p className="details">Instrument I play: {user.instruments}</p>
// <input type="text"></input>
// <p className="details">Genres: {user.genres}</p>
// <input type="text"></input>
// <p className="details">Music I like: {user.listensto}</p>
// <input type="text"></input>
// <p className="details">About me: {user.history}</p>
// <input type="text"></input>
// <div class="details">
// <i class="">place</i>{user.location}</div>

// <button onClick={}>Update</button>
// </form>

// </div>

//   )
// }

// export default ProfileForm
