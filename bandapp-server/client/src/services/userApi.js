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

export { 
    getUser,
    getUserList,
    updateUser
};