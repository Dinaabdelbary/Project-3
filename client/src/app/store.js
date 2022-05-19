import { configureStore } from '@reduxjs/toolkit';
import currentUser from '../features/auth/authSlice';
import userSlice from '../features/user/userSlice'


export const store = configureStore({
    reducer: {
        currentUser,
        userSlice
    }
});