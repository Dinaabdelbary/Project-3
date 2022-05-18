import axios from 'axios';

const getUser = (id) => {
  return axios.get(`/api/user/${id}`);
};

const getUserList = () => {
  return axios.get('/api/user/list');
};

const updateUser = (id, user) => {
  console.log('id and user: ', id, user)
  return axios.post(`/api/user/profile/${id}`, user)
};

const sendFriendRequest = (id) => {
  return axios.get(`/connect/${id}`);
};

const acceptFriendRequest = (id) => {
  return axios.get(`/connect/accept/${id}`)
};

const declineFriendRequest = (id) => {
  return axios.get(`/connect/decline/${id}`)
};

const unfollow = (id) => {
  return axios.get(`/connect/unfollow/${id}`)
}

export { 
    getUser,
    getUserList,
    updateUser,
    sendFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
    unfollow
};