import { configureStore } from '@reduxjs/toolkit';
import currentUser from '../features/auth/authSlice';

export const store = configureStore({
    reducer: {
        currentUser
    }
});