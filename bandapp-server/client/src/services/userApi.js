import axios from 'axios';

const getUser = (id) => {
  return axios.get(`/api/user/${id}`);
};

const getUserList = () => {
  return axios.get('/api/user/list');
};

const updateUser = (id) => {
  return axios.put(`/api/user/${id}`)
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

export { 
    getUser,
    getUserList,
    updateUser,
    sendFriendRequest,
    acceptFriendRequest,
    declineFriendRequest
};