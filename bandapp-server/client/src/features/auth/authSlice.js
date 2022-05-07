import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: {},
};

export const authSlice = createSlice({
    name: 'user',
    initialState,

    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },
    },
});

export const { setCurrentUser } = authSlice.actions;

export const currentUser = state => state.currentUser;

export default authSlice.reducer;
