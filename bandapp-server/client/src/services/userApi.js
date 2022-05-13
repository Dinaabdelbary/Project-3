import axios from 'axios';

const getUser = (id) => {
  return axios.get(`/api/user/${id}`);
};

const getUserList = () => {
  return axios.get('/api/user/list');
};
export { 
    getUser,
    getUserList 
};