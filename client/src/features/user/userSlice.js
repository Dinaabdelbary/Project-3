import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    allUsers: [],
};

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setAllUsers: (state, action) => {
            state.allUsers = action.payload;
        },
    },
});

export const { setAllUsers } = userSlice.actions;
export const storedUsers = state => state.userSlice.allUsers;

export default userSlice.reducer;

