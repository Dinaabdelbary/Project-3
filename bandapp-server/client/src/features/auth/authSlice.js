import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentUser: {}

};

export const authSlice = createSlice({
    name: 'user',
    initialState,

    reducers: {
        currentUser: (state, action) => {
            console.log(action, 'action from slice checking state')
            const { currentUser } = action.payload
            state.currentUser = currentUser

        }
    }
});

export const {
    currentUser
} = authSlice.actions;

export const storedUser = (state) => state

export default authSlice.reducer;