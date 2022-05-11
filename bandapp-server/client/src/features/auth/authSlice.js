import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {};

export const authSlice = createSlice({
    name: 'currentUser',
    initialState,

    reducers: {
        currentUser: (state, action) => {
            // console.log(currentUser)
            // console.log(action, 'action in slice')
            
            state.currentUser = action.payload

        }
    }
});

export const {
    currentUser
} = authSlice.actions;

export const storedUser = (state) => state.currentUser

export default authSlice.reducer;