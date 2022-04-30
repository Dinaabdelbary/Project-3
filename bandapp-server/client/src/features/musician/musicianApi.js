import axios from 'axios';

const signup = ({name, email, password, instrument}) => {
    return axios.post('http://localhost:5005/api/auth/signup', { name, email, password, instrument })
}

const login = (email, password) => {
    return axios.post('http://localhost:5005/api/auth/login', {email, password})
}

const logout = () => {
    return axios.delete('http://localhost:5005/api/auth/logout')
}
const loggedin = () => {
    
    return axios.get('http://localhost:5005/api/auth/loggedin')
}

export {
    signup,
    login,
    logout,
    loggedin
}