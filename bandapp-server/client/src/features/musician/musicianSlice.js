import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signup, login, logout } from './musicianApi';

const initialState = {
    name: '',
    email: '',
    password: '',
};

export const signupSlice = createSlice({
    name: 'user',
    initialState,

    reducers: {
        createUser: (state, action) => {
            signup(action.payload)
                .then(response => {
                    console.log(response.data, 'Response from signup');
                    const { name, email, password } = response.data
                    state.name = action.payload.name;
                    state.email = action.payload.email;
                    state.password = action.payload.password;

                })
                .catch(error => console.log('Error when creating user', error));
        }
    }
})