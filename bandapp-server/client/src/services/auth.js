 import axios from 'axios';

const signup = (name, email, password) => {
    return axios
        .post('http://localhost:3005/api/auth/signup', { name, email, password })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error.response.data
        });
}

const login = (email, password) => {
    return axios
        .post('http://localhost:3005/api/auth/login', { email, password })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error.response.data
        });
}

const logout = () => {
    return axios
        .delete('http://localhost:3005/api/auth/logout')
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error.response.data
        });
}

export { signup, login, logout };