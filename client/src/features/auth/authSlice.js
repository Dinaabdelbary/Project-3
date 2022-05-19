import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
};

export const authSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },
    },
});

export const { setCurrentUser } = authSlice.actions;

export const storedUser = state => state.currentUser;

export default authSlice.reducer;
